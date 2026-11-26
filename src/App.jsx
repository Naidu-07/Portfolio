import Background from './components/Background.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Footer from './components/Footer.jsx'
import Cursor from './components/Cursor.jsx'

export default function App() {
  return (
    <>
      <Background />
      <main>
        <Hero />
        <About />
        <Projects />
        <Footer />
      </main>
      <Cursor />
    </>
  )
}
