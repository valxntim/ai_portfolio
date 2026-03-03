import { Routes, Route } from 'react-router-dom'
import { ChatProvider } from './context/ChatContext'
import ScrollToTop from './components/ScrollToTop'
import Navbar from './components/Navbar'
import ChatWidget from './components/ChatWidget'
import Home from './pages/Home'
import Experience from './pages/Experience'
import Projects from './pages/Projects'
import Education from './pages/Education'
import Contact from './pages/Contact'

export default function App() {
  return (
    <ChatProvider>
      <div className="min-h-screen bg-slate-900 text-slate-50 font-sans">
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/education" element={<Education />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <ChatWidget />
      </div>
    </ChatProvider>
  )
}