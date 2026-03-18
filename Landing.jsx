import { useNavigate } from 'react-router-dom'
import { C, SERIF, SANS } from '../tokens.js'
import { DIMS } from '../data/dimensions.js'

export default function Landing({ quizDone }) {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: C.cream }}>

      {/* Hero */}
      <div style={{
        background: `linear-gradient(150deg, ${C.mossDark} 0%, #2C4030 50%, #3A3020 100%)`,
        padding: '100px 32px 88px', textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(ellipse at 60% 40%, rgba(201,122,78,0.15) 0%, transparent 60%)', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', inset:0, backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")", pointerEvents:'none', opacity:0.4 }}/>
        <div style={{ position: 'relative', maxWidth: 680, margin: '0 auto' }}>
          <p style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: C.bark, marginBottom: 20 }}>
            Evidence-Based Residential Health
          </p>
          <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(44px,7vw,76px)',
            fontWeight: 500, color: C.white, lineHeight: 1.08, marginBottom: 22 }}>
            Your home affects<br /><em style={{ fontStyle:'italic', color:'#D4A882' }}>everything.</em>
          </h1>
          <p style={{ fontFamily: SANS, fontSize: 16, color: 'rgba(253,250,246,0.7)',
            lineHeight: 1.78, maxWidth: 500, margin: '0 auto 44px' }}>
            HomeDwell translates peer-reviewed residential health research into a personalised action plan for your home — room by room, dimension by dimension.
          </p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <button onClick={() => navigate('/quiz')} style={{
              background: C.accent, color: C.white, border: 'none', borderRadius: 12,
              padding: '15px 36px', fontFamily: SANS, fontSize: 15, fontWeight: 600, cursor: 'pointer',
              boxShadow: `0 8px 28px rgba(201,122,78,0.35)`,
            }}>Take the Free Assessment →</button>
            <button onClick={() => navigate('/dashboard')} style={{
              background: 'rgba(255,255,255,0.1)', color: C.white,
              border: '1.5px solid rgba(255,255,255,0.2)', borderRadius: 12,
              padding: '15px 28px', fontFamily: SANS, fontSize: 15, fontWeight: 500, cursor: 'pointer',
            }}>View Demo Dashboard</button>
          </div>
          {quizDone && (
            <p style={{ fontFamily: SANS, fontSize: 12, color: 'rgba(253,250,246,0.5)', marginTop: 16 }}>
              ✓ You've completed the assessment — <span onClick={() => navigate('/dashboard')} style={{ color: C.bark, cursor:'pointer', textDecoration:'underline' }}>view your results</span>
            </p>
          )}
        </div>
      </div>

      {/* Dimensions */}
      <div style={{ maxWidth: 1040, margin: '0 auto', padding: '72px 24px' }}>
        <p style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, letterSpacing: '0.16em',
          textTransform: 'uppercase', color: C.bark, textAlign: 'center', marginBottom: 12 }}>What We Measure</p>
        <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4vw,44px)', fontWeight: 500,
          textAlign: 'center', color: C.charcoal, marginBottom: 52 }}>
          Seven dimensions of home health
        </h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(210px,1fr))', gap:16 }}>
          {DIMS.map(d => (
            <div key={d.id} style={{
              background: C.white, border: `1px solid ${C.sand}`,
              borderRadius: 16, padding: '22px 20px',
              borderTop: `3px solid ${d.color}`,
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${d.color}22` }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div style={{ fontSize: 26, marginBottom: 12 }}>{d.icon}</div>
              <div style={{ fontFamily: SERIF, fontSize: 17, fontWeight: 600, color: C.charcoal, marginBottom: 10 }}>{d.label}</div>
              <div style={{ height: 5, background: C.sand, borderRadius: 3, overflow: 'hidden', marginBottom: 8 }}>
                <div style={{ width: `${d.score}%`, height: '100%', background: d.color, borderRadius: 3 }}/>
              </div>
              <div style={{ fontFamily: SANS, fontSize: 11, color: C.warmGray }}>{d.score}/100 avg score</div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div style={{ background: C.parchment, padding: '72px 24px' }}>
        <div style={{ maxWidth: 840, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4vw,42px)', fontWeight: 500,
            color: C.charcoal, marginBottom: 56 }}>How HomeDwell works</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 32, marginBottom: 52 }}>
            {[
              { n:'01', title:'Assess', body:'Answer evidence-based questions about your home across air, sleep, light, water, and more. Takes about 8 minutes.' },
              { n:'02', title:'Understand', body:'Receive a personalised score for each dimension, grounded in peer-reviewed research — not manufacturer claims.' },
              { n:'03', title:'Act', body:'Get prioritised recommendations matched to your home, your budget, and your goals. Share with your broker, contractor, or architect.' },
            ].map(s => (
              <div key={s.n} style={{ textAlign: 'left' }}>
                <div style={{ fontFamily: SERIF, fontSize: 40, fontWeight: 600, color: C.bark, marginBottom: 12, opacity: 0.45 }}>{s.n}</div>
                <div style={{ fontFamily: SERIF, fontSize: 21, fontWeight: 600, color: C.charcoal, marginBottom: 10 }}>{s.title}</div>
                <div style={{ fontFamily: SANS, fontSize: 13, color: C.warmGray, lineHeight: 1.72 }}>{s.body}</div>
              </div>
            ))}
          </div>
          <button onClick={() => navigate('/quiz')} style={{
            background: C.mossDark, color: C.white, border: 'none', borderRadius: 12,
            padding: '15px 40px', fontFamily: SANS, fontSize: 15, fontWeight: 600, cursor: 'pointer',
          }}>Start Your Assessment →</button>
        </div>
      </div>

      {/* Evidence commitment */}
      <div style={{ maxWidth: 840, margin: '0 auto', padding: '72px 24px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:20 }}>
          {[
            { icon:'🔬', title:'Research-first', body:'Every recommendation traces to a peer-reviewed source. We cite it on the card.' },
            { icon:'🌿', title:'Transparent evidence tiers', body:'Research-Backed, Promising, Manufacturer Claims, Not Studied — we say which, always.' },
            { icon:'🏠', title:'Home-specific', body:'Unlike generic wellness advice, every recommendation is calibrated to your home, your answers, your priorities.' },
          ].map(p => (
            <div key={p.title} style={{ padding: '24px 20px', background: C.white,
              border: `1px solid ${C.sand}`, borderRadius: 14 }}>
              <div style={{ fontSize: 24, marginBottom: 12 }}>{p.icon}</div>
              <div style={{ fontFamily: SERIF, fontSize: 18, fontWeight: 600, color: C.charcoal, marginBottom: 8 }}>{p.title}</div>
              <div style={{ fontFamily: SANS, fontSize: 13, color: C.warmGray, lineHeight: 1.7 }}>{p.body}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div style={{ background: C.mossDark, padding: '56px 32px', textAlign: 'center',
        backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(201,122,78,0.12) 0%, transparent 60%)' }}>
        <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(26px,4vw,40px)', fontWeight: 500,
          color: C.white, marginBottom: 12 }}>
          Your home is <em style={{ fontStyle:'italic', color:'#D4A882' }}>already affecting you.</em>
        </h2>
        <p style={{ fontFamily: SANS, fontSize: 14, color: 'rgba(253,250,246,0.65)',
          lineHeight: 1.7, maxWidth: 440, margin: '0 auto 32px' }}>
          The question is whether it's working for you or against you. Find out in 8 minutes.
        </p>
        <button onClick={() => navigate('/quiz')} style={{
          background: C.accent, color: C.white, border: 'none', borderRadius: 12,
          padding: '15px 40px', fontFamily: SANS, fontSize: 15, fontWeight: 600, cursor: 'pointer',
        }}>Take the Free Assessment →</button>
      </div>
    </div>
  )
}
