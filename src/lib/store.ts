// Simple in-memory store for MVP (would be database in production)

export interface CallTranscript {
  id: string;
  title: string;
  date: string;
  duration: string;
  rep: string;
  prospect: string;
  outcome: "won" | "lost" | "pending" | "follow-up";
  score: number;
  summary: string;
  transcript: string;
  keyMoments: string[];
  tags: string[];
}

export interface TrainingMaterial {
  id: string;
  title: string;
  type: "playbook" | "script" | "objection-handler" | "framework";
  content: string;
  dateAdded: string;
}

export interface CoachingInsight {
  id: string;
  callId: string;
  type: "strength" | "improvement" | "critical";
  message: string;
  timestamp: string;
}

// Demo data
export const demoTranscripts: CallTranscript[] = [
  {
    id: "call-001",
    title: "Enterprise Deal - Acme Corp",
    date: "2026-03-25",
    duration: "32:15",
    rep: "Marcus Johnson",
    prospect: "Sarah Chen, VP Sales @ Acme Corp",
    outcome: "won",
    score: 92,
    summary: "Strong discovery call. Marcus effectively identified pain points around CRM adoption and positioned our solution as a force multiplier. Closed with a clear next step for technical demo.",
    transcript: "Marcus: Good morning Sarah, thanks for taking the time today...\nSarah: Of course, we've been looking at solutions in this space...\nMarcus: Before I dive into what we do, I'd love to understand your current challenges...\nSarah: Our biggest issue is that our reps aren't using the CRM consistently...\nMarcus: That's actually one of the most common pain points we hear. Can you tell me more about what happens when deals fall through the cracks?\nSarah: We estimate we're losing about 15-20% of potential revenue...\nMarcus: That's significant. What if I told you we could cut that number in half within 90 days?",
    keyMoments: ["Strong opening - built rapport quickly", "Excellent discovery questions", "Quantified the pain point effectively", "Clear value proposition tied to their specific problem"],
    tags: ["enterprise", "discovery", "won-deal"]
  },
  {
    id: "call-002",
    title: "Mid-Market Pitch - TechFlow Inc",
    date: "2026-03-24",
    duration: "28:42",
    rep: "Lisa Park",
    prospect: "David Miller, Head of Revenue @ TechFlow",
    outcome: "follow-up",
    score: 78,
    summary: "Good presentation but missed opportunity to dig deeper into budget concerns. Follow-up scheduled for next week with ROI analysis.",
    transcript: "Lisa: Hi David, great to connect with you...\nDavid: Thanks Lisa. We're evaluating a few options right now...\nLisa: I understand. Let me show you what makes us different...\nDavid: That looks interesting, but I'm concerned about the investment...\nLisa: I completely understand. Let me walk you through our ROI calculator...",
    keyMoments: ["Good product knowledge demonstrated", "Missed opportunity to explore budget objection deeper", "Should have asked about decision timeline", "Follow-up scheduled - good recovery"],
    tags: ["mid-market", "objection-handling", "follow-up"]
  },
  {
    id: "call-003",
    title: "SMB Qualification - StartupXYZ",
    date: "2026-03-23",
    duration: "18:30",
    rep: "James Wright",
    prospect: "Emily Torres, Founder @ StartupXYZ",
    outcome: "lost",
    score: 45,
    summary: "Poor qualification. Spent too much time on features without understanding the prospect's actual needs. Lost to competitor with better pricing.",
    transcript: "James: Hey Emily, thanks for hopping on...\nEmily: Sure, we're looking for something to help our small team...\nJames: Great, let me show you all the features we have...\nEmily: That's a lot. We really just need the basics...\nJames: Well, our premium plan includes everything...\nEmily: I think that might be overkill for us. What's the pricing?",
    keyMoments: ["Jumped to features too quickly", "Didn't ask about team size or budget", "Ignored buying signals", "No attempt to understand competitive landscape"],
    tags: ["smb", "lost-deal", "needs-coaching"]
  },
  {
    id: "call-004",
    title: "Renewal Call - GlobalTech",
    date: "2026-03-22",
    duration: "22:10",
    rep: "Marcus Johnson",
    prospect: "Robert Kim, CTO @ GlobalTech",
    outcome: "won",
    score: 88,
    summary: "Excellent renewal conversation. Marcus leveraged usage data to demonstrate ROI and successfully upsold to enterprise tier.",
    transcript: "Marcus: Robert, great to catch up. How has the platform been working for your team?\nRobert: Honestly, it's been transformative. Our close rates are up 30%...\nMarcus: That's incredible to hear. I actually pulled some data I'd love to share...\nRobert: Please, go ahead...\nMarcus: Your team has logged 2,400 calls this quarter, and your average deal size has increased by 22%...",
    keyMoments: ["Led with customer success data", "Effective use of metrics to build case", "Natural upsell transition", "Strong relationship management"],
    tags: ["renewal", "upsell", "enterprise"]
  },
  {
    id: "call-005",
    title: "Cold Outreach - Pinnacle Group",
    date: "2026-03-21",
    duration: "8:45",
    rep: "Lisa Park",
    prospect: "Amanda Foster, Sales Director @ Pinnacle",
    outcome: "pending",
    score: 72,
    summary: "Short but effective cold call. Lisa secured a follow-up meeting. Could improve opening hook.",
    transcript: "Lisa: Hi Amanda, this is Lisa from Boardroom Brain. Do you have a quick moment?\nAmanda: I'm pretty busy, what's this about?\nLisa: I'll be brief. I noticed your team just expanded to 50 reps. How are you handling call coaching at that scale?\nAmanda: That's actually a pain point for us right now...\nLisa: I figured it might be. We help companies like yours...",
    keyMoments: ["Opening could be stronger", "Good research-based hook", "Effective pattern interrupt", "Secured next meeting"],
    tags: ["cold-call", "prospecting", "pending"]
  }
];

