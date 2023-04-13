import React, { useState, useEffect } from "react";
import { Navigation } from "../components/navigation";
import { Header } from "../components/header";
import { Demo } from "../components/demo";
import { Jobs } from "../components/jobs";
import { Requirements } from "../components/requirements";
import { Process } from "../components/process";
import { CTA } from "../components/cta";
import { Footer } from "../components/footer";

export const Landing = () => {

  return (
    <div>
      <Navigation />
      <Header />
      <Demo />
      <Jobs />
      <Process />
      {/* <Requirements /> */}
      <CTA />
      <Footer />
    </div>
  );
};