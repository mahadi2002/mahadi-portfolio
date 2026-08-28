import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { GithubActivity } from "./components/GithubActivity";
import { About } from "./components/About";
import { Research } from "./components/Research";
import { Projects } from "./components/Projects";
import { Products } from "./components/Products";
import { Skills } from "./components/Skills";
import { Leadership } from "./components/Leadership";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ScrollProgress } from "./components/ScrollProgress";
import { ScrollToTop } from "./components/ScrollToTop";

function App() {
  return (
    <div className="min-h-dvh bg-zinc-950">
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <GithubActivity />
        <About />
        <Research />
        <Projects />
        <Products />
        <Skills />
        <Leadership />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
