import { useState } from 'react'
import { C, SERIF, SANS } from '../tokens.js'

const PROFESSIONAL_LENSES = {
  broker: {
    id: 'broker', label: 'Real Estate Broker', shortLabel: 'Broker', icon: '⌂',
    color: '#2C4A3E', accent: '#C17F3B',
    tagline: 'What to look for and what to filter out',
    intro: 'This client\'s preferences are grounded in residential health research. The profile reflects both their ideal scenario and a realistic alternative. Use this to pre-qualify properties before showing.',
  },
  contractor: {
    id: 'contractor', label: 'Contractor & Handyman', shortLabel: 'Contractor', icon: '⚒',
    color: '#3D2B1F', accent: '#B85C38',
    tagline: 'Scope of work and material specifications',
    intro: 'This profile describes the client\'s residential health priorities in terms of systems, materials, and construction specifications. Use Plan A as the target scope; Plan B as the minimum acceptable.',
  },
  architect: {
    id: 'architect', label: 'Architect, Builder & Designer', shortLabel: 'Architect', icon: '◻',
    color: '#1C2B3A', accent: '#5B8C6A',
    tagline: 'Design intent and performance targets',
    intro: 'This client has assessed their home against evidence-based design principles. The profile communicates design intent across spatial, environmental, and material dimensions. Plan A represents the research-ideal; Plan B is their stated acceptable alternative.',
  },
}

const DOMAINS = [
  {
    key: 'naturalLight',
    quizLabel: 'Natural Light & Circadian Health',
    completedDate: 'Jan 14, 2026',
    plan_a: {
      summary: 'South- and east-facing primary living spaces with window-to-floor-area ratio above 20%. Skylights in kitchen strongly supported for cortisol regulation and mood.',
      details: [
        'Primary bedroom: east-facing for morning light alignment with natural wake cycles',
        'Living/kitchen: south-facing with unobstructed exposure',
        'Window-to-floor ratio: ≥20% in occupied rooms',
        'Skylight or clerestory in kitchen preferred',
        'Minimal north-facing primary spaces',
      ],
      tradeoffNote: null,
    },
    plan_b: {
      summary: 'West-facing main living spaces accepted. Willing to use supplemental lighting solutions to offset reduced morning light.',
      details: [
        'West-facing living spaces acceptable with tunable lighting',
        'Morning light in bedroom still prioritized',
        'Window-to-floor ratio: ≥15% acceptable',
        'Skylight desired but not required',
      ],
      tradeoffNote: 'Research shows west-facing primary rooms are associated with later sleep onset. Supplemental full-spectrum lighting can partially offset this but is not equivalent.',
    },
  },
  {
    key: 'airQuality',
    quizLabel: 'Air Quality & Ventilation',
    completedDate: 'Jan 22, 2026',
    plan_a: {
      summary: 'ERV or HRV mechanical ventilation system, low-VOC materials throughout, operable windows on cross-ventilation axis, and proximity away from arterial roads.',
      details: [
        'Mechanical ventilation: ERV or HRV system',
        'Low-VOC finishes, adhesives, and cabinetry required',
        'Cross-ventilation: operable windows on at least two opposing walls',
        'No major arterial road within 500 ft (particulate matter risk)',
        'Radon mitigation infrastructure preferred in basement/slab',
      ],
      tradeoffNote: null,
    },
    plan_b: {
      summary: 'Standard HVAC with high-efficiency filtration acceptable. Arterial road proximity tolerable with HEPA filtration strategy.',
      details: [
        'High-efficiency HVAC filter (MERV 13+) as alternative to ERV',
        'Low-VOC finishes still prioritized in bedroom',
        'Proximity to arterial road acceptable with filtration plan',
        'Radon testing required pre-purchase',
      ],
      tradeoffNote: 'Standard filtration reduces but does not eliminate outdoor particulate infiltration. Long-term respiratory health outcomes are meaningfully better with ERV systems per EPA residential studies.',
    },
  },
  {
    key: 'acoustics',
    quizLabel: 'Acoustic Comfort & Noise',
    completedDate: 'Feb 3, 2026',
    plan_a: {
      summary: 'STC 50+ wall assemblies between bedroom and common areas. Away from flight paths, rail lines, and high-traffic roads. Soft material layering for reverberation control.',
      details: [
        'Bedroom wall STC rating: 50 or higher',
        'Location: outside identified noise corridors',
        'Double-pane windows minimum; triple-pane near noise sources',
        'No shared walls with mechanical rooms or stairwells adjacent to bedroom',
      ],
      tradeoffNote: null,
    },
    plan_b: {
      summary: 'STC 45 acceptable with white noise strategy. Moderate road noise tolerable in living areas, not bedroom.',
      details: [
        'STC 45 minimum in bedroom',
        'Moderate road noise in living/kitchen areas tolerable',
        'Double-pane windows throughout',
        'White noise or acoustic treatment budget included',
      ],
      tradeoffNote: 'Chronic low-level noise during sleep is associated with elevated cortisol and reduced deep sleep stages. White noise mitigates but does not replicate a quiet acoustic environment.',
    },
  },
  {
    key: 'spatialWellbeing',
    quizLabel: 'Spatial Wellbeing & Layout',
    completedDate: 'Feb 19, 2026',
    plan_a: {
      summary: 'Open kitchen-living connection for social engagement. Dedicated enclosed workspace. Ceiling height ≥9 ft in primary living areas. Access to outdoor space.',
      details: [
        'Kitchen-living visual and spatial connection (open plan)',
        'Dedicated enclosed home office (door, acoustic separation)',
        'Primary living ceiling height: ≥9 ft',
        'Private outdoor access: yard, garden, or substantial balcony',
        'Primary suite separated from secondary bedrooms',
      ],
      tradeoffNote: null,
    },
    plan_b: null,
  },
]

