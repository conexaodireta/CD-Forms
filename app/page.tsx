// app/page.tsx
"use client";

import LeadWizard from "@/components/LeadWizard";
import CDBackground from "@/components/CDBackground";

export default function Home() {
  return (
    <CDBackground>
      <LeadWizard />
    </CDBackground>
  );
}
