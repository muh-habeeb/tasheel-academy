import { Hero } from "./_components/Hero";
import { Cources } from "./_components/Course";
import { HowItWorks } from "./_components/HowItWorks";

export default function Home() {
  return (
    <>
      <Hero />
      <Cources />
      <HowItWorks />
      {/* Additional home sections will go below */}
    </>
  );
}
