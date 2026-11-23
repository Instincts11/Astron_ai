import type { Snapshot } from "@/lib/dashboard-data";

export function buildInsights(snapshot: Snapshot) {
  const revenue = snapshot.kpis.find((item) => item.id === "revenue");
  const users = snapshot.kpis.find((item) => item.id === "users");
  const conversion = snapshot.kpis.find((item) => item.id === "conversion");
  const desktop = snapshot.slices[0];

  return [
    {
      title: "Revenue pace",
      body: revenue
        ? `Revenue is ${revenue.value}, ${revenue.change} ${revenue.comparison}.`
        : "Revenue is tracking with the selected range.",
    },
    {
      title: "Audience mix",
      body:
        desktop && users
          ? `${desktop.name} accounts for ${desktop.value}% of sessions across ${users.value} active users.`
          : "Audience mix is available for the selected range.",
    },
    {
      title: "Conversion",
      body: conversion
        ? `Conversion rate is ${conversion.value}, ${conversion.change} ${conversion.comparison}.`
        : "Conversion is available for the selected range.",
    },
  ];
}

export function answerQuestion(question: string, snapshot: Snapshot) {
  const revenue = snapshot.kpis.find((item) => item.id === "revenue");
  const users = snapshot.kpis.find((item) => item.id === "users");
  const conversion = snapshot.kpis.find((item) => item.id === "conversion");
  const growth = snapshot.kpis.find((item) => item.id === "growth");
  const desktop = snapshot.slices[0];
  const mobile = snapshot.slices[1];
  const normalized = question.toLowerCase();

  if (!revenue || !users || !conversion || !growth || !desktop || !mobile) {
    return "The workspace metrics are still loading.";
  }

  if (normalized.includes("revenue") || normalized.includes("sales") || normalized.includes("money")) {
    return `Revenue for this range is ${revenue.value}, ${revenue.change} ${revenue.comparison}. The line chart ends on the latest point in the selected series.`;
  }

  if (normalized.includes("user") || normalized.includes("audience") || normalized.includes("desktop") || normalized.includes("mobile")) {
    return `${users.value} people are active, ${users.change} ${users.comparison}. ${desktop.name} is ${desktop.value}% of sessions and ${mobile.name.toLowerCase()} is ${mobile.value}%.`;
  }

  if (normalized.includes("convert") || normalized.includes("growth")) {
    return `Conversion is ${conversion.value} (${conversion.change}). ${growth.title} reads ${growth.value}, ${growth.change} ${growth.comparison}.`;
  }

  return `Across this range: revenue ${revenue.value} (${revenue.change}), ${users.value} active users (${users.change}), and conversion at ${conversion.value}. ${desktop.name} leads distribution at ${desktop.value}%.`;
}
