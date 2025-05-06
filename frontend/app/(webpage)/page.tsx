import { LandingHero } from "@/components/hero/landing-hero";
import Instructors from "@/components/landing/instructors/instructors";
import { Reviews } from "@/components/landing/reviews/reviews";
import { SimpleSteps } from "@/components/landing/simple-steps";
import ChooseUsCard from "@/components/landing/why-choose-us/choose-us-card";
import Plans from "@/components/plans-plan/plans";

export default function Home() {
  return (
    <>
      {/* Landing Page */}
      <LandingHero />
      <ChooseUsCard />
      <Instructors />
      <Reviews />
      <SimpleSteps />
      <Plans />
    </>
  );
}
