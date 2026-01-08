// app/dashboard/page.tsx
"use client";

import LeadsDashboard from "@/components/LeadsDashboard";
import CDBackground from "@/components/CDBackground";

export default function DashboardPage() {
  return (
    <CDBackground>
      <LeadsDashboard />
    </CDBackground>
  );
}
