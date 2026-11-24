import type { Currency, Expense, Group } from "./types";

export const initialExpenses: Expense[] = [
  {
    id: "e1",
    label: "Courses",
    amountCents: 4250,
    paidBy: "Léa",
    settled: false,
    groupId: "g1",
  },
  {
    id: "e2",
    label: "Loyer",
    amountCents: 62000,
    paidBy: "Tom",
    settled: true,
    groupId: "g1",
  },
  {
    id: "e3",
    label: "Internet",
    amountCents: 2999,
    paidBy: "Léa",
    settled: false,
    groupId: "g2",
  },
];

export const initialGroups: Group[] = [
  { id: "g1", name: "Colocation", members: ["Léa", "Tom"] },
  { id: "g2", name: "Week-end Bretagne", members: ["Léa", "Tom", "Sam"] },
];

export const currencies : Currency[] = [
  "CAD", "CHF", "GBP", "EUR", "USD"
]

export const fakeRate: Record<Currency, number>= {
  EUR: 1,
  USD: 1.1,
  GBP: 0.85,
  CHF: 0.95,
  CAD: 1.5,
}