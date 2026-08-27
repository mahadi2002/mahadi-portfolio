import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Research } from "./components/Research";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Leadership } from "./components/Leadership";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="min-h-dvh bg-zinc-950">
      <Nav />
      <main>
        <Hero />
        <About />
        <Research />
        <Projects />
        <Skills />
        <Leadership />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
