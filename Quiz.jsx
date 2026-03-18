import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { C, SERIF, SANS } from '../tokens.js'
import { QUIZ_TOPICS } from '../data/quiz.js'

function TopicIntro({ topic, onStart, onBack, topicIdx }) {
  return (
    <div style={{ minHeight:'calc(100vh - 56px)', background:C.cream, display:'flex',
      alignItems:'center', justifyContent:'center', padding:'40px 24px' }}>
      <div style={{ maxWidth:520, width:'100%', textAlign:'center' }}>
        <div style={{ fontSize:52, marginBottom:18 }}>{topic.icon}</div>
        <p style={{ fontFamily:SANS, fontSize:11, fontWeight:600, letterSpacing:'0.14em',
          textTransform:'uppercase', color:topic.color, marginBottom:10 }}>
          Section {topicIdx + 1} of {QUIZ_TOPICS.length}
        </p>
        <h2 style={{ fontFamily:SERIF, fontSize:'clamp(28px,4vw,42px)', fontWeight:500,
          color:C.charcoal, marginBottom:12, lineHeight:1.15 }}>{topic.label}</h2>
        <p style={{ fontFamily:SANS, fontSize:14, color:C.warmGray, lineHeight:1.75,
          marginBottom:10, maxWidth:400, margin:'0 auto 10px' }}>{topic.tagline}</p>
        <p style={{ fontFamily:SANS, fontSize:12, color:C.warmGray, marginBottom:36 }}>
          {topic.questions.length} questions · personalised score &amp; recommendations
        </p>
        <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
          {topicIdx > 0 && (
            <button onClick={onBack} style={{ padding:'12px 24px', borderRadius:10, border:`1px solid ${C.sand}`,
              background:'transparent', color:C.warmGray, fontFamily:SANS, fontSize:14, cursor:'pointer' }}>
              ← Back
            </button>
          )}
          <button onClick={onStart} style={{ padding:'13px 36px', borderRadius:12, border:'none',
            background:topic.color, color:C.white, fontFamily:SANS, fontSize:14, fontWeight:600, cursor:'pointer',
            boxShadow:`0 6px 20px ${topic.color}44` }}>
            Start this section →
          </button>
        </div>
      </div>
    </div>
  )
}

