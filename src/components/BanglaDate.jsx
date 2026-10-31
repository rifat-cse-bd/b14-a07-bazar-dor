"use client";

import { useSyncExternalStore } from "react";

const formatter = new Intl.DateTimeFormat("bn-BD", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const subscribe = () => () => {};
const getToday = () => formatter.format(new Date());

export default function BanglaDate({ className = "min-h-4 text-xs leading-4" }) {
  // Empty on the server so the date always comes from the visitor's clock
  const date = useSyncExternalStore(subscribe, getToday, () => "");

  return <span className={className}>{date}</span>;
}
