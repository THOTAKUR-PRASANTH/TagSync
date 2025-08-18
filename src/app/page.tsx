import { Metadata } from "next";
import Banner from "./components/home/hero";
import QRWithItems from "./components/home/QRWithItems";
import Work from "./components/home/work";
import Table from "./components/home/table";
import Features from "./components/home/features";
import Simple from "./components/home/simple";
import Trade from "./components/home/trade";
import Faq from "./components/home/faq";
import ContactForm from "./components/ContactForm";

export const metadata: Metadata = {
  title: "TagSync",
};

export default function Home() {
  return (
    <main>
      <Banner/>
      <QRWithItems />
      <Work />
      <Table />
      <Features />
      <Simple />
      <Trade />
      <Faq />
      <ContactForm />
    </main>
  );
}