const INCOMPLETE_LABELS = {
  biophilicDesign: 'Biophilic Design & Nature Access',
  thermalComfort: 'Thermal Comfort & Climate Control',
  communityContext: 'Community & Neighborhood Context',
  safetyResilience: 'Safety & Resilience',
}

export default function ProfessionalProfile({ quizScores }) {
  const [activeProf, setActiveProf] = useState('broker')
  const [activePlan, setActivePlan] = useState('a')
  const [shareOpen, setShareOpen] = useState(false)
  const [shareTab, setShareTab] = useState('link')
  const [copied, setCopied] = useState(false)

  const prof = PROFESSIONAL_LENSES[activeProf]
  const completedCount = Object.keys(quizScores).length || 4

  return (
    <div style={{ minHeight:'calc(100vh - 56px)', background:'#F5F0E8', fontFamily:"'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif" }}>

      {/* Header */}
      <div style={{ background:'#F5F0E8', borderBottom:'1px solid #D9D0C0', padding:'16px 32px',
        display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
        <div>
          <h1 style={{ fontSize:28, fontWeight:700, color:'#1a1a1a', margin:0, letterSpacing:'-0.02em' }}>
            Jordan Rivera
          </h1>
          <div style={{ fontFamily:SANS, fontSize:12, color:'#999', marginTop:4 }}>
            HomeDwell member since January 2026
          </div>
          {/* Progress bar */}
          <div style={{ display:'flex', alignItems:'center', gap:10, marginTop:12 }}>
            <div style={{ width:180, height:4, background:'#E0D8CC', borderRadius:2, overflow:'hidden' }}>
              <div style={{ width:`${(completedCount / 8) * 100}%`, height:'100%',
                background:prof.color, borderRadius:2, transition:'width 0.4s' }}/>
            </div>
            <span style={{ fontFamily:SANS, fontSize:12, color:'#888', whiteSpace:'nowrap' }}>
              {completedCount} of 8 quizzes
            </span>
          </div>
        </div>
        <div style={{ background:'#F0EBE0', border:'1px solid #D8D0C0', borderRadius:8,
          padding:'10px 16px', maxWidth:260 }}>
          <div style={{ fontFamily:SANS, fontSize:11, fontWeight:600, color:'#333', marginBottom:4 }}>
            About this profile
          </div>
          <div style={{ fontFamily:SANS, fontSize:11, color:'#888', lineHeight:1.65 }}>
            Built from evidence-based residential design assessments. More detail appears as quizzes are completed.
          </div>
        </div>
      </div>

      <div style={{ maxWidth:900, margin:'0 auto', padding:'28px 24px' }}>

        {/* Professional selector */}
        <div style={{ background:'#FDFAF4', border:'1px solid #E0D8CC', borderRadius:10,
          padding:6, display:'flex', gap:4, marginBottom:28, width:'fit-content', flexWrap:'wrap' }}>
          {Object.values(PROFESSIONAL_LENSES).map(p => (
            <button key={p.id} onClick={() => setActiveProf(p.id)} style={{
              padding:'9px 20px', borderRadius:7, border:'none',
              background: activeProf===p.id ? p.color : 'transparent',
              color: activeProf===p.id ? '#fff' : '#666',
              fontFamily:"'Palatino Linotype',Palatino,Georgia,serif",
              fontSize:14, fontWeight: activeProf===p.id ? 700 : 400,
              cursor:'pointer', transition:'all 0.16s',
              display:'flex', alignItems:'center', gap:7,
            }}>
              <span style={{ fontSize:15 }}>{p.icon}</span>
              {p.shortLabel}
            </button>
          ))}
        </div>

        {/* Context bar */}
        <div style={{ borderLeft:`3px solid ${prof.accent}`, paddingLeft:16, marginBottom:24,
          display:'flex', justifyContent:'space-between', alignItems:'flex-start',
          gap:20, flexWrap:'wrap' }}>
          <div>
            <div style={{ fontSize:17, fontWeight:700, color:prof.color, marginBottom:4 }}>
              {prof.label} Profile
            </div>
            <div style={{ fontFamily:SANS, fontSize:13, color:'#777', fontStyle:'italic',
              maxWidth:500, lineHeight:1.6 }}>{prof.tagline}</div>
          </div>
          <button onClick={() => setShareOpen(true)} style={{
            padding:'10px 22px', borderRadius:8, border:`1.5px solid ${prof.color}`,
            background:prof.color, color:'#fff', fontFamily:SANS,
            fontSize:13, fontWeight:700, cursor:'pointer', whiteSpace:'nowrap',
          }}>Share this Profile →</button>
        </div>

        {/* Intro note */}
        <div style={{ background:'#F0EBE0', border:'1px solid #D8D0C0', borderRadius:8,
          padding:'14px 18px', fontFamily:SANS, fontSize:13, color:'#555',
          lineHeight:1.7, marginBottom:24, fontStyle:'italic' }}>
          {prof.intro}
        </div>

        {/* Plan toggle */}
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:24, flexWrap:'wrap' }}>
          <span style={{ fontFamily:SANS, fontSize:11, color:'#888', fontWeight:600, letterSpacing:'0.06em' }}>
            VIEWING PLAN:
          </span>
          {[['a','Plan A — Research Ideal'],['b','Plan B — My Adjusted Preferences']].map(([k, lbl]) => (
            <button key={k} onClick={() => setActivePlan(k)} style={{
              padding:'6px 16px', borderRadius:20,
              border:`1.5px solid ${activePlan===k ? prof.color : '#D0C8B8'}`,
              background: activePlan===k ? prof.color : 'transparent',
              color: activePlan===k ? '#fff' : '#555',
              fontFamily:SANS, fontSize:13, fontWeight: activePlan===k ? 700 : 400,
              cursor:'pointer', transition:'all 0.15s',
            }}>{lbl}</button>
          ))}
          {activePlan==='b' && (
            <span style={{ fontFamily:SANS, fontSize:12, color:'#C17F3B', fontStyle:'italic',
              borderLeft:'1px solid #D8D0C0', paddingLeft:12 }}>
              Trade-off notes shown where applicable
            </span>
          )}
        </div>

        {/* Completed domain cards */}
        <div style={{ marginBottom:32 }}>
          <div style={{ display:'flex', alignItems:'baseline', gap:12, marginBottom:8 }}>
            <h2 style={{ fontSize:18, fontWeight:700, margin:0, color:'#1a1a1a', letterSpacing:'-0.02em' }}>
              {activeProf==='broker' ? 'Property Search Criteria' : activeProf==='contractor' ? 'Specifications by Priority' : 'Design Performance Brief'}
            </h2>
            <div style={{ flex:1, height:1, background:'#D8D0C0' }}/>
          </div>
          <p style={{ fontFamily:SANS, fontSize:12, color:'#888', margin:'0 0 16px', fontStyle:'italic' }}>
            {activeProf==='broker' ? 'Derived from completed quizzes. Filter listings against these before presenting.' :
             activeProf==='contractor' ? 'Each item reflects a health-informed preference. Plan A is the research-ideal; Plan B is the client\'s accepted compromise.' :
             'Address these as performance targets, not style preferences.'}
          </p>

          {DOMAINS.map(domain => {
            const planData = domain[`plan_${activePlan}`]
            const perspectiveLabel = {
              broker: { a:'Ideal property criteria', b:'Acceptable alternative' },
              contractor: { a:'Target specification', b:'Minimum acceptable' },
              architect: { a:'Design intent (ideal)', b:'Accepted alternative' },
            }[activeProf]

            return (
              <div key={domain.key} style={{ background:'#FDFAF4', border:'1px solid #E0D8CC',
                borderLeft:`3px solid ${planData ? prof.color : '#D0C8B8'}`,
                borderRadius:8, padding:'20px 22px', marginBottom:12 }}>
                <div style={{ display:'flex', justifyContent:'space-between',
                  alignItems:'flex-start', marginBottom:12, flexWrap:'wrap', gap:8 }}>
                  <div>
                    <div style={{ fontFamily:SANS, fontSize:10, fontWeight:700, letterSpacing:'0.1em',
                      textTransform:'uppercase', color:prof.accent, marginBottom:4 }}>
                      {domain.quizLabel}
                    </div>
                    <div style={{ fontFamily:SANS, fontSize:11, color:'#aaa' }}>
                      Completed {domain.completedDate}
                    </div>
                  </div>
                  <div style={{ fontFamily:SANS, fontSize:11, padding:'3px 10px', borderRadius:12,
                    background: activePlan==='a' ? prof.color+'18' : '#F0EBE0',
                    color: activePlan==='a' ? prof.color : '#888', fontWeight:600,
                    border:`1px solid ${activePlan==='a' ? prof.color+'30' : '#E0D8CC'}` }}>
                    {perspectiveLabel[activePlan]}
                  </div>
                </div>

                {planData ? (
                  <>
                    <p style={{ fontSize:14, lineHeight:1.7, color:'#2a2a2a',
                      margin:'0 0 14px', fontStyle:'italic' }}>
                      "{planData.summary}"
                    </p>
                    <ul style={{ margin:0, padding:'0 0 0 18px' }}>
                      {planData.details.map((d, i) => (
                        <li key={i} style={{ fontFamily:SANS, fontSize:13.5, lineHeight:1.65,
                          color:'#444', marginBottom:4 }}>{d}</li>
                      ))}
                    </ul>
                    {activePlan==='b' && planData.tradeoffNote && (
                      <div style={{ marginTop:14, padding:'10px 14px', background:'#FFF8EC',
                        border:'1px solid #E8D8B0', borderRadius:6,
                        fontFamily:SANS, fontSize:12.5, color:'#7A5C2E', lineHeight:1.6 }}>
                        <strong>Trade-off note: </strong>{planData.tradeoffNote}
                      </div>
                    )}
                  </>
                ) : (
                  <div style={{ fontFamily:SANS, fontSize:13.5, color:'#aaa', fontStyle:'italic' }}>
                    Client has not set a Plan B for this area. Plan A applies by default.
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Incomplete */}
        <div style={{ marginBottom:36 }}>
          <div style={{ display:'flex', alignItems:'baseline', gap:12, marginBottom:8 }}>
            <h2 style={{ fontSize:18, fontWeight:700, margin:0, color:'#1a1a1a', letterSpacing:'-0.02em' }}>
              Pending Assessments
            </h2>
            <div style={{ flex:1, height:1, background:'#D8D0C0' }}/>
          </div>
          <p style={{ fontFamily:SANS, fontSize:12, color:'#888', margin:'0 0 16px', fontStyle:'italic' }}>
            These design dimensions have not yet been evaluated. Brief will expand as client completes remaining quizzes.
          </p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
            {Object.entries(INCOMPLETE_LABELS).map(([key, label]) => (
              <div key={key} style={{ padding:'8px 16px', background:'#F0EBE0',
                border:'1px dashed #C8BEA8', borderRadius:20,
                fontFamily:SANS, fontSize:13, color:'#A09080' }}>{label}</div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ borderTop:'1px solid #D8D0C0', paddingTop:20,
          fontFamily:SANS, fontSize:12.5, color:'#A09080', lineHeight:1.7,
          textAlign:'center', fontStyle:'italic' }}>
          This profile is generated from Jordan Rivera's completed HomeDwell assessments and reflects their stated preferences. It will update automatically as additional quizzes are completed or plans are adjusted.
        </div>
      </div>

      {/* Share modal */}
      {shareOpen && (
        <div onClick={() => setShareOpen(false)} style={{
          position:'fixed', inset:0, background:'rgba(20,15,10,0.6)',
          display:'flex', alignItems:'center', justifyContent:'center',
          zIndex:300, padding:24,
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background:'#FDFAF4', borderRadius:14, padding:32, maxWidth:500, width:'100%',
            border:'1px solid #E0D8CC', boxShadow:'0 32px 80px rgba(0,0,0,0.25)',
          }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:22 }}>
              <div style={{ fontFamily:"'Palatino Linotype',Palatino,Georgia,serif",
                fontSize:18, fontWeight:700 }}>
                Share with {prof.shortLabel}
              </div>
              <button onClick={() => setShareOpen(false)} style={{ border:'none', background:'none',
                fontSize:22, cursor:'pointer', color:'#999', lineHeight:1 }}>×</button>
            </div>

            <div style={{ display:'flex', gap:0, marginBottom:22,
              border:'1px solid #E0D8CC', borderRadius:8, overflow:'hidden' }}>
              {[['link','Share Online'],['print','Print / PDF']].map(([t, label]) => (
                <button key={t} onClick={() => setShareTab(t)} style={{
                  flex:1, padding:'10px', border:'none',
                  background: shareTab===t ? prof.color : 'transparent',
                  color: shareTab===t ? '#fff' : '#777',
                  fontFamily:SANS, fontSize:13, fontWeight:600, cursor:'pointer', transition:'all 0.15s',
                }}>{label}</button>
              ))}
            </div>

            {shareTab==='link' ? (
              <>
                <div style={{ fontFamily:SANS, fontSize:13.5, color:'#555', lineHeight:1.65, marginBottom:18 }}>
                  Your professional receives a link to your live profile. As you complete more quizzes or adjust your plans, they see the updated version automatically.
                </div>
                <div style={{ display:'flex', gap:8, marginBottom:18 }}>
                  <input readOnly value="homedwell.app/profile/jr-2026" style={{
                    flex:1, border:'1px solid #D8D0C0', borderRadius:7,
                    padding:'9px 12px', fontFamily:SANS, fontSize:13,
                    background:'#F0EBE0', color:'#555',
                  }}/>
                  <button onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000) }} style={{
                    padding:'9px 18px', borderRadius:7, border:'none',
                    background: copied ? '#2C4A3E' : prof.color,
                    color:'#fff', fontWeight:700, cursor:'pointer',
                    fontFamily:SANS, fontSize:13, transition:'background 0.2s',
                  }}>{copied ? 'Copied!' : 'Copy'}</button>
                </div>
                <div style={{ fontFamily:SANS, fontSize:12, color:'#A09080', lineHeight:1.6 }}>
                  Your professional will need to create a HomeDwell account to view your profile. Only professionals you share with can access it.
                </div>
              </>
            ) : (
              <>
                <div style={{ fontFamily:SANS, fontSize:13.5, color:'#555', lineHeight:1.65, marginBottom:18 }}>
                  Use your browser's print function to save this profile as a PDF or print a physical copy to bring to your meeting.
                </div>
                <button onClick={() => window.print()} style={{
                  width:'100%', padding:'12px', borderRadius:8,
                  border:`1.5px solid ${prof.color}`, background:'transparent',
                  color:prof.color, fontWeight:700, fontSize:14, cursor:'pointer', fontFamily:SANS,
                }}>Open Print Dialog</button>
                <div style={{ fontFamily:SANS, fontSize:12, color:'#A09080', marginTop:12, lineHeight:1.6 }}>
                  The formatted profile for {prof.label} will print with your active plan shown.
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
