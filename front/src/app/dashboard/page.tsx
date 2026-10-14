"use client";

import { Suspense } from "react";
import DashboardContent from "./DashboardContent";

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-5xl px-6 py-16">
          <p className="text-center text-slate-600">Cargando Dashboard...</p>
        </main>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
