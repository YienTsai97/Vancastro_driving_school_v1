import { PlanHero } from "@/components/hero/plan-hero";
import { PlansContact } from "@/components/planning-body/plans-contact/plans-contact";
import PlanInstructor from "@/components/planning-body/plans-intructor/plan-instructor";
import Partners from "@/components/planning-body/plans-partner/partners";
import Plans from "@/components/plans-plan/plans";

export default function PlanPage() {
  return (
    <>
      {/* components */}
      <PlanHero />
      <Plans />
      <Partners />
      <PlanInstructor />
      <PlansContact />
    </>
  );
}
