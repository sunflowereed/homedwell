import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { C, SERIF, SANS } from '../tokens.js'
import { ARTICLES, PILLARS } from '../data/articles.js'

export default function Library({ quizDone }) {
  const navigate = useNavigate()
  const [activePillar, setActivePillar] = useState('all')
  const [activeView, setActiveView] = useState('all')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('default')
  const [readArticles, setReadArticles] = useState(new Set())
  const [savedArticles, setSavedArticles] = useState(new Set())
  const [notes, setNotes] = useState({})
  const [openId, setOpenId] = useState(null)
  const [toast, setToast] = useState('')
  const [toastTimer, setToastTimer] = useState(null)

  const openArticle = ARTICLES.find(a => a.id === openId)

  function showToast(msg) {
    setToast(msg)
    clearTimeout(toastTimer)
    setToastTimer(setTimeout(() => setToast(''), 2400))
  }

  function toggleRead(id) {
    setReadArticles(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
    showToast(readArticles.has(id) ? 'Marked as unread' : '✓ Marked as read')
  }

  function toggleSave(id) {
    setSavedArticles(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
    showToast(savedArticles.has(id) ? 'Removed from saved' : '🔖 Article saved')
  }

  let articles = ARTICLES.filter(a => {
    if (activePillar !== 'all' && a.pillar !== activePillar) return false
    if (activeView === 'recommended' && !a.recommended) return false
    if (activeView === 'saved' && !savedArticles.has(a.id)) return false
    if (activeView === 'unread' && readArticles.has(a.id)) return false
    if (search && !a.title.toLowerCase().includes(search.toLowerCase()) &&
        !a.subtitle.toLowerCase().includes(search.toLowerCase()) &&
        !a.excerpt.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  if (sort === 'pillar') articles.sort((a, b) => a.pillar.localeCompare(b.pillar))
  else if (sort === 'title') articles.sort((a, b) => a.title.localeCompare(b.title))
  else articles.sort((a, b) => (b.recommended?1:0) - (a.recommended?1:0))

  const pillarColor = p => PILLARS.find(pl => pl.id===p)?.color || C.teal
  const pillarIcon = p => PILLARS.find(pl => pl.id===p)?.icon || '📄'

  return (
    <div style={{ minHeight:'calc(100vh - 56px)', background:C.cream }}>

      {/* Hero */}
      <div style={{ background:'linear-gradient(160deg, #1a3f3f 0%, #2a5a5a 60%, #3a7060 100%)',
        padding:'52px 32px 48px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', bottom:-2, left:0, right:0, height:32,
          background:C.cream, clipPath:'ellipse(55% 100% at 50% 100%)' }}/>
        <div style={{ maxWidth:960, margin:'0 auto', position:'relative' }}>
          <p style={{ fontFamily:SANS, fontSize:10, fontWeight:600, letterSpacing:'0.2em',
            textTransform:'uppercase', color:C.tealMid, marginBottom:14 }}>
            Evidence-Based Home Wellness Library
          </p>
          <h1 style={{ fontFamily:SERIF, fontSize:'clamp(2.2rem,5vw,3.6rem)', fontWeight:300,
            color:'#fff', lineHeight:1.15, marginBottom:16 }}>
            Your Home, <em style={{ fontStyle:'italic', color:'#a8d8d8' }}>Decoded</em>
          </h1>
          <p style={{ fontFamily:SANS, fontSize:14, color:'rgba(255,255,255,0.6)',
            maxWidth:520, lineHeight:1.7, marginBottom:28 }}>
            {ARTICLES.length} peer-reviewed articles across 8 wellness pillars — each one a direct bridge between clinical research and the rooms you live in.
          </p>
          {quizDone && (
            <div style={{ display:'inline-flex', alignItems:'center', gap:12,
              background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.2)',
              backdropFilter:'blur(8px)', borderRadius:10, padding:'14px 20px', maxWidth:520 }}>
              <span style={{ fontSize:22 }}>🎯</span>
              <div style={{ fontFamily:SANS, fontSize:13, color:'rgba(255,255,255,0.85)', lineHeight:1.5 }}>
                <strong style={{ color:'#fff', display:'block', marginBottom:2 }}>Based on your quiz results</strong>
                Recommended articles are highlighted below based on your home environment profile.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div style={{ background:C.white, borderBottom:`1px solid ${C.sand}`,
        display:'flex', overflowX:'auto' }}>
        {[
          { num: ARTICLES.length, label:'Articles' },
          { num: readArticles.size, label:'Read' },
          { num: savedArticles.size, label:'Saved' },
          { num: ARTICLES.filter(a => a.recommended).length, label:'Recommended' },
          { num: 8, label:'Pillars' },
        ].map(s => (
          <div key={s.label} style={{ flex:1, minWidth:100, padding:'14px 20px',
            borderRight:`1px solid ${C.sand}`, textAlign:'center', lastChild:{borderRight:'none'} }}>
            <span style={{ fontFamily:SERIF, fontSize:28, fontWeight:600, color:C.teal,
              display:'block', lineHeight:1 }}>{s.num}</span>
            <span style={{ fontFamily:SANS, fontSize:11, color:'#999', textTransform:'uppercase',
              letterSpacing:'0.1em', marginTop:3, display:'block' }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Layout */}
      <div style={{ maxWidth:1160, margin:'0 auto', padding:'32px 20px 80px',
        display:'grid', gridTemplateColumns:'220px 1fr', gap:28, alignItems:'start' }}>

        {/* Sidebar */}
        <div style={{ position:'sticky', top:68 }}>
          {/* Search */}
          <div style={{ position:'relative', marginBottom:20 }}>
            <span style={{ position:'absolute', left:11, top:'50%', transform:'translateY(-50%)',
              color:'#999', fontSize:14, pointerEvents:'none' }}>🔍</span>
            <input
              type="text" placeholder="Search articles…" value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width:'100%', padding:'10px 14px 10px 34px',
                border:`1.5px solid ${C.sand}`, borderRadius:8, fontFamily:SANS,
                fontSize:13, color:C.charcoal, background:C.white, outline:'none' }}
            />
          </div>

          {/* Pillars */}
          <div style={{ fontFamily:SANS, fontSize:10, fontWeight:600, letterSpacing:'0.16em',
            textTransform:'uppercase', color:'#999', marginBottom:10, paddingLeft:2 }}>Filter by Pillar</div>
          <ul style={{ listStyle:'none', marginBottom:20 }}>
            {PILLARS.map(p => {
              const count = p.id==='all' ? ARTICLES.length : ARTICLES.filter(a=>a.pillar===p.id).length
              const isActive = activePillar===p.id
              return (
                <li key={p.id}>
                  <button onClick={() => setActivePillar(p.id)} style={{
                    display:'flex', alignItems:'center', gap:10, width:'100%',
                    padding:'9px 12px', border:'none', borderRadius:8,
                    background: isActive ? C.teal : 'transparent',
                    cursor:'pointer', textAlign:'left', fontFamily:SANS,
                    fontSize:13, color: isActive ? '#fff' : '#666',
                    marginBottom:2, transition:'all 0.15s',
                  }}>
                    <span style={{ fontSize:15, width:20, textAlign:'center' }}>{p.icon}</span>
                    <span style={{ flex:1 }}>{p.label}</span>
                    <span style={{ fontSize:10, fontWeight:600, padding:'2px 7px', borderRadius:10,
                      background: isActive ? 'rgba(255,255,255,0.25)' : C.tealLight,
                      color: isActive ? '#fff' : C.teal }}>{count}</span>
                  </button>
                </li>
              )
            })}
          </ul>

          {/* View */}
          <div style={{ fontFamily:SANS, fontSize:10, fontWeight:600, letterSpacing:'0.16em',
            textTransform:'uppercase', color:'#999', marginBottom:10 }}>View</div>
          <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:20 }}>
            {[['all','All'],['recommended','⭐ Recommended'],['saved','🔖 Saved'],['unread','🆕 Unread']].map(([v,l]) => (
              <button key={v} onClick={() => setActiveView(v)} style={{
                padding:'5px 11px', borderRadius:20, border:`1.5px solid ${activeView===v?C.charcoal:C.sand}`,
                background:activeView===v?C.charcoal:'transparent', color:activeView===v?'#fff':'#666',
                fontFamily:SANS, fontSize:11, fontWeight:500, cursor:'pointer',
              }}>{l}</button>
            ))}
          </div>

          {/* Sort */}
          <div style={{ fontFamily:SANS, fontSize:10, fontWeight:600, letterSpacing:'0.16em',
            textTransform:'uppercase', color:'#999', marginBottom:8 }}>Sort By</div>
          <select value={sort} onChange={e => setSort(e.target.value)} style={{
            width:'100%', padding:'9px 12px', border:`1.5px solid ${C.sand}`,
            borderRadius:8, fontFamily:SANS, fontSize:13, color:C.charcoal,
            background:C.white, outline:'none', cursor:'pointer',
          }}>
            <option value="default">Recommended First</option>
            <option value="pillar">Pillar</option>
            <option value="title">Title A–Z</option>
          </select>
        </div>

        {/* Main */}
        <main>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center',
            marginBottom:20, flexWrap:'wrap', gap:12 }}>
            <h2 style={{ fontFamily:SERIF, fontSize:26, fontWeight:400, color:C.charcoal }}>
              {activePillar==='all' ? 'All Articles' : `${pillarIcon(activePillar)} ${PILLARS.find(p=>p.id===activePillar)?.label}`}
            </h2>
            <span style={{ fontFamily:SANS, fontSize:13, color:'#999' }}>
              {articles.length} article{articles.length!==1?'s':''}
            </span>
          </div>

          {quizDone && (activeView==='all'||activeView==='recommended') && (
            <div style={{ background:'linear-gradient(135deg,#fffaf4,#fff8ef)',
              border:'1.5px solid #e8c88a', borderRadius:12,
              padding:'16px 20px', marginBottom:20, display:'flex', alignItems:'center', gap:14 }}>
              <span style={{ fontSize:20 }}>✨</span>
              <div style={{ fontFamily:SANS, fontSize:13, color:'#666', lineHeight:1.5 }}>
                <strong style={{ color:'#c97d2e', fontSize:14 }}>Cited in your quiz results</strong><br/>
                Highlighted articles are recommended based on your home environment profile.
              </div>
            </div>
          )}

          {articles.length === 0 ? (
            <div style={{ textAlign:'center', padding:'64px 20px' }}>
              <div style={{ fontSize:48, marginBottom:16 }}>🔍</div>
              <p style={{ fontFamily:SANS, fontSize:14, color:'#999' }}>
                No articles match your current filters.
              </p>
            </div>
          ) : (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(265px,1fr))', gap:18 }}>
              {articles.map(a => (
                <article key={a.id} onClick={() => setOpenId(a.id)} style={{
                  background: readArticles.has(a.id) ? '#F5F5F0' : C.white,
                  border:`1.5px solid ${a.recommended ? '#c97d2e' : C.sand}`,
                  borderRadius:14, overflow:'hidden', cursor:'pointer',
                  transition:'all 0.22s', display:'flex', flexDirection:'column',
                  boxShadow: a.recommended ? `0 0 0 1px #c97d2e` : 'none',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=C.tealMid; e.currentTarget.style.boxShadow=`0 8px 24px rgba(42,124,124,0.12)`; e.currentTarget.style.transform='translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor=a.recommended?'#c97d2e':C.sand; e.currentTarget.style.boxShadow=a.recommended?`0 0 0 1px #c97d2e`:'none'; e.currentTarget.style.transform='none' }}
                >
                  <div style={{ height:5, background:pillarColor(a.pillar) }}/>
                  <div style={{ padding:'16px 18px 12px', flex:1, display:'flex', flexDirection:'column' }}>
                    <div style={{ display:'flex', gap:6, marginBottom:10, flexWrap:'wrap' }}>
                      <span style={{ fontFamily:SANS, fontSize:10, fontWeight:600, letterSpacing:'0.1em',
                        textTransform:'uppercase', padding:'3px 8px', borderRadius:8,
                        background: a.recommended ? '#FDF0E0' : C.tealLight,
                        color: a.recommended ? '#c97d2e' : C.teal }}>
                        {pillarIcon(a.pillar)} {a.pillar}
                      </span>
                      {a.recommended && <span style={{ fontFamily:SANS, fontSize:10, fontWeight:600,
                        padding:'3px 8px', borderRadius:8, background:'#FDF0E0', color:'#c97d2e' }}>
                        ⭐ Recommended</span>}
                      {readArticles.has(a.id) && <span style={{ fontFamily:SANS, fontSize:10,
                        padding:'3px 8px', borderRadius:8, background:'#EBEBEB', color:'#999' }}>✓ Read</span>}
                    </div>
                    <h3 style={{ fontFamily:SERIF, fontSize:17, fontWeight:600, color:C.charcoal,
                      lineHeight:1.3, marginBottom:4 }}>{a.title}</h3>
                    <em style={{ fontFamily:SERIF, fontWeight:300, fontSize:13, color:C.warmGray,
                      fontStyle:'italic', marginBottom:8, display:'block' }}>{a.subtitle}</em>
                    <p style={{ fontFamily:SANS, fontSize:12, color:C.warmGray, lineHeight:1.65,
                      flex:1, marginBottom:14 }}>{a.excerpt}</p>
                  </div>
                  <div style={{ padding:'10px 18px 12px', borderTop:`1px solid ${C.sand}`,
                    display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <span style={{ fontFamily:SANS, fontSize:11, color:'#999' }}>📖 {a.readTime} min</span>
                    <div style={{ display:'flex', gap:6 }} onClick={e => e.stopPropagation()}>
                      <button onClick={() => toggleSave(a.id)} style={{
                        width:30, height:30, borderRadius:8, border:'none', cursor:'pointer',
                        background:savedArticles.has(a.id) ? '#c97d2e' : C.tealLight,
                        color:savedArticles.has(a.id) ? C.white : C.teal, fontSize:13,
                      }}>🔖</button>
                      <button onClick={() => toggleRead(a.id)} style={{
                        width:30, height:30, borderRadius:8, border:'none', cursor:'pointer',
                        background:readArticles.has(a.id) ? C.teal : C.tealLight,
                        color:readArticles.has(a.id) ? C.white : C.teal, fontSize:13, fontWeight:700,
                      }}>✓</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Article modal */}
      {openArticle && (
        <div onClick={() => setOpenId(null)} style={{
          position:'fixed', inset:0, background:'rgba(20,30,30,0.6)',
          backdropFilter:'blur(4px)', zIndex:300, display:'flex',
          alignItems:'flex-start', justifyContent:'center',
          padding:'24px 16px', overflowY:'auto', opacity:1, transition:'opacity 0.25s',
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background:C.white, borderRadius:18, width:'100%', maxWidth:700,
            overflow:'hidden', margin:'auto',
          }}>
            <div style={{ background:'linear-gradient(135deg,#1a4040,#2a6060)',
              padding:'32px 36px 28px', position:'relative' }}>
              <button onClick={() => setOpenId(null)} style={{
                position:'absolute', top:16, right:16, width:32, height:32,
                background:'rgba(255,255,255,0.15)', border:'none', borderRadius:'50%',
                color:'#fff', fontSize:16, cursor:'pointer',
              }}>✕</button>
              <p style={{ fontFamily:SANS, fontSize:10, fontWeight:600, letterSpacing:'0.18em',
                textTransform:'uppercase', color:C.tealMid, marginBottom:10 }}>
                {pillarIcon(openArticle.pillar)} {openArticle.pillar} pillar
              </p>
              <h2 style={{ fontFamily:SERIF, fontSize:'clamp(1.4rem,3vw,1.9rem)', fontWeight:400,
                color:'#fff', lineHeight:1.2, marginBottom:10 }}>
                {openArticle.title}: {openArticle.subtitle}
              </h2>
              <div style={{ display:'flex', gap:12, alignItems:'center', flexWrap:'wrap' }}>
                <span style={{ fontFamily:SANS, fontSize:12, color:'rgba(255,255,255,0.6)' }}>
                  📖 {openArticle.readTime} min read
                </span>
                {openArticle.recommended && (
                  <span style={{ fontFamily:SANS, fontSize:12, color:'rgba(255,255,255,0.6)' }}>
                    ⭐ Recommended from quiz
                  </span>
                )}
              </div>
            </div>

            <div style={{ padding:'28px 36px' }}>
              {openArticle.recommended && (
                <div style={{ background:'#fffaf4', border:'1.5px solid #e8c88a', borderRadius:10,
                  padding:'14px 18px', marginBottom:22, fontFamily:SANS, fontSize:13,
                  color:'#666', lineHeight:1.5 }}>
                  <strong style={{ color:'#c97d2e', display:'block', marginBottom:4 }}>⭐ Cited in Your Quiz Results</strong>
                  This article was recommended based on your quiz answers.
                </div>
              )}

              {[
                { label:'The Hook', text:openArticle.hook },
                { label:'The Home Symptom', text:openArticle.symptom },
                { label:'Clinical Insight', text:openArticle.clinical },
                { label:'HomeDwell Solution Preview', text:openArticle.solution },
              ].map(s => (
                <div key={s.label} style={{ marginBottom:18 }}>
                  <div style={{ fontFamily:SANS, fontSize:10, fontWeight:600, letterSpacing:'0.18em',
                    textTransform:'uppercase', color:C.teal, marginBottom:8,
                    display:'flex', alignItems:'center', gap:8 }}>
                    {s.label}
                    <div style={{ flex:1, height:1, background:C.sand }}/>
                  </div>
                  <p style={{ fontFamily:SANS, fontSize:14, color:'#555', lineHeight:1.75 }}>{s.text}</p>
                </div>
              ))}

              {/* Notes */}
              <div style={{ marginTop:24, background:C.tealLight, borderRadius:10, padding:16 }}>
                <label style={{ fontFamily:SANS, fontSize:10, fontWeight:600, letterSpacing:'0.12em',
                  textTransform:'uppercase', color:C.teal, display:'block', marginBottom:8 }}>
                  📝 My Notes
                </label>
                <textarea
                  value={notes[openArticle.id] || ''}
                  onChange={e => setNotes(p => ({...p, [openArticle.id]: e.target.value}))}
                  placeholder="Add your personal notes, observations, or action items here…"
                  style={{ width:'100%', minHeight:80, border:`1.5px solid ${C.sand}`,
                    borderRadius:8, padding:'10px 12px', fontFamily:SANS, fontSize:13,
                    color:C.charcoal, resize:'vertical', outline:'none', background:C.white }}
                />
              </div>
            </div>

            <div style={{ padding:'16px 36px 24px', borderTop:`1px solid ${C.sand}`,
              display:'flex', gap:10, flexWrap:'wrap' }}>
              <button onClick={() => toggleRead(openArticle.id)} style={{
                flex:1, padding:'11px 20px', borderRadius:8,
                border:`1.5px solid ${C.teal}`, background:'transparent',
                color:C.teal, fontFamily:SANS, fontSize:13, fontWeight:500, cursor:'pointer',
              }}>
                {readArticles.has(openArticle.id) ? '✓ Mark as Unread' : '✓ Mark as Read'}
              </button>
              <button onClick={() => toggleSave(openArticle.id)} style={{
                padding:'11px 20px', borderRadius:8,
                border:`1px solid ${C.sand}`, background:'transparent',
                color:C.warmGray, fontFamily:SANS, fontSize:13, fontWeight:500, cursor:'pointer',
                whiteSpace:'nowrap',
              }}>
                {savedArticles.has(openArticle.id) ? '🔖 Saved' : '🔖 Save'}
              </button>
              <button onClick={() => { setOpenId(null); navigate('/solutions') }} style={{
                flex:1, padding:'11px 20px', borderRadius:8, border:'none',
                background:C.teal, color:'#fff',
                fontFamily:SANS, fontSize:13, fontWeight:500, cursor:'pointer',
              }}>See Related Solutions</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{ position:'fixed', bottom:32, left:'50%', transform:'translateX(-50%)',
          background:C.charcoal, color:'#fff', fontFamily:SANS, fontSize:13,
          padding:'12px 22px', borderRadius:24, zIndex:400, whiteSpace:'nowrap',
          boxShadow:'0 8px 24px rgba(0,0,0,0.2)' }}>
          {toast}
        </div>
      )}
    </div>
  )
}