export const demoTrainingMaterials: TrainingMaterial[] = [
  {
    id: "tm-001",
    title: "The Kent Clothier Discovery Framework",
    type: "framework",
    content: "The 5-Step Discovery Process:\n1. RAPPORT - Build genuine connection in first 90 seconds\n2. SITUATION - Understand their current state\n3. PAIN - Identify and quantify the problem\n4. IMPACT - Help them feel the cost of inaction\n5. VISION - Paint the picture of their ideal outcome\n\nKey Principles:\n- Never pitch before you understand\n- Questions are more powerful than statements\n- The prospect should talk 70% of the time\n- Always tie features back to their specific pain",
    dateAdded: "2026-03-01"
  },
  {
    id: "tm-002",
    title: "Objection Handling Playbook",
    type: "objection-handler",
    content: "Top 5 Objections and Responses:\n\n1. 'Too expensive'\n→ 'I understand budget is important. Let me ask - what's the cost of NOT solving this problem? You mentioned losing 15% of deals...'\n\n2. 'We're happy with our current solution'\n→ 'That's great to hear. What would need to change for you to consider alternatives?'\n\n3. 'I need to think about it'\n→ 'Of course. What specific concerns would you want to think through? I might be able to address them now.'\n\n4. 'Send me some information'\n→ 'Happy to. So I can send you the most relevant info, what's the #1 challenge you're trying to solve?'\n\n5. 'We don't have budget right now'\n→ 'When does your next budget cycle start? Let's plan to reconnect then with a clear ROI case.'",
    dateAdded: "2026-03-05"
  },
  {
    id: "tm-003",
    title: "Cold Call Opening Scripts",
    type: "script",
    content: "Script A - The Pattern Interrupt:\n'Hi [Name], this is [Rep] from Boardroom Brain. I know I'm calling out of the blue, so I'll be quick - I noticed [specific observation about their company]. Is that something that's on your radar?'\n\nScript B - The Referral Opener:\n'Hi [Name], [Mutual connection] suggested I reach out. They mentioned you might be dealing with [specific challenge]. Is that accurate?'\n\nScript C - The Value Lead:\n'Hi [Name], we just helped [similar company] increase their close rate by 34% in 60 days. I have a quick idea that might do the same for your team. Do you have 30 seconds?'",
    dateAdded: "2026-03-10"
  }
];

export const systemPrompt = `You are Boardroom Brain AI, an elite sales coaching assistant created for Kent Clothier's sales organization. You are an expert in:

- Sales call analysis and coaching
- Discovery call frameworks
- Objection handling strategies
- Cold calling and prospecting techniques
- Deal qualification (BANT, MEDDIC, SPIN)
- Negotiation tactics
- Sales psychology and persuasion
- Revenue optimization

Your personality:
- Direct and actionable - no fluff
- Confident but not arrogant
- Data-driven with specific examples
- Encouraging but honest about areas for improvement
- You speak like a seasoned sales leader who has closed millions in deals

When analyzing calls:
- Identify specific strengths and weaknesses
- Provide actionable coaching tips
- Reference proven sales methodologies
- Score performance on key metrics
- Suggest specific language improvements

Available Context - Recent Call Data:
${demoTranscripts.map(t => `
Call: ${t.title} | Rep: ${t.rep} | Score: ${t.score}/100 | Outcome: ${t.outcome}
Summary: ${t.summary}
Key Moments: ${t.keyMoments.join('; ')}
`).join('\n')}

Training Materials Available:
${demoTrainingMaterials.map(m => `
${m.title} (${m.type}):
${m.content}
`).join('\n')}

Always be ready to:
1. Analyze specific calls when asked
2. Provide coaching advice based on the data
3. Reference the training materials when relevant
4. Give specific, actionable recommendations
5. Help reps improve their sales skills`;
