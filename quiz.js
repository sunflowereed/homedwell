import { C } from '../tokens.js'

export const QUIZ_TOPICS = [
  {
    id: 'iaq',
    label: 'Indoor Air Quality',
    icon: '🌿',
    color: C.clay,
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    tagline: 'How the air inside your home affects your lungs, cognition, and long-term health.',
    questions: [
      {
        id: 'iaq1',
        q: 'What type of stove do you cook on?',
        impact: 'High',
        options: [
          { label: 'Gas', score: 25, tags: ['particulate', 'no2'], text: 'Gas combustion releases NO₂, CO, and fine particulates every time you cook. These accumulate rapidly without exterior ventilation.', action: 'An exterior-venting range hood is the single highest-impact upgrade for indoor air quality in a gas-stove home.' },
          { label: 'Electric coil or radiant', score: 65, tags: [], text: 'Electric cooking produces fewer combustion byproducts. Your cooking source isn\'t a primary IAQ risk.', action: 'Focus on exhaust ventilation for moisture and any VOC sources like cleaning products or new furniture.' },
          { label: 'Induction', score: 90, tags: [], text: 'Induction is the cleanest cooking method for indoor air — no combustion at all.', action: 'Your cooking source is not a significant IAQ risk. Prioritise ventilation for other sources.' },
          { label: 'I don\'t know', score: 45, tags: ['particulate'], text: 'Check under the burners — gas has circular grates; electric has flat coils or smooth surface; induction is completely flat and cool to touch.', action: 'Flagged to confirm. Using a conservative estimate in your results for now.' },
        ],
      },
      {
        id: 'iaq2',
        q: 'Does your kitchen range hood vent to the outside?',
        impact: 'High',
        options: [
          { label: 'Yes, vents outside', score: 85, tags: [], text: 'Exterior venting removes combustion gases, moisture, and cooking particulates directly from the home.', action: 'Confirm the fan is powerful enough for your stove type. Gas stoves need at least 400 CFM.' },
          { label: 'It recirculates through a filter', score: 35, tags: ['particulate'], text: 'Recirculating hoods remove some particulates and grease but do nothing for gases like NO₂ or CO.', action: 'Consider replacing with a ducted exterior hood, or adding a window fan above the stove as a workaround.' },
          { label: 'No hood at all', score: 15, tags: ['particulate', 'no2'], text: 'Without ventilation, every cooking session deposits pollutants into your living space.', action: 'Install an exterior-venting range hood rated for your stove type. This is one of the highest-impact IAQ interventions available.' },
          { label: 'I don\'t know', score: 40, tags: ['particulate'], text: 'Turn the hood on and hold a tissue near the vent. If pulled up, it\'s working. Then go outside and listen for air exiting.', action: 'Finding out whether your hood is ducted is worth 10 minutes.' },
        ],
      },
      {
        id: 'iaq3',
        q: 'Have you noticed any musty, chemical, or unusual odours in your home?',
        impact: 'Medium',
        options: [
          { label: 'Frequently — it\'s noticeable', score: 20, tags: ['voc', 'mold'], text: 'Persistent unusual odours are one of the most reliable indicators of an IAQ problem.', action: 'Identify the source before masking it. Musty = moisture issue. Chemical = off-gassing materials. Get an IAQ test if source is unclear.' },
          { label: 'Occasionally after rain or humidity', score: 50, tags: ['mold'], text: 'Rain-triggered odours typically indicate moisture infiltration through the foundation, crawlspace, or building envelope.', action: 'Check your basement and crawlspace after heavy rain. The source is usually within a few feet of where the smell is strongest.' },
          { label: 'Rarely or never', score: 80, tags: [], text: 'Absence of unusual odours is a positive baseline indicator.', action: 'Continue monitoring. Add new furniture or paint gradually and ventilate thoroughly.' },
          { label: 'Only when using cleaning products', score: 60, tags: ['voc'], text: 'Many common cleaning products are significant VOC sources. Conventional sprays and air fresheners can spike indoor VOC levels above outdoor industrial pollution.', action: 'Switch to fragrance-free, low-VOC cleaning products. Open windows when cleaning.' },
        ],
      },
      {
        id: 'iaq4',
        q: 'How often do you open windows for ventilation?',
        impact: 'Medium',
        options: [
          { label: 'Daily when weather allows', score: 85, tags: [], text: 'Regular natural ventilation dilutes accumulated pollutants and brings in fresh air.', action: 'Cross-ventilate when possible — open windows on opposite sides of the home to create airflow.' },
          { label: 'A few times a week', score: 65, tags: [], text: 'Moderate ventilation helps but doesn\'t fully flush accumulated pollutants.', action: 'Try to ventilate daily, even for 10 minutes. Morning ventilation before daytime activity is especially effective.' },
          { label: 'Rarely — allergies, noise, or climate', score: 35, tags: ['co2', 'voc'], text: 'Limited ventilation allows pollutants to accumulate unchecked.', action: 'Consider a heat recovery ventilator (HRV) or energy recovery ventilator (ERV) — they bring in fresh air without allergen exposure.' },
          { label: 'Almost never — sealed home', score: 20, tags: ['co2', 'voc', 'off-gas'], text: 'Tightly sealed homes with no mechanical ventilation have the highest risk of pollutant accumulation.', action: 'Mechanical ventilation is essential. An HRV or ERV is the standard solution for sealed homes.' },
        ],
      },
      {
        id: 'iaq5',
        q: 'Do you have an air purifier or filtration system in your home?',
        impact: 'Medium',
        options: [
          { label: 'Yes — HEPA-rated purifier', score: 85, tags: [], text: 'HEPA filtration captures particles down to 0.3 microns — including most allergens, particulates from cooking, and fine combustion particles.', action: 'Place it in the room where you spend the most time, particularly the bedroom. Replace filters on schedule.' },
          { label: 'Yes — basic/ionic/UV purifier', score: 50, tags: ['voc'], text: 'Non-HEPA purifiers vary widely in effectiveness. Ionic and UV purifiers can generate ozone as a byproduct, which is itself a respiratory irritant.', action: 'Check whether your purifier is certified ozone-free. Consider upgrading to a HEPA-rated unit if budget allows.' },
          { label: 'No — just the HVAC filter', score: 45, tags: ['particulate'], text: 'Standard HVAC filters (MERV 1–7) are designed to protect equipment, not occupants.', action: 'Upgrade to a MERV 11–13 filter in your HVAC system. This is an inexpensive upgrade with meaningful IAQ impact.' },
          { label: 'No filtration at all', score: 25, tags: ['particulate', 'allergen'], text: 'Without filtration, all particulate matter from cooking, dust, and outdoor pollution circulates continuously.', action: 'Start with a MERV 11–13 HVAC filter upgrade. A standalone HEPA purifier in the bedroom is the next step.' },
        ],
      },
    ],
  },
  {
    id: 'sleep',
    label: 'Sleep Environment',
    icon: '🌙',
    color: C.sleep,
    img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    tagline: 'Light, temperature, sound, and air — the four environmental pillars of restorative sleep.',
    questions: [
      {
        id: 'sleep1',
        q: 'How would you describe your bedroom darkness at night?',
        impact: 'High',
        options: [
          { label: 'Completely dark — no light enters', score: 90, tags: [], text: 'Complete darkness supports melatonin production. Even small amounts of light can suppress melatonin and fragment sleep architecture.', action: 'Your bedroom darkness is optimal. Maintain this, especially as streetlighting changes over time.' },
          { label: 'Some ambient light — streetlights or devices', score: 55, tags: ['light-night'], text: 'Ambient light suppresses melatonin even when your eyes are closed. Chronic partial-light exposure affects sleep depth, not just sleep onset.', action: 'Use blackout curtains or a sleep mask. Cover LED indicators on devices.' },
          { label: 'Quite bright — light wakes me sometimes', score: 25, tags: ['light-night', 'light-morning'], text: 'Bright nighttime light signals daytime to your circadian system, reducing both melatonin and sleep quality.', action: 'Blackout curtains are the priority fix. Choose fabric-backed lined curtains rated for full blackout.' },
          { label: 'I sleep with a light on', score: 15, tags: ['light-night'], text: 'Sleeping with a light on is associated with significantly disrupted sleep architecture and reduced REM sleep.', action: 'Transition gradually — use a very dim red-spectrum nightlight if needed. Red light has the least impact on melatonin.' },
        ],
      },
      {
        id: 'sleep2',
        q: 'What is your bedroom temperature at night?',
        impact: 'High',
        options: [
          { label: 'Cool — around 65–68°F (18–20°C)', score: 90, tags: [], text: 'The optimal sleep temperature range. Core body temperature drops naturally in this environment, initiating deep sleep stages.', action: 'You\'re in the optimal range. Maintain this year-round, adjusting bedding rather than room temperature.' },
          { label: 'Comfortable — neither hot nor cold', score: 70, tags: [], text: 'A comfortable temperature suggests you\'re near the optimal range, though individual variation exists.', action: 'Fine-tune by tracking your sleep quality across different temperatures. A cooling mattress pad offers precision control.' },
          { label: 'Often too warm — I kick off covers', score: 30, tags: ['temp'], text: 'Excess warmth prevents the core body temperature drop required to initiate and maintain slow-wave sleep.', action: 'Lower your thermostat to 65–68°F at bedtime. A cooling mattress pad is the most precise intervention.' },
          { label: 'Varies — warm then cold through the night', score: 45, tags: ['temp'], text: 'Temperature fluctuation disrupts sleep continuity even without full waking.', action: 'Use a cooling mattress pad with programmable temperature. Natural fiber bedding (wool, linen) also thermoregulates better than synthetic.' },
        ],
      },
      {
        id: 'sleep3',
        q: 'How would you describe noise in your bedroom at night?',
        impact: 'High',
        options: [
          { label: 'Very quiet — minimal disruption', score: 90, tags: [], text: 'A quiet acoustic environment supports uninterrupted sleep architecture. Your bedroom noise baseline is excellent.', action: 'Maintain this. If circumstances change (new neighbours, construction), introduce a white noise machine proactively.' },
          { label: 'Occasional disruptions — traffic, pets, neighbours', score: 60, tags: ['noise'], text: 'Intermittent noise causes micro-arousals that fragment sleep stages, often without full waking.', action: 'A white noise machine set to a constant low level will mask intermittent sounds more effectively than silence.' },
          { label: 'Consistent background noise', score: 35, tags: ['noise'], text: 'Chronic ambient noise elevates baseline cortisol and reduces time in restorative slow-wave sleep.', action: 'White or pink noise can mask environmental sound. Pink noise has additional evidence for enhancing slow-wave deep sleep stages.' },
          { label: 'Significant disruption — snoring partner or nearby activity', score: 20, tags: ['noise', 'stage'], text: 'Significant noise disruption is one of the most impactful sleep quality factors. Chronic exposure elevates cardiovascular risk markers.', action: 'High-quality ear plugs (NRR 33) or a bedside white noise machine at moderate volume are your two most effective immediate options.' },
        ],
      },
      {
        id: 'sleep4',
        q: 'How do you spend the 2 hours before bed?',
        impact: 'High',
        options: [
          { label: 'Screens — phone, TV, or tablet in bed', score: 25, tags: ['blue-light', 'arousal'], text: 'Screens emit blue-spectrum light that suppresses melatonin up to 2x more than warmer wavelengths, and stimulating content elevates cortisol.', action: 'Remove screens from the bedroom. If unavoidable, enable Night Shift/f.lux and use amber-tinted glasses after 8pm.' },
          { label: 'Reading or low-stimulation activity in dim light', score: 85, tags: [], text: 'Low-stimulation activity in dim, warm light is the optimal pre-sleep environment. This pattern supports natural melatonin rise.', action: 'Your pre-sleep routine is well-calibrated. Ensure your reading light is warm-spectrum (2,200–2,700K).' },
          { label: 'Bright lights and active tasks — cooking, working, exercising', score: 30, tags: ['blue-light', 'arousal'], text: 'Bright light and activating tasks prevent the cortisol drop and melatonin rise that prepare the body for sleep.', action: 'Implement a 90-minute transition zone — dim lights, warm spectrum only, no screens, no cognitively demanding tasks.' },
          { label: 'It varies night to night', score: 50, tags: ['circadian'], text: 'Inconsistent pre-sleep routines confuse circadian timing, making it harder to fall asleep at a consistent time.', action: 'Even a 30-minute consistent wind-down routine significantly improves sleep onset. Anchor it to a consistent bedtime.' },
        ],
      },
      {
        id: 'sleep5',
        q: 'Do you have any plants, electronics, or scents in your bedroom?',
        impact: 'Low',
        options: [
          { label: 'Bedroom is minimal — very few objects', score: 80, tags: [], text: 'A minimal bedroom environment reduces visual stimulation and the cognitive load associated with clutter and unresolved tasks.', action: 'Your bedroom environment is well-optimised for sleep. Consider adding a lavender diffuser at 0.5% concentration for marginal gains.' },
          { label: 'Several electronics — TV, gaming, work setup', score: 25, tags: ['arousal', 'light-night'], text: 'Electronics associate the bedroom with wakefulness, disrupting the Pavlovian sleep-space conditioning your brain relies on.', action: 'Remove the TV and work setup from the bedroom. Reassign the room exclusively to sleep and intimacy.' },
          { label: 'Plants and natural elements', score: 75, tags: [], text: 'Plants contribute marginally to air quality and significantly to the biophilic visual environment that signals safety and calm to the nervous system.', action: 'This is a positive addition. Avoid highly fragrant flowers that can disrupt breathing for sensitive sleepers.' },
          { label: 'I use scented candles or air fresheners', score: 40, tags: ['voc'], text: 'Synthetic fragrances and paraffin candles release VOCs that can irritate airways and disrupt breathing quality during sleep.', action: 'Switch to beeswax or soy candles, use only before bed (not during), and ventilate before sleeping. Essential oil diffusers are a cleaner alternative.' },
        ],
      },
    ],
  },
  {
    id: 'light',
    label: 'Lighting & Wellbeing',
    icon: '☀️',
    color: C.bark,
    img: 'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?w=800&q=80',
    tagline: 'Discover lighting solutions that support your circadian rhythm, mood, and energy.',
    questions: [
      {
        id: 'light1',
        q: 'What does your typical day look like?',
        impact: 'High',
        options: [
          { label: 'Early riser — up before 7am, asleep by 10pm', score: 80, tags: ['circadian'], text: 'Early chronotypes align well with social schedules and natural light cycles. Your light needs centre on maintaining this alignment as seasons change.', action: 'Ensure morning light exposure within 30 minutes of waking. Use warm light exclusively after 7pm to protect your early bedtime.' },
          { label: 'Standard schedule — up 7–8am, asleep by 11pm', score: 75, tags: [], text: 'A standard schedule aligns reasonably with natural light cycles for most latitudes.', action: 'Focus on anchoring morning bright light and avoiding blue light after 9pm to maintain consistent sleep timing.' },
          { label: 'Night owl — up after 9am, often past midnight', score: 50, tags: ['phase-delay', 'circadian'], text: 'Later chronotypes experience social jet lag when forced to align with early schedules — a measurable health stressor.', action: 'Morning bright light therapy (10,000 lux for 20–30 minutes at waking) is the most evidence-backed way to advance your sleep phase.' },
          { label: 'Shift or irregular hours — schedule changes weekly', score: 35, tags: ['circadian', 'phase-delay'], text: 'Rotating schedules are among the most disruptive light environment conditions for circadian health.', action: 'Light therapy targeted to your current shift pattern can partially anchor your circadian rhythm. A sleep specialist consultation is valuable for rotating shifts.' },
        ],
      },
      {
        id: 'light2',
        q: 'Where do you spend most of your daylight hours?',
        impact: 'High',
        options: [
          { label: 'Bright, well-windowed space with good natural light', score: 85, tags: [], text: 'Good natural light during the day is the single most important environmental factor for circadian alignment and daytime alertness.', action: 'Position your primary workspace within 10 feet of a window. South-facing exposure provides the most consistent daylight across seasons.' },
          { label: 'Some windows, but the space isn\'t bright', score: 55, tags: ['low-natural'], text: 'Insufficient natural light during the day fails to suppress melatonin adequately, leading to afternoon fatigue and delayed sleep onset.', action: 'Supplement with a 10,000 lux light therapy lamp positioned at desk level, used for 20–30 minutes in the morning.' },
          { label: 'Primarily artificial light — office, basement, or few windows', score: 25, tags: ['low-natural', 'artificial'], text: 'Spending the daylight hours under artificial light is one of the primary drivers of circadian disruption in modern environments.', action: 'A 10,000 lux daylight lamp at your workstation is essential. Pair with a 10-minute outdoor walk before noon when possible.' },
          { label: 'Varies — mix of indoor and outdoor settings', score: 70, tags: [], text: 'Variable light environments can support circadian health if outdoor time is frequent, particularly in the morning hours.', action: 'Prioritise morning outdoor light exposure. Even 10 minutes of outdoor light before 10am significantly anchors circadian timing.' },
        ],
      },
      {
        id: 'light3',
        q: 'Which do you experience most often?',
        impact: 'Medium',
        options: [
          { label: 'Afternoon energy crashes — low energy between 2–4pm', score: 50, tags: ['low-natural', 'color-temp'], text: 'Afternoon energy dips are partly circadian and partly driven by insufficient bright light during the morning to suppress melatonin fully.', action: 'Bright cool light (5,000–6,500K) in the morning and early afternoon helps maintain alertness. Avoid dim overhead lighting until after 4pm.' },
          { label: 'Low mood in darker months — seasonal dips', score: 40, tags: ['sad', 'low-natural'], text: 'Seasonal mood changes reflect the impact of reduced light availability on serotonin and melatonin balance.', action: 'A 10,000 lux light therapy lamp used for 20–30 minutes each morning is the first-line evidence-backed treatment for seasonal affective symptoms.' },
          { label: 'Trouble falling asleep — mind races at bedtime', score: 45, tags: ['blue-light', 'phase-delay'], text: 'Difficulty falling asleep despite feeling tired often reflects circadian phase delay — your melatonin rise is occurring later than your intended bedtime.', action: 'Strict blue light elimination after 8pm combined with morning bright light therapy is the most effective non-pharmacological intervention.' },
          { label: 'Difficult morning waking — groggy despite enough sleep', score: 45, tags: ['circadian'], text: 'Morning grogginess (sleep inertia) that doesn\'t lift quickly often reflects circadian misalignment — you\'re waking before your internal clock has signalled morning.', action: 'A sunrise simulation alarm clock is specifically designed for this. It advances the cortisol awakening response by 20–45 minutes.' },
        ],
      },
      {
        id: 'light4',
        q: 'How do you spend the 2 hours before bed?',
        impact: 'High',
        options: [
          { label: 'Screens — TV, phone, tablet in a bright room', score: 25, tags: ['blue-light'], text: 'Blue-spectrum light from screens suppresses melatonin production up to 2x more than warmer wavelengths at equivalent brightness.', action: 'Enable Night Shift on all devices. Use amber-tinted glasses after 8pm. Switch overhead lights to 2,200K warm bulbs after 7pm.' },
          { label: 'Reading or relaxing in dim, warm light', score: 85, tags: [], text: 'Dim, warm light in the hours before bed supports the natural melatonin rise that initiates sleep onset.', action: 'Your evening light routine is well-calibrated. Ensure your reading light is warm-spectrum (under 2,700K) and not too bright.' },
          { label: 'Bright overhead lights while doing tasks', score: 35, tags: ['blue-light', 'color-temp'], text: 'Bright overhead lighting in the evening suppresses melatonin and delays sleep onset regardless of screen use.', action: 'Install warm-spectrum dimmable bulbs (2,200–2,700K) in all frequently-used evening spaces. Dim to 30% by 8pm.' },
          { label: 'It varies — no consistent wind-down pattern', score: 50, tags: ['circadian'], text: 'Variable evening light environments create inconsistent circadian signals, making it difficult to fall asleep at a predictable time.', action: 'A consistent light wind-down routine is more important than perfect choices. Pick a dimming time and stick to it.' },
        ],
      },
      {
        id: 'light5',
        q: 'What is your primary goal with lighting changes?',
        impact: 'Low',
        options: [
          { label: 'More consistent energy through the day', score: 70, tags: ['color-temp', 'low-natural'], text: 'Daytime alertness is strongly tied to light quality and intensity during morning hours.', action: 'Prioritise morning bright light and tunable white lighting that shifts from 6,500K in the morning to 2,700K by evening.' },
          { label: 'Fall asleep faster and sleep more deeply', score: 70, tags: ['blue-light', 'phase-delay'], text: 'Sleep onset and depth are the outcomes most directly improved by lighting interventions.', action: 'Evening blue light elimination has the strongest evidence base for sleep onset improvement — ahead of supplements, apps, or other interventions.' },
          { label: 'Improve mood and reduce seasonal dips', score: 65, tags: ['sad', 'low-natural'], text: 'Mood is measurably improved by adequate bright light, particularly morning light exposure.', action: 'A 10,000 lux light therapy lamp used for 20–30 minutes at the same time each morning is the most evidence-backed non-pharmacological mood intervention available.' },
          { label: 'All of the above', score: 75, tags: ['circadian', 'blue-light', 'low-natural'], text: 'A comprehensive lighting strategy addresses all three outcomes simultaneously.', action: 'A full circadian lighting protocol — bright cool in the morning, tunable during the day, warm and dim in the evening — addresses all three goals.' },
        ],
      },
    ],
  },
]
