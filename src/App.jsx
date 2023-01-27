import React, { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Demo } from "./components/demo";
import { Jobs } from "./components/jobs";
import { Requirements } from "./components/requirements";
import { Process } from "./components/process";
import { CTA } from "./components/cta";
import { Footer } from "./components/footer";
// import JsonData from "./data/data.json";
// import SmoothScroll from "smooth-scroll";
import "./App.css";

// export const scroll = new SmoothScroll('a[href*="#"]', {
//   speed: 1000,
//   speedAsDuration: true,
// });

const App = () => {
  // const [landingPageData, setLandingPageData] = useState({});
  // useEffect(() => {
  //   setLandingPageData(JsonData);
  // }, []);

  return (
    <div>
      <Navigation />
      <Header />
      <Demo />
      <Jobs />
      <Process />
      <Requirements />
      <CTA />
      <Footer />
      {/*
      <Requirements data={landingPageData.Requirements} />
      <Process data={landingPageData.Process} />
      <CTA data={landingPageData.CTA} /> */}
    </div>
  );
};

export default App;