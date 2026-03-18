import { useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { C, SANS, SERIF } from './tokens.js'
import Landing from './pages/Landing.jsx'
import Quiz from './pages/Quiz.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Solutions from './pages/Solutions.jsx'
import Library from './pages/Library.jsx'
import ProfessionalProfile from './pages/ProfessionalProfile.jsx'

function Nav({ quizDone }) {
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname

  const links = [
    { href: '/',          label: 'Home' },
    { href: '/quiz',      label: 'Assessment' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/solutions', label: 'Solutions' },
    { href: '/library',   label: 'Library' },
    { href: '/profile',   label: 'Pro Report' },
  ]

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 200,
      background: 'rgba(246,241,234,0.96)',
      backdropFilter: 'blur(16px)',
      borderBottom: `1px solid ${C.sand}`,
      padding: '0 28px', height: 56,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      boxShadow: '0 2px 12px rgba(37,37,35,0.05)',
    }}>
      <span
        onClick={() => navigate('/')}
        style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 600,
          color: C.mossDark, cursor: 'pointer', letterSpacing: '0.02em' }}
      >
        Homed<span style={{ color: C.accent }}>Well</span>
      </span>

      <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        {links.map(l => (
          <button key={l.href} onClick={() => navigate(l.href)} style={{
            background: path === l.href ? C.mossDark : 'transparent',
            color: path === l.href ? C.white : C.warmGray,
            border: 'none', borderRadius: 20,
            padding: '5px 12px', cursor: 'pointer',
            fontFamily: SANS, fontSize: 12, fontWeight: 500,
            transition: 'all 0.15s',
          }}>{l.label}</button>
        ))}
      </div>

      <button onClick={() => navigate('/quiz')} style={{
        background: C.accent, color: C.white, border: 'none',
        borderRadius: 20, padding: '7px 18px',
        fontFamily: SANS, fontSize: 12, fontWeight: 600,
        cursor: 'pointer', transition: 'background 0.2s',
        letterSpacing: '0.02em',
      }}>
        {quizDone ? 'Retake Quiz' : 'Take Quiz →'}
      </button>
    </nav>
  )
}

export default function App() {
  const [quizScores, setQuizScores]   = useState({})
  const [quizTags,   setQuizTags]     = useState([])
  const [quizDone,   setQuizDone]     = useState(false)

  function handleQuizComplete(scores, tags) {
    setQuizScores(scores)
    setQuizTags(tags)
    setQuizDone(true)
  }

  const shared = { quizScores, quizTags, quizDone }

  return (
    <>
      <Nav quizDone={quizDone} />
      <Routes>
        <Route path="/"          element={<Landing {...shared} />} />
        <Route path="/quiz"      element={<Quiz onComplete={handleQuizComplete} />} />
        <Route path="/dashboard" element={<Dashboard {...shared} />} />
        <Route path="/solutions" element={<Solutions {...shared} />} />
        <Route path="/library"   element={<Library {...shared} />} />
        <Route path="/profile"   element={<ProfessionalProfile {...shared} />} />
      </Routes>
    </>
  )
}
