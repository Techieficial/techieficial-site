import { Nav } from "@/components/Nav";
import { Services } from "@/components/Services";
import {
  Academy,
  Compare,
  Faq,
  FinalCta,
  Footer,
  Hero,
  Process,
  ProofBand,
  Testimonials,
} from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProofBand />
        <Services />
        <Compare />
        <Process />
        <Academy />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
