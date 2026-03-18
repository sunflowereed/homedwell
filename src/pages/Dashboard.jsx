import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { C, SERIF, SANS } from '../tokens.js'
import { DIMS } from '../data/dimensions.js'

const PROFILES = [
  { id:'self', name:'Jordan Rivera', initials:'JR', color:C.mossDark },
  { id:'partner', name:'Alex Rivera', initials:'AR', color:C.clay },
  { id:'property', name:'123 Oak Street', initials:'OS', color:C.teal },
]

export default function Dashboard({ quizScores, quizDone }) {
  const navigate = useNavigate()
  const [activeDim, setActiveDim] = useState(null)
  const [tier, setTier] = useState('freemium')
  const [activeProfile, setActiveProfile] = useState(0)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const profile = PROFILES[activeProfile]

  const dims = DIMS.map(d => ({
    ...d,
    score: quizScores[d.id] ?? d.score,
  }))

  const overall = Math.round(dims.reduce((s, d) => s + d.score, 0) / dims.length)
  const overallColor = overall >= 70 ? C.moss : overall >= 50 ? C.bark : C.clay
  const priorityDims = [...dims].sort((a, b) => a.score - b.score).slice(0, 3)

  return (
    <div style={{ minHeight:'calc(100vh - 56px)', background:C.cream }}>
      <div style={{ maxWidth:1160, margin:'0 auto', padding:'28px 20px' }}>

        {/* Page header */}
        <div style={{ marginBottom:24, display:'flex', justifyContent:'space-between',
          alignItems:'flex-start', flexWrap:'wrap', gap:16 }}>
          <div>
            <p style={{ fontFamily:SANS, fontSize:11, letterSpacing:'0.12em',
              textTransform:'uppercase', color:C.bark, marginBottom:4, fontWeight:500 }}>Good morning</p>
            <h1 style={{ fontFamily:SERIF, fontSize:'clamp(26px,4vw,38px)', fontWeight:500,
              color:C.charcoal, lineHeight:1.2 }}>Your home environment profile</h1>
            {!quizDone && (
              <p style={{ fontFamily:SANS, fontSize:12, color:C.warmGray, marginTop:6 }}>
                Showing demo data —{' '}
                <span onClick={() => navigate('/quiz')} style={{ color:C.accent, cursor:'pointer', textDecoration:'underline' }}>
                  take the assessment
                </span>{' '}to personalise your results
              </p>
            )}
          </div>

          {/* Tier switcher */}
          <div style={{ display:'flex', gap:4, background:C.sand, borderRadius:16, padding:3 }}>
            {['freemium','lite'].map(t => (
              <button key={t} onClick={() => setTier(t)} style={{
                padding:'5px 14px', borderRadius:12, border:'none',
                background: tier===t ? C.moss : 'transparent',
                color: tier===t ? C.white : C.warmGray,
                fontFamily:SANS, fontSize:11, fontWeight:500,
                textTransform:'capitalize', cursor:'pointer', transition:'all 0.2s',
              }}>{t==='lite'?'Lite':'Free'}</button>
            ))}
          </div>
        </div>

        {/* Overall score card */}
        <div style={{
          background:`linear-gradient(135deg, ${C.mossDark} 0%, #2C3828 100%)`,
          borderRadius:20, padding:'28px 32px', marginBottom:22,
          display:'flex', alignItems:'center', justifyContent:'space-between',
          flexWrap:'wrap', gap:20, position:'relative', overflow:'hidden',
          backgroundImage:'radial-gradient(ellipse at 80% 50%, rgba(201,122,78,0.15) 0%, transparent 60%)',
        }}>
          <div>
            <p style={{ fontFamily:SANS, fontSize:10, color:'rgba(253,250,246,0.55)',
              marginBottom:8, letterSpacing:'0.12em', textTransform:'uppercase' }}>
              Overall Home Health Score
            </p>
            <div style={{ display:'flex', alignItems:'baseline', gap:8, marginBottom:10 }}>
              <span style={{ fontFamily:SERIF, fontSize:76, fontWeight:600,
                color:C.white, lineHeight:1 }}>{overall}</span>
              <span style={{ fontFamily:SANS, fontSize:24, color:'rgba(253,250,246,0.5)' }}>/100</span>
            </div>
            <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
              {dims.slice(0,4).map(d => (
                <div key={d.id} style={{ display:'flex', alignItems:'center', gap:6 }}>
                  <span style={{ fontSize:12 }}>{d.icon}</span>
                  <span style={{ fontFamily:SANS, fontSize:11, color:'rgba(253,250,246,0.6)' }}>{d.score}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            <button onClick={() => navigate('/solutions')} style={{
              padding:'11px 22px', borderRadius:10,
              border:'1.5px solid rgba(255,255,255,0.2)', background:'rgba(255,255,255,0.1)',
              color:C.white, fontFamily:SANS, fontSize:13, fontWeight:500, cursor:'pointer',
            }}>View Solutions →</button>
            <button onClick={() => navigate('/profile')} style={{
              padding:'11px 22px', borderRadius:10, border:'none',
              background:C.accent, color:C.white,
              fontFamily:SANS, fontSize:13, fontWeight:600, cursor:'pointer',
            }}>Share with Professional →</button>
          </div>
        </div>

        {/* Main grid */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:22, alignItems:'start' }}>
          <div>
            {/* Dimensions */}
            <div style={{ background:C.white, border:`1px solid ${C.sand}`,
              borderRadius:18, padding:'22px 22px', marginBottom:20 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
                <h2 style={{ fontFamily:SERIF, fontSize:22, fontWeight:600, color:C.charcoal }}>
                  Health Dimensions
                </h2>
                <span style={{ fontFamily:SANS, fontSize:11, color:C.warmGray }}>
                  Click any to expand
                </span>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:12 }}>
                {dims.map(d => {
                  const scoreColor = d.score>=70?C.moss:d.score>=50?C.bark:C.clay
                  const isActive = activeDim===d.id
                  return (
                    <div key={d.id}
                      onClick={() => setActiveDim(isActive ? null : d.id)}
                      style={{
                        border:`1.5px solid ${isActive ? d.color : C.sand}`,
                        borderTop:`3px solid ${d.color}`,
                        borderRadius:12, padding:'16px 16px 12px',
                        cursor:'pointer', transition:'all 0.2s',
                        background: isActive ? d.color+'08' : C.white,
                        boxShadow: isActive ? `0 4px 16px ${d.color}22` : 'none',
                      }}>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
                        <span style={{ fontSize:20 }}>{d.icon}</span>
                        <span style={{ fontFamily:SERIF, fontSize:24, fontWeight:600, color:scoreColor }}>{d.score}</span>
                      </div>
                      <div style={{ fontFamily:SANS, fontSize:12, fontWeight:500, color:C.charcoal, marginBottom:8 }}>
                        {d.label}
                      </div>
                      <div style={{ height:4, background:C.sand, borderRadius:2, overflow:'hidden' }}>
                        <div style={{ width:`${d.score}%`, height:'100%', background:scoreColor, borderRadius:2, transition:'width 0.6s' }}/>
                      </div>
                      {isActive && (
                        <p style={{ fontFamily:SANS, fontSize:11, color:C.warmGray, lineHeight:1.65, marginTop:10 }}>
                          {d.rec}
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Priority actions */}
            <div style={{ background:C.white, border:`1px solid ${C.sand}`, borderRadius:18, padding:'22px 22px', marginBottom:20 }}>
              <h2 style={{ fontFamily:SERIF, fontSize:22, fontWeight:600, color:C.charcoal, marginBottom:18 }}>
                Priority Actions
              </h2>
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {priorityDims.map((d, i) => (
                  <div key={d.id} style={{
                    display:'flex', gap:14, alignItems:'flex-start',
                    padding:'14px 16px', borderRadius:12,
                    background: i===0 ? C.clay+'0D' : C.cream,
                    border:`1px solid ${i===0 ? C.clay+'40' : C.sand}`,
                  }}>
                    <span style={{ fontSize:18 }}>{d.icon}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontFamily:SANS, fontSize:13, fontWeight:500, color:C.charcoal, marginBottom:3 }}>
                        {d.label}
                        {i===0 && <span style={{ marginLeft:8, fontSize:10, background:C.clay+'20',
                          color:C.clay, padding:'2px 7px', borderRadius:8, fontWeight:600 }}>Highest Priority</span>}
                      </div>
                      <div style={{ fontFamily:SANS, fontSize:12, color:C.warmGray, lineHeight:1.65 }}>{d.rec}</div>
                    </div>
                    <span style={{ fontFamily:SERIF, fontSize:20, fontWeight:600,
                      color:d.score<50?C.clay:C.bark, flexShrink:0 }}>{d.score}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => navigate('/solutions')} style={{
                marginTop:16, width:'100%', padding:'12px', borderRadius:10, border:'none',
                background:C.mossDark, color:C.white,
                fontFamily:SANS, fontSize:13, fontWeight:600, cursor:'pointer',
              }}>See All Recommended Solutions →</button>
            </div>

            {/* Explore section */}
            <div style={{ background:C.white, border:`1px solid ${C.sand}`, borderRadius:18, padding:'22px 22px' }}>
              <h2 style={{ fontFamily:SERIF, fontSize:22, fontWeight:600, color:C.charcoal, marginBottom:6 }}>
                Explore the Library
              </h2>
              <p style={{ fontFamily:SANS, fontSize:13, color:C.warmGray, marginBottom:16, lineHeight:1.65 }}>
                Evidence-based articles across 8 wellness pillars — matched to your home environment results.
              </p>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                {['🌿 Breathe','🌙 Sleep','☀️ Light','🧠 Think'].map(p => (
                  <div key={p} onClick={() => navigate('/library')} style={{
                    padding:'12px 14px', borderRadius:10, border:`1px solid ${C.sand}`,
                    background:C.cream, cursor:'pointer', fontFamily:SANS, fontSize:13, color:C.charcoal,
                    transition:'border-color 0.15s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = C.sage}
                    onMouseLeave={e => e.currentTarget.style.borderColor = C.sand}
                  >{p}</div>
                ))}
              </div>
              <button onClick={() => navigate('/library')} style={{
                marginTop:12, width:'100%', padding:'11px', borderRadius:10,
                border:`1px solid ${C.sand}`, background:'transparent',
                color:C.warmGray, fontFamily:SANS, fontSize:13, cursor:'pointer',
              }}>Browse All Articles →</button>
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ position:'sticky', top:76 }}>
            <div style={{ background:C.white, border:`1px solid ${C.sand}`, borderRadius:18, padding:'22px', marginBottom:16 }}>
              {/* Profile */}
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:18,
                paddingBottom:18, borderBottom:`1px solid ${C.sand}` }}>
                <div style={{ width:44, height:44, borderRadius:'50%', background:profile.color,
                  display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <span style={{ fontFamily:SERIF, fontSize:18, color:C.white, fontWeight:600 }}>
                    {profile.initials}
                  </span>
                </div>
                <div>
                  <div style={{ fontFamily:SANS, fontSize:14, fontWeight:500, color:C.charcoal }}>
                    {profile.name}
                  </div>
                  <div style={{ fontFamily:SANS, fontSize:11, color:C.warmGray }}>
                    {tier==='lite' ? 'Lite Member' : 'Free Account'}
                  </div>
                </div>
              </div>

              {/* Dimension breakdown */}
              <div style={{ marginBottom:16 }}>
                <div style={{ fontFamily:SANS, fontSize:10, fontWeight:600, letterSpacing:'0.1em',
                  textTransform:'uppercase', color:C.bark, marginBottom:12 }}>Score Breakdown</div>
                {dims.map(d => {
                  const sc = d.score
                  const col = sc>=70?C.moss:sc>=50?C.bark:C.clay
                  return (
                    <div key={d.id} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
                      <span style={{ fontSize:12, width:18, textAlign:'center' }}>{d.icon}</span>
                      <div style={{ flex:1, height:5, background:C.sand, borderRadius:3, overflow:'hidden' }}>
                        <div style={{ width:`${sc}%`, height:'100%', background:col, borderRadius:3 }}/>
                      </div>
                      <span style={{ fontFamily:SANS, fontSize:11, color:col, fontWeight:600, width:26, textAlign:'right' }}>{sc}</span>
                    </div>
                  )
                })}
              </div>

              {tier==='freemium' && (
                <div style={{ background:C.sagePale, border:`1px solid ${C.sage}`, borderRadius:10, padding:'14px 14px' }}>
                  <div style={{ fontFamily:SERIF, fontSize:16, fontWeight:600, color:C.mossDark, marginBottom:6 }}>
                    Upgrade to Lite
                  </div>
                  <div style={{ fontFamily:SANS, fontSize:12, color:C.warmGray, lineHeight:1.65, marginBottom:12 }}>
                    Unlock detailed recommendations, full article library, and professional profile sharing.
                  </div>
                  <button onClick={() => setTier('lite')} style={{
                    width:'100%', padding:'9px', borderRadius:8, border:'none',
                    background:C.moss, color:C.white, fontFamily:SANS, fontSize:13,
                    fontWeight:600, cursor:'pointer',
                  }}>Upgrade →</button>
                </div>
              )}
            </div>

            {/* Quick actions */}
            <div style={{ background:C.white, border:`1px solid ${C.sand}`, borderRadius:18, padding:'22px' }}>
              <div style={{ fontFamily:SANS, fontSize:10, fontWeight:600, letterSpacing:'0.1em',
                textTransform:'uppercase', color:C.bark, marginBottom:14 }}>Quick Actions</div>
              {[
                { label:'📋 Share with Professional', action:() => navigate('/profile') },
                { label:'🛒 View Solutions', action:() => navigate('/solutions') },
                { label:'📚 Explore Library', action:() => navigate('/library') },
                { label:'🔄 Retake Assessment', action:() => navigate('/quiz') },
              ].map(a => (
                <button key={a.label} onClick={a.action} style={{
                  display:'block', width:'100%', padding:'10px 12px',
                  marginBottom:8, borderRadius:8, border:`1px solid ${C.sand}`,
                  background:'transparent', color:C.charcoal,
                  fontFamily:SANS, fontSize:13, textAlign:'left', cursor:'pointer',
                  transition:'border-color 0.15s',
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = C.sage}
                  onMouseLeave={e => e.currentTarget.style.borderColor = C.sand}
                >{a.label}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
