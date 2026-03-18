import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { C, SERIF, SANS } from '../tokens.js'
import { SOLUTIONS } from '../data/solutions.js'

const EV_STYLES = {
  research: { bg:'#D5EDCC', border:'#A8D4A0', hedColor:'#1E5020', label:'✓ Research-Backed' },
  promising: { bg:'#F5E8D0', border:'#DFC8A0', hedColor:'#7A4C18', label:'◐ Promising' },
  claims:   { bg:'#EDE8E3', border:'#D4CBC3', hedColor:'#5C4438', label:'⚠ Manufacturer Claims' },
  none:     { bg:'#F0EBE6', border:'#D4C8BC', hedColor:'#7A6050', label:'○ Not Studied' },
  homedwell:{ bg:'#EDE4D8', border:'#D4C5B0', hedColor:'#5C3D2E', label:'homedwell' },
}

const CAT_COLORS = {
  air:     C.teal,
  light:   C.bark,
  water:   C.moss,
  emf:     '#7A6FA0',
  digital: C.charcoal,
}

export default function Solutions({ quizTags }) {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('match')
  const [expandedId, setExpandedId] = useState(null)

  const filters = [
    { id:'all', label:'All Solutions' },
    { id:'air', label:'🌬 Air' },
    { id:'light', label:'☀️ Light' },
    { id:'water', label:'💧 Water' },
    { id:'emf', label:'📡 EMF' },
    { id:'digital', label:'📋 HomeDwell Digital' },
    { id:'backed', label:'✓ Research-Backed Only' },
  ]

  let shown = SOLUTIONS.filter(s => {
    if (filter === 'all') return true
    if (filter === 'backed') return s.ev === 'research'
    return s.cat === filter
  })

  const evRank = { research:0, promising:1, claims:2, none:3, homedwell:4 }
  shown = shown.sort((a, b) => {
    if (sort === 'evidence') return evRank[a.ev] - evRank[b.ev]
    if (sort === 'price-lo') return parseFloat(a.price.replace(/[^0-9]/g,'')) - parseFloat(b.price.replace(/[^0-9]/g,''))
    if (sort === 'price-hi') return parseFloat(b.price.replace(/[^0-9]/g,'')) - parseFloat(a.price.replace(/[^0-9]/g,''))
    // default: match first, then evidence
    const md = (b.match?1:0) - (a.match?1:0)
    return md !== 0 ? md : evRank[a.ev] - evRank[b.ev]
  })

  return (
    <div style={{ minHeight:'calc(100vh - 56px)', background:C.cream }}>

      {/* Hero */}
      <div style={{ background:C.charcoal, padding:'44px 40px 40px', position:'relative', overflow:'hidden',
        backgroundImage:'radial-gradient(ellipse at 70% 50%, rgba(201,122,78,0.10) 0%, transparent 60%)' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ display:'flex', gap:52, alignItems:'flex-start', flexWrap:'wrap', marginBottom:24 }}>
            <div>
              <p style={{ fontFamily:SANS, fontSize:11, fontWeight:600, letterSpacing:'0.14em',
                textTransform:'uppercase', color:C.bark, marginBottom:12 }}>Solutions matched to your results</p>
              <h1 style={{ fontFamily:SERIF, fontSize:'clamp(28px,4.5vw,50px)', fontWeight:300,
                color:C.white, lineHeight:1.1, marginBottom:12 }}>
                Solutions matched<br/>to <em style={{ fontStyle:'italic', color:'#C8A882' }}>your home's</em><br/>health profile.
              </h1>
              <p style={{ fontFamily:SANS, fontSize:14, color:'#B0A090', maxWidth:420, lineHeight:1.7 }}>
                Based on your quiz, we've curated products and resources that address your specific environmental concerns — with honest, sourced evidence ratings on every item.
              </p>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:7, minWidth:190 }}>
              <div style={{ fontFamily:SANS, fontSize:11, fontWeight:500, textTransform:'uppercase',
                letterSpacing:'0.1em', color:'#7A6858', marginBottom:4 }}>Your flagged areas</div>
              {['Indoor Air Quality','Light Environment','Water Quality','EMF Exposure'].map((f, i) => (
                <div key={f} style={{ display:'flex', alignItems:'center', gap:10, padding:'7px 15px',
                  borderRadius:100, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.1)',
                  fontFamily:SANS, fontSize:13, color:C.white }}>
                  <div style={{ width:8, height:8, borderRadius:'50%', flexShrink:0,
                    background: i<2 ? '#D97060' : i<3 ? '#C8864A' : '#6B9F6E' }}/>
                  {f}
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderTop:'1px solid rgba(255,255,255,0.08)', paddingTop:18, maxWidth:740 }}>
            <p style={{ fontFamily:SANS, fontSize:13, color:'#9A8A7A', lineHeight:1.65 }}>
              ⓘ HomeDwell is a <strong style={{ color:'#C8A882', fontWeight:500 }}>resource and education platform</strong>, not a medical provider. Evidence labels reflect the current state of independent research. We say clearly what is proven, what is promising, and what is only a manufacturer claim — on every card.
            </p>
          </div>
        </div>
      </div>

      {/* Evidence key bar */}
      <div style={{ background:C.white, borderBottom:`1px solid ${C.sand}`,
        padding:'11px 40px', display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
        <span style={{ fontFamily:SANS, fontSize:11, fontWeight:500, textTransform:'uppercase',
          letterSpacing:'0.1em', color:C.warmGray, marginRight:6 }}>Evidence Key</span>
        {Object.entries(EV_STYLES).map(([k, v]) => (
          <span key={k} style={{ fontFamily:SANS, fontSize:11, padding:'3px 10px', borderRadius:4,
            background:v.bg, color:v.hedColor, fontWeight:500 }}>{v.label}</span>
        ))}
        <span style={{ fontFamily:SANS, fontSize:11, padding:'3px 10px', borderRadius:4,
          background:C.tealLight, color:C.teal, fontWeight:500 }}>↗ Affiliate link</span>
      </div>

      {/* Toolbar */}
      <div style={{ position:'sticky', top:56, zIndex:150,
        background:'rgba(245,239,230,0.97)', backdropFilter:'blur(10px)',
        borderBottom:`1px solid ${C.sand}`, padding:'0 40px' }}>
        <div style={{ display:'flex', alignItems:'center', minHeight:52, flexWrap:'wrap', gap:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 0', flex:1, flexWrap:'wrap' }}>
            {filters.map(f => (
              <button key={f.id} onClick={() => setFilter(f.id)} style={{
                padding:'5px 15px', borderRadius:100,
                border:`1.5px solid ${filter===f.id ? C.mossDark : C.sand}`,
                background: filter===f.id ? C.mossDark : 'transparent',
                color: filter===f.id ? C.white : C.charcoal,
                fontFamily:SANS, fontSize:12.5, cursor:'pointer', whiteSpace:'nowrap',
                transition:'all 0.18s',
              }}>{f.label}</button>
            ))}
          </div>
          <div style={{ width:1, height:28, background:C.sand, margin:'0 16px' }}/>
          <div style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 0' }}>
            <span style={{ fontFamily:SANS, fontSize:11, textTransform:'uppercase',
              letterSpacing:'0.09em', color:C.warmGray, whiteSpace:'nowrap' }}>Sort</span>
            <select onChange={e => setSort(e.target.value)} value={sort} style={{
              background:'none', border:`1.5px solid ${C.sand}`, color:C.charcoal,
              fontFamily:SANS, fontSize:12.5, padding:'5px 30px 5px 12px',
              borderRadius:100, cursor:'pointer', outline:'none', appearance:'none',
            }}>
              <option value="match">Best Match</option>
              <option value="evidence">Strongest Evidence First</option>
              <option value="price-lo">Price: Low → High</option>
              <option value="price-hi">Price: High → Low</option>
            </select>
          </div>
          <div style={{ width:1, height:28, background:C.sand, margin:'0 16px' }}/>
          <span style={{ fontFamily:SANS, fontSize:12, color:C.warmGray, padding:'8px 0', whiteSpace:'nowrap' }}>
            {shown.length} solution{shown.length!==1?'s':''}
          </span>
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'32px 32px 80px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:20, marginBottom:64 }}>
          {shown.map(s => {
            const evStyle = EV_STYLES[s.ev] || EV_STYLES.none
            const catColor = CAT_COLORS[s.cat] || C.charcoal
            const isExpanded = expandedId === s.id

            return (
              <div key={s.id} style={{ background:C.white, border:`1px solid ${C.sand}`,
                borderRadius:14, overflow:'hidden', display:'flex', flexDirection:'column',
                transition:'box-shadow 0.25s, transform 0.25s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow='0 8px 32px rgba(46,33,24,0.12)'; e.currentTarget.style.transform='translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none' }}
              >
                {/* Accent */}
                <div style={{ height:3, background:`linear-gradient(90deg, ${catColor}, ${catColor}99)` }}/>

                {/* Visual area */}
                <div style={{ height:100, display:'flex', alignItems:'center', justifyContent:'center',
                  background:`linear-gradient(135deg, ${catColor}18, ${catColor}08)`, fontSize:42 }}>
                  {s.cat==='air'?'🌀':s.cat==='light'?'🌅':s.cat==='water'?'🚰':s.cat==='emf'?'📡':'📋'}
                </div>

                <div style={{ padding:'16px 20px 0', flex:1, display:'flex', flexDirection:'column' }}>
                  {/* Badges */}
                  <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:10 }}>
                    <span style={{ fontFamily:SANS, fontSize:11, padding:'3px 9px', borderRadius:4,
                      background:evStyle.bg, color:evStyle.hedColor, fontWeight:500 }}>{evStyle.label}</span>
                    {s.affiliate && <span style={{ fontFamily:SANS, fontSize:11, padding:'3px 9px',
                      borderRadius:4, background:C.tealLight, color:C.teal, fontWeight:500 }}>↗ Affiliate Link</span>}
                    {s.match && <span style={{ fontFamily:SANS, fontSize:11, padding:'3px 9px',
                      borderRadius:4, background:C.sagePale, color:C.moss, fontWeight:500 }}>✦ Matched</span>}
                    {!s.affiliate && s.ev!=='homedwell' && <span style={{ fontFamily:SANS, fontSize:11, padding:'3px 9px',
                      borderRadius:4, background:C.sagePale, color:C.moss, fontWeight:500 }}>✓ No Affiliate</span>}
                  </div>

                  <div style={{ fontFamily:SERIF, fontSize:19, fontWeight:400, color:C.charcoal,
                    lineHeight:1.2, marginBottom:4 }}>{s.title}</div>
                  <div style={{ fontFamily:SANS, fontSize:12, color:C.warmGray, marginBottom:10 }}>{s.brand}</div>
                  <div style={{ fontFamily:SANS, fontSize:13, color:'#5C4E44', lineHeight:1.7,
                    marginBottom:12, flex:1 }}>
                    {s.desc}
                  </div>

                  {/* Evidence box */}
                  <div style={{ borderRadius:8, padding:'12px 14px', marginBottom:10,
                    background:evStyle.bg, border:`1px solid ${evStyle.border}` }}>
                    <div style={{ fontFamily:SANS, fontSize:10.5, fontWeight:600, textTransform:'uppercase',
                      letterSpacing:'0.07em', color:evStyle.hedColor, marginBottom:4 }}>
                      {s.ev==='homedwell' ? 'About this product' : 'What the research shows'}
                    </div>
                    <div style={{ fontFamily:SANS, fontSize:12.5, color:C.charcoal, lineHeight:1.6 }}>
                      {s.evText}
                    </div>
                    {s.evCite && (
                      <div style={{ fontFamily:SANS, fontSize:11, fontStyle:'italic',
                        color:C.warmGray, marginTop:5, lineHeight:1.5 }}>{s.evCite}</div>
                    )}
                  </div>

                  {s.disclaimer && (
                    <div style={{ background:'#FBF5EE', border:'1px dashed #CCBBA8', borderRadius:8,
                      padding:'9px 13px', fontFamily:SANS, fontSize:12, color:'#7A5A46',
                      lineHeight:1.6, marginBottom:10 }}>
                      <strong style={{ color:C.clay }}>Note: </strong>{s.disclaimer}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div style={{ padding:'12px 20px 14px', borderTop:`1px solid ${C.sand}`,
                  display:'flex', alignItems:'center', justifyContent:'space-between', gap:10, marginTop:10 }}>
                  <div>
                    <div style={{ fontFamily:SERIF, fontSize:21, fontWeight:400, color:C.charcoal }}>{s.price}</div>
                    {s.priceSub && <div style={{ fontFamily:SANS, fontSize:11, color:C.warmGray }}>{s.priceSub}</div>}
                  </div>
                  <button style={{ display:'inline-flex', alignItems:'center', gap:6,
                    padding:'9px 18px', borderRadius:100, border:'none',
                    background: s.cat==='air'?C.teal : s.cat==='light'?C.bark : s.cat==='water'?C.moss : s.cat==='digital'?C.charcoal : C.mossDark,
                    color:C.white, fontFamily:SANS, fontSize:13, fontWeight:500, cursor:'pointer' }}>
                    {s.ev==='homedwell' ? 'Get This →' : 'Shop Options ↗'}
                  </button>
                </div>
                {s.affiliate && (
                  <div style={{ padding:'0 20px 12px', fontFamily:SANS, fontSize:11,
                    color:'#8A9EAA', display:'flex', alignItems:'center', gap:5 }}>
                    ↗ Affiliate link — HomeDwell may earn a small commission at no cost to you.
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Transparency block */}
        <div style={{ background:C.white, border:`1px solid ${C.sand}`, borderRadius:14, padding:'34px 40px' }}>
          <h2 style={{ fontFamily:SERIF, fontSize:22, fontWeight:400, marginBottom:16 }}>🌿 Our commitments to you</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:16 }}>
            {[
              { title:'Affiliate transparency', body:'Some links are affiliate links — HomeDwell may earn a small commission if you purchase. This never influences our evidence ratings or curation. Every affiliate product is labeled. Many products are not affiliated.' },
              { title:'Evidence standards', body:'We use four tiers — Research-Backed (peer-reviewed citations on the card), Promising (early or mixed evidence), Manufacturer Claims (no independent validation found), and Not Studied. We include products in lower tiers because you will encounter them, and honest context is more valuable.' },
              { title:'What HomeDwell is not', body:'We are not a medical provider. Nothing here is medical advice. Always consult a qualified health professional for personal medical concerns.' },
            ].map(p => (
              <div key={p.title}>
                <div style={{ fontFamily:SERIF, fontSize:16, fontWeight:600, color:C.charcoal, marginBottom:8 }}>{p.title}</div>
                <div style={{ fontFamily:SANS, fontSize:13, color:'#5C4E44', lineHeight:1.75 }}>{p.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
