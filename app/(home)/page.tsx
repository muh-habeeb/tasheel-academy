import { Hero } from "./_components/Hero";
import { Cources } from "./_components/Course";
import { HowItWorks } from "./_components/HowItWorks";
import { ScrollySection } from "@/components/scrollytelling";

export default function Home() {
  return (
    <>
      <ScrollySection />
      <Cources />
      <HowItWorks />
      {/* Additional home sections will go below */}
    </>
  );
}
