import { useEffect } from "react";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";
import { Footer } from "./components/Footer";

export default function App() {
  useEffect(() => {
    console.log(
      "%cMillion Gossaye",
      "font-family:Georgia,serif;font-size:22px;color:#d6c7a1",
    );
    console.log(
      "%cCurious devs are my favorite kind. → millagoss19@gmail.com · github.com/Millagoss",
      "font-family:monospace;color:#8a8474",
    );
  }, []);

  return (
    <div className="grain">
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[70] focus:bg-gold focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Projects />
        <Experience />
        <Skills />
      </main>
      <Footer />
    </div>
  );
}
