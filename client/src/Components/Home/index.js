import React from "react";
import Title from "../Title";
import { HomeContainer } from "./HomeElements";
import Features from "../Features";
import Testimonials from "../Testimonials";
import CTA from '../CTA';
import Footer from '../Footer';

function Home() {
  return (
    <HomeContainer classname="container-fluid">
      <Title />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </HomeContainer>
  );
}

export default Home;