function QuestionCard({ topic, question, qNum, total, onAnswer, selected }) {
  const progress = (qNum - 1) / total

  return (
    <div style={{ minHeight:'calc(100vh - 56px)', background:C.cream }}>
      {/* Progress bar */}
      <div style={{ height:4, background:C.sand }}>
        <div style={{ width:`${progress * 100}%`, height:'100%', background:topic.color, transition:'width 0.4s ease' }}/>
      </div>
      <div style={{ maxWidth:580, margin:'0 auto', padding:'44px 24px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
          <span style={{ fontFamily:SANS, fontSize:10, fontWeight:600, letterSpacing:'0.14em',
            textTransform:'uppercase', color:topic.color }}>
            {topic.icon} {topic.label}
          </span>
          <span style={{ fontFamily:SANS, fontSize:10, color:C.warmGray }}>
            · Question {qNum} of {total}
          </span>
          {question.impact && (
            <span style={{ marginLeft:'auto', fontFamily:SANS, fontSize:10, fontWeight:600,
              padding:'2px 8px', borderRadius:10,
              background: question.impact==='High' ? C.clay+'18' : C.bark+'18',
              color: question.impact==='High' ? C.clay : C.bark }}>
              {question.impact} Impact
            </span>
          )}
        </div>

        <h2 style={{ fontFamily:SERIF, fontSize:'clamp(22px,3.5vw,34px)', fontWeight:500,
          color:C.charcoal, lineHeight:1.25, marginBottom:32 }}>
          {question.q}
        </h2>

        <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:28 }}>
          {question.options.map((opt, i) => (
            <div key={i} onClick={() => onAnswer(opt)}
              style={{
                border:`1.5px solid ${selected===opt ? topic.color : C.sand}`,
                background: selected===opt ? topic.color+'12' : C.white,
                borderRadius:13, padding:'15px 18px', cursor:'pointer',
                display:'flex', alignItems:'flex-start', gap:14, transition:'all 0.15s',
              }}>
              <div style={{
                width:22, height:22, borderRadius:'50%', flexShrink:0, marginTop:1,
                border:`1.5px solid ${selected===opt ? topic.color : C.bark}`,
                background: selected===opt ? topic.color : 'transparent',
                display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.15s',
              }}>
                {selected===opt && <div style={{ width:9, height:9, borderRadius:'50%', background:C.white }}/>}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:SANS, fontSize:14, fontWeight:500, color:C.charcoal, marginBottom:selected===opt?4:0 }}>
                  {opt.label}
                </div>
                {selected===opt && opt.text && (
                  <div style={{ fontFamily:SANS, fontSize:12, color:C.warmGray, lineHeight:1.65, marginTop:6 }}>
                    {opt.text}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {selected && selected.action && (
          <div style={{ background:topic.color+'10', border:`1px solid ${topic.color}30`,
            borderRadius:10, padding:'14px 16px', marginBottom:20 }}>
            <div style={{ fontFamily:SANS, fontSize:10, fontWeight:700, letterSpacing:'0.1em',
              textTransform:'uppercase', color:topic.color, marginBottom:5 }}>Recommended Action</div>
            <div style={{ fontFamily:SANS, fontSize:13, color:C.charcoal, lineHeight:1.65 }}>{selected.action}</div>
          </div>
        )}
      </div>
    </div>
  )
}

function TopicSummary({ topic, topicScore, topicIdx, allTopics, onNext }) {
  const scoreColor = topicScore >= 70 ? C.moss : topicScore >= 45 ? C.bark : C.clay
  const isLast = topicIdx === allTopics.length - 1

  return (
    <div style={{ minHeight:'calc(100vh - 56px)', background:C.cream, display:'flex',
      alignItems:'center', justifyContent:'center', padding:'40px 24px' }}>
      <div style={{ maxWidth:540, width:'100%' }}>
        <div style={{ background:C.white, border:`1px solid ${C.sand}`, borderRadius:20,
          padding:'36px 32px', marginBottom:16 }}>
          <div style={{ fontFamily:SANS, fontSize:10, fontWeight:600, letterSpacing:'0.14em',
            textTransform:'uppercase', color:topic.color, marginBottom:10 }}>
            {topic.icon} {topic.label} — Complete
          </div>
          <div style={{ display:'flex', alignItems:'baseline', gap:8, marginBottom:20 }}>
            <span style={{ fontFamily:SERIF, fontSize:72, fontWeight:600, color:scoreColor, lineHeight:1 }}>
              {topicScore}
            </span>
            <span style={{ fontFamily:SANS, fontSize:22, color:C.warmGray }}>/100</span>
          </div>
          <div style={{ height:8, background:C.sand, borderRadius:4, overflow:'hidden', marginBottom:16 }}>
            <div style={{ width:`${topicScore}%`, height:'100%', background:scoreColor, borderRadius:4, transition:'width 0.8s ease' }}/>
          </div>
          <p style={{ fontFamily:SANS, fontSize:14, color:C.warmGray, lineHeight:1.7 }}>
            {topicScore >= 70
              ? `Your ${topic.label.toLowerCase()} environment is performing well. A few targeted improvements will take you further.`
              : topicScore >= 45
              ? `There are meaningful opportunities in your ${topic.label.toLowerCase()} environment. The recommended actions below will have measurable impact.`
              : `Your ${topic.label.toLowerCase()} environment needs attention. The recommended changes in this area will significantly improve your home health score.`}
          </p>
        </div>

        {/* Other topics progress */}
        <div style={{ display:'flex', gap:8, marginBottom:20, flexWrap:'wrap' }}>
          {allTopics.map((t, i) => (
            <div key={t.id} style={{ flex:1, minWidth:100, padding:'10px 12px',
              background: i < topicIdx ? C.sagePale : i === topicIdx ? C.white : C.parchment,
              border:`1px solid ${i===topicIdx?t.color:C.sand}`, borderRadius:10,
              opacity: i > topicIdx ? 0.5 : 1 }}>
              <div style={{ fontFamily:SANS, fontSize:11, color:C.warmGray }}>{t.icon} {t.label}</div>
              {i <= topicIdx && (
                <div style={{ fontFamily:SERIF, fontSize:18, fontWeight:600,
                  color: i < topicIdx ? C.moss : scoreColor }}>
                  {i === topicIdx ? topicScore : '—'}/100
                </div>
              )}
            </div>
          ))}
        </div>

        <button onClick={onNext} style={{
          width:'100%', padding:'15px', borderRadius:12, border:'none',
          background:`linear-gradient(135deg, ${C.mossDark}, ${C.clay})`,
          color:C.white, fontFamily:SANS, fontSize:15, fontWeight:600, cursor:'pointer',
          boxShadow:`0 6px 20px rgba(61,74,53,0.3)`,
        }}>
          {isLast ? 'See Full Results →' : `Continue to ${allTopics[topicIdx + 1].label} →`}
        </button>
      </div>
    </div>
  )
}

function FinalSummary({ allScores, allAnswers, onComplete }) {
  const navigate = useNavigate()
  const overall = Math.round(Object.values(allScores).reduce((s, v) => s + v, 0) / Object.values(allScores).length)
  const scoreColor = overall >= 70 ? C.moss : overall >= 45 ? C.bark : C.clay

  function handleComplete() {
    onComplete(allScores, allAnswers)
    navigate('/dashboard')
  }

  return (
    <div style={{ minHeight:'calc(100vh - 56px)', background:C.cream, padding:'52px 24px' }}>
      <div style={{ maxWidth:620, margin:'0 auto' }}>
        <p style={{ fontFamily:SANS, fontSize:11, fontWeight:600, letterSpacing:'0.16em',
          textTransform:'uppercase', color:C.clay, marginBottom:14 }}>Assessment Complete</p>
        <h1 style={{ fontFamily:SERIF, fontSize:'clamp(32px,5vw,52px)', fontWeight:500,
          color:C.charcoal, lineHeight:1.12, marginBottom:8 }}>Your Home Environment Profile</h1>
        <p style={{ fontFamily:SANS, fontSize:14, color:C.warmGray, lineHeight:1.7, marginBottom:36 }}>
          Overall home health score: <strong style={{ color:C.mossDark, fontSize:16 }}>{overall}/100</strong>
        </p>

        <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:36 }}>
          {QUIZ_TOPICS.map(t => {
            const sc = allScores[t.id] || 0
            const col = sc>=70?C.moss:sc>=45?C.bark:C.clay
            return (
              <div key={t.id} style={{ background:C.white, border:`1px solid ${C.sand}`,
                borderLeft:`4px solid ${t.color}`, borderRadius:14, padding:'20px 22px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
                  <span style={{ fontFamily:SANS, fontSize:14, fontWeight:500, color:C.charcoal }}>
                    {t.icon} {t.label}
                  </span>
                  <span style={{ fontFamily:SERIF, fontSize:28, fontWeight:600, color:col }}>{sc}</span>
                </div>
                <div style={{ height:6, background:C.sand, borderRadius:3, overflow:'hidden' }}>
                  <div style={{ width:`${sc}%`, height:'100%', background:col, borderRadius:3, transition:'width 0.8s ease' }}/>
                </div>
              </div>
            )
          })}
        </div>

        <button onClick={handleComplete} style={{
          width:'100%', padding:'16px', borderRadius:14, border:'none',
          background:`linear-gradient(135deg, ${C.mossDark}, ${C.clay})`,
          color:C.white, fontFamily:SANS, fontSize:16, fontWeight:600, cursor:'pointer',
          boxShadow:`0 8px 28px rgba(61,74,53,0.3)`, marginBottom:12,
        }}>View My Dashboard →</button>
        <button onClick={() => navigate('/solutions')} style={{
          width:'100%', padding:'13px', borderRadius:12, border:`1px solid ${C.sand}`,
          background:'transparent', color:C.warmGray, fontFamily:SANS, fontSize:14, cursor:'pointer',
        }}>See Recommended Solutions →</button>
      </div>
    </div>
  )
}

export default function Quiz({ onComplete }) {
  const [phase, setPhase] = useState('intro') // intro | topicIntro | questions | topicDone | final
  const [topicIdx, setTopicIdx] = useState(0)
  const [qIdx, setQIdx] = useState(0)
  const [answers, setAnswers] = useState({}) // key: `topicId_qIdx` → option object
  const [topicScores, setTopicScores] = useState({})
  const navigate = useNavigate()

  const topic = QUIZ_TOPICS[topicIdx]
  const question = topic?.questions[qIdx]
  const ansKey = `${topic?.id}_${qIdx}`
  const selected = answers[ansKey]

  function pick(opt) {
    setAnswers(p => ({ ...p, [ansKey]: opt }))
  }

  function handleNext() {
    if (!selected) return
    if (qIdx < topic.questions.length - 1) {
      setQIdx(i => i + 1)
    } else {
      // Compute average score for this topic
      const topicAnswers = topic.questions.map((_, i) => answers[`${topic.id}_${i}`] || selected)
      const avg = Math.round(topicAnswers.reduce((s, a) => s + (a?.score || 50), 0) / topicAnswers.length)
      setTopicScores(p => ({ ...p, [topic.id]: avg }))
      setPhase('topicDone')
    }
  }

  function handleNextTopic() {
    if (topicIdx < QUIZ_TOPICS.length - 1) {
      setTopicIdx(i => i + 1)
      setQIdx(0)
      setPhase('topicIntro')
    } else {
      setPhase('final')
    }
  }

  function getAllTags() {
    return [...new Set(Object.values(answers).flatMap(a => a?.tags || []))]
  }

  if (phase === 'intro') return (
    <div style={{ minHeight:'calc(100vh - 56px)', background:C.cream, display:'flex',
      alignItems:'center', justifyContent:'center', padding:'40px 24px' }}>
      <div style={{ maxWidth:560, width:'100%' }}>
        <p style={{ fontFamily:SANS, fontSize:11, fontWeight:600, letterSpacing:'0.16em',
          textTransform:'uppercase', color:C.clay, marginBottom:16 }}>Home Health Assessment</p>
        <h1 style={{ fontFamily:SERIF, fontSize:'clamp(32px,5vw,50px)', fontWeight:500,
          color:C.charcoal, lineHeight:1.12, marginBottom:16 }}>How does your home affect you?</h1>
        <p style={{ fontFamily:SANS, fontSize:14, color:C.warmGray, lineHeight:1.75, marginBottom:32 }}>
          {QUIZ_TOPICS.reduce((s, t) => s + t.questions.length, 0)} questions across {QUIZ_TOPICS.length} dimensions.
          Each answer generates a personalised score and specific recommendations for your home.
        </p>
        <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:36 }}>
          {QUIZ_TOPICS.map(t => (
            <div key={t.id} style={{ display:'flex', alignItems:'center', gap:14,
              padding:'14px 18px', borderRadius:14, background:C.white, border:`1px solid ${C.sand}` }}>
              <div style={{ width:44, height:44, borderRadius:10, overflow:'hidden', flexShrink:0,
                background:C.sagePale, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22 }}>
                {t.icon}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:SANS, fontSize:14, fontWeight:500, color:C.charcoal }}>{t.label}</div>
                <div style={{ fontFamily:SANS, fontSize:11, color:C.warmGray, marginTop:2 }}>
                  {t.questions.length} questions · personalised result
                </div>
              </div>
              <span style={{ fontSize:11, color:t.color, fontWeight:600,
                background:t.color+'18', borderRadius:8, padding:'3px 9px' }}>Ready</span>
            </div>
          ))}
        </div>
        <button onClick={() => setPhase('topicIntro')} style={{
          width:'100%', padding:'16px', borderRadius:14, border:'none',
          background:`linear-gradient(135deg, ${C.mossDark}, ${C.clay})`,
          color:C.white, fontFamily:SANS, fontSize:15, fontWeight:600, cursor:'pointer',
          boxShadow:`0 6px 24px rgba(61,74,53,0.3)`,
        }}>Begin Assessment →</button>
        <p style={{ fontFamily:SANS, fontSize:11, color:C.warmGray, textAlign:'center', marginTop:10 }}>
          No sign-up required · takes ~8 minutes
        </p>
      </div>
    </div>
  )

  if (phase === 'topicIntro') return (
    <TopicIntro
      topic={topic}
      topicIdx={topicIdx}
      onStart={() => setPhase('questions')}
      onBack={() => {
        if (topicIdx > 0) { setTopicIdx(i => i - 1); setPhase('topicIntro') }
        else setPhase('intro')
      }}
    />
  )

  if (phase === 'questions') return (
    <div>
      <QuestionCard
        topic={topic}
        question={question}
        qNum={qIdx + 1}
        total={topic.questions.length}
        onAnswer={pick}
        selected={selected}
      />
      {/* Sticky next button */}
      {selected && (
        <div style={{ position:'sticky', bottom:0, background:C.white,
          borderTop:`1px solid ${C.sand}`, padding:'12px 24px 16px' }}>
          <div style={{ maxWidth:580, margin:'0 auto', display:'flex', gap:10 }}>
            <button onClick={() => {
              if (qIdx > 0) setQIdx(i => i - 1)
              else setPhase('topicIntro')
            }} style={{ padding:'12px 20px', borderRadius:10, border:`1px solid ${C.sand}`,
              background:'transparent', color:C.warmGray, fontFamily:SANS, fontSize:13, cursor:'pointer' }}>
              ← Back
            </button>
            <button onClick={handleNext} style={{
              flex:1, padding:'13px', borderRadius:10, border:'none',
              background:topic.color, color:C.white,
              fontFamily:SANS, fontSize:14, fontWeight:600, cursor:'pointer',
              boxShadow:`0 4px 16px ${topic.color}44`,
            }}>
              {qIdx < topic.questions.length - 1 ? 'Next Question →' : 'See Section Summary →'}
            </button>
          </div>
        </div>
      )}
    </div>
  )

  if (phase === 'topicDone') return (
    <TopicSummary
      topic={topic}
      topicScore={topicScores[topic.id] || 0}
      topicIdx={topicIdx}
      allTopics={QUIZ_TOPICS}
      onNext={handleNextTopic}
    />
  )

  if (phase === 'final') return (
    <FinalSummary
      allScores={topicScores}
      allAnswers={getAllTags()}
      onComplete={(scores, tags) => onComplete(scores, tags)}
    />
  )
}
