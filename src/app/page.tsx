"use client";
import { useEffect } from "react";
import Banner from "./components/home/hero";
import QRWithItems from "./components/home/QRWithItems";
import Work from "./components/home/work";
import Table from "./components/home/table";
import Features from "./components/home/features";
import Simple from "./components/home/simple";
import Trade from "./components/home/trade";
import Faq from "./components/home/faq";
import ContactForm from "./components/ContactForm";

export default function Home() {
  useEffect(() => {
    // Clear all cookies
    document.cookie.split(";").forEach((cookie) => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie =
        name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    });
    // Clear localStorage and sessionStorage
    localStorage.clear();
    sessionStorage.clear();
  }, []);

  return (
    <main>
      <Banner />
      <QRWithItems />
      <Work />
      <Table />
      <Features />
      <Simple />
      <Trade />
      <>
        <Faq />
        <ContactForm />
      </>
    </main>
  );
}
