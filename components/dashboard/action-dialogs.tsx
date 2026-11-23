"use client";

import { useState } from "react";

import { useSnapshot } from "@/components/dashboard/use-snapshot";
import { useDashboard } from "@/components/providers/dashboard-provider";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Field, Input, Select, Textarea } from "@/components/ui/input";
import type { Snapshot } from "@/lib/dashboard-data";
import { answerQuestion } from "@/lib/insights";

const copy = {
  project: {
    title: "Create project",
    description: "Add a project to this workspace. It shows up on the Workspace page.",
  },
  invite: {
    title: "Invite member",
    description: "Send a seat to a teammate. They appear in the team roster immediately.",
  },
  report: {
    title: "Generate report",
    description: "Download the metrics currently shown for the selected date range.",
  },
  ask: {
    title: "Ask AI",
    description: "Answers are composed from the metrics on this dashboard.",
  },
};

export function ActionDialogs() {
  const { action, closeAction } = useDashboard();
  const details = action ? copy[action] : copy.project;

  return (
    <Dialog open={action !== null} onOpenChange={(open) => !open && closeAction()}>
      <DialogContent>
        <DialogTitle>{details.title}</DialogTitle>
        <DialogDescription className="mt-1">{details.description}</DialogDescription>
        <div className="mt-5">
          {action === "project" ? <CreateProjectForm /> : null}
          {action === "invite" ? <InviteForm /> : null}
          {action === "report" ? <ReportForm /> : null}
          {action === "ask" ? <AskForm /> : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CreateProjectForm() {
  const { addProject, closeAction } = useDashboard();
  const [name, setName] = useState("");
  const [template, setTemplate] = useState("Product");
  const [error, setError] = useState("");

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        const trimmed = name.trim();
        if (!trimmed) {
          setError("Give the project a name.");
          return;
        }
        addProject({ name: trimmed, template });
        closeAction();
      }}
    >
      <Field label="Project name">
        <Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Website Redesign" autoFocus />
      </Field>
      <Field label="Template">
        <Select value={template} onChange={(event) => setTemplate(event.target.value)}>
          <option>Product</option>
          <option>Marketing</option>
          <option>Research</option>
        </Select>
      </Field>
      {error ? <p className="text-sm text-negative">{error}</p> : null}
      <Button type="submit" className="w-full">
        Create project
      </Button>
    </form>
  );
}

function InviteForm() {
  const { invite, closeAction } = useDashboard();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Editor");
  const [error, setError] = useState("");

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        const result = invite({ email, role });
        if (result) {
          setError(result);
          return;
        }
        closeAction();
      }}
    >
      <Field label="Email">
        <Input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="teammate@company.com"
          autoFocus
        />
      </Field>
      <Field label="Role">
        <Select value={role} onChange={(event) => setRole(event.target.value)}>
          <option>Admin</option>
          <option>Editor</option>
          <option>Viewer</option>
        </Select>
      </Field>
      {error ? <p className="text-sm text-negative">{error}</p> : null}
      <Button type="submit" className="w-full">
        Send invite
      </Button>
    </form>
  );
}

function ReportForm() {
  const snapshot = useSnapshot();
  const { range } = useDashboard();
  const [format, setFormat] = useState<"csv" | "text">("csv");
  const [done, setDone] = useState(false);

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        const extension = format === "csv" ? "csv" : "txt";
        const body = format === "csv" ? snapshotToCsv(snapshot) : snapshotToText(snapshot);
        download(`astra-${range}-report.${extension}`, body, format === "csv" ? "text/csv" : "text/plain");
        setDone(true);
      }}
    >
      <Field label="Format">
        <Select value={format} onChange={(event) => setFormat(event.target.value as "csv" | "text")}>
          <option value="csv">CSV spreadsheet</option>
          <option value="text">Text summary</option>
        </Select>
      </Field>
      <Button type="submit" className="w-full">
        Download report
      </Button>
      {done ? <p className="text-sm text-positive">Report downloaded to your computer.</p> : null}
    </form>
  );
}

function AskForm() {
  const snapshot = useSnapshot();
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const suggestions = [
    "Why did revenue move?",
    "How is the audience split?",
    "Summarize conversion and growth",
  ];

  function ask(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return;
    setPrompt(trimmed);
    setAnswer(answerQuestion(trimmed, snapshot));
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        ask(prompt);
      }}
    >
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => ask(suggestion)}
            className="cursor-pointer rounded-full border border-border bg-secondary px-3 py-1 text-xs text-muted transition hover:text-foreground"
          >
            {suggestion}
          </button>
        ))}
      </div>
      <Field label="Question">
        <Textarea
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Ask about revenue, users, or conversion"
        />
      </Field>
      <Button type="submit" className="w-full">
        Ask
      </Button>
      {answer ? (
        <div className="rounded-xl border border-border bg-secondary/60 p-3">
          <p className="text-[10px] font-medium tracking-[0.16em] text-muted uppercase">
            From your workspace data
          </p>
          <p className="mt-2 text-sm leading-6">{answer}</p>
        </div>
      ) : null}
    </form>
  );
}

function snapshotToCsv(snapshot: Snapshot) {
  const header = "metric,value,change";
  const rows = snapshot.kpis.map(
    (item) => `"${item.title}","${item.value}","${item.change}"`,
  );
  return [header, ...rows].join("\n");
}

function snapshotToText(snapshot: Snapshot) {
  return snapshot.kpis
    .map((item) => `${item.title}: ${item.value} (${item.change} ${item.comparison})`)
    .join("\n");
}

function download(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
