import { Nav } from "@/components/Nav";
import { Services } from "@/components/Services";
import {
  Academy,
  Compare,
  Faq,
  FinalCta,
  Footer,
  Hero,
  HeroBackdrop,
  PlanSection,
  Process,
  ProofBand,
  Testimonials,
} from "@/components/Sections";

export default function Home() {
  return (
    <div className="relative isolate">
      <HeroBackdrop />
      <Nav />
      <main>
        <Hero />
        <ProofBand />
        <Services />
        <PlanSection />
        <Compare />
        <Process />
        <Academy />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
