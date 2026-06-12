
export const SYSTEM_INSTRUCTION = `
**ROLE DEFINITION**
You are the **MAP Engine** (Multi-role Analytical Prompt), an advanced decision-support system designed to provide transparent, rigorously tested, and synthesized recommendations.

**OPERATIONAL PROTOCOL**
For every user query, you must strictly follow a two-phase process. Do not skip Phase 1.

### PHASE 1: DISCOVERY & CONTEXTUALIZATION
**Before** providing any advice, plan, or critique, you must pause to understand the user's specific context.
1. Analyze the user's initial prompt.
2. Identify missing variables, constraints, or goals necessary for a high-quality answer.
3. **OUTPUT:** Identify 3-5 foundational questions but ask them **ONE BY ONE**.
   - *Constraint:* End your response after asking a single concise question. **DO NOT** list multiple questions at once.
   - *Instruction:* Wait for the user's answer before proceeding to the next question. Do not proceed to Phase 2 until you have asked enough questions to form a complete picture or the user asks to "Analyze now".

### PHASE 2: THE TRIAD ANALYSIS
Once the user answers the foundational questions or requests analysis, you will process the information through three distinct internal expert personas. Display the output of each persona clearly.

**1. 📘 THE PLANNER (Architectural Strategy)**
* **Role:** Optimistic, structural, linear.
* **Task:** Outline a logical, step-by-step solution to achieve the goal. Focus on "How to make it work."
* **Style:** Use numbered lists or timelines.

**2. 🔴 THE CRITIC (Risk Assessment)**
* **Role:** Skeptical, devil’s advocate, security/risk auditor.
* **Task:** Ruthlessly challenge the Planner’s solution. Identify potential points of failure, edge cases, hidden costs, or logical fallacies. Focus on "What could go wrong."
* **Style:** Use bullet points.

**3. 🟢 THE MEDIATOR (Synthesis & Verdict)**
* **Role:** Pragmatic, balanced, executive decision-maker.
* **Task:** Review the Planner's strategy and the Critic's concerns. Synthesize them into a final, trustworthy recommendation, mitigating risks while keeping the goal in sight.
* **Style:** Narrative paragraph followed by a summary "**Final Verdict**".

---

**OUTPUT FORMATTING RULES**
* Use Bold Headers for each section (e.g., **### PHASE 2: THE TRIAD ANALYSIS**).
* Use distinct headers for each persona: **### 📘 THE PLANNER**, **### 🔴 THE CRITIC**, **### 🟢 THE MEDIATOR**.
* Maintain a professional, objective tone.
`;

// Model identifiers. The app is BYOK (bring-your-own-key): the end user supplies
// their own Google Gemini API key, which has a generous free tier, so running this
// app costs the operator nothing. Flash is the default to stay comfortably inside
// the free tier; users can switch to Pro for deeper analysis from the settings panel.
export const APP_MODELS = {
  PRIMARY: 'gemini-2.5-pro',
  LITE: 'gemini-2.5-flash',
};

export const MODEL_OPTIONS = [
  { id: APP_MODELS.LITE, label: 'Flash — fast, free-tier friendly (recommended)' },
  { id: APP_MODELS.PRIMARY, label: 'Pro — deeper reasoning, slower' },
];

export const GEMINI_KEY_URL = 'https://aistudio.google.com/apikey';

/**
 * Free decision templates shown on the start screen. Each one seeds the input
 * with a well-formed decision statement so the Discovery phase starts strong.
 * They also double as the free teaser for a paid "Pro prompt pack" (see
 * MONETIZATION.pro below).
 */
export interface DecisionTemplate {
  icon: string;
  title: string;
  prompt: string;
}

export const DECISION_TEMPLATES: DecisionTemplate[] = [
  {
    icon: 'fa-briefcase',
    title: 'Career change',
    prompt: 'I am considering changing careers into a different field. Help me decide whether to make the switch and how.',
  },
  {
    icon: 'fa-scale-balanced',
    title: 'Job offer vs staying',
    prompt: 'I have received a new job offer. Help me decide between accepting it and staying in my current role.',
  },
  {
    icon: 'fa-laptop-house',
    title: 'Freelance vs full-time',
    prompt: 'Should I leave my full-time job to freelance or consult independently?',
  },
  {
    icon: 'fa-rocket',
    title: 'Start a business',
    prompt: 'I want to launch a small business or side project. Help me decide whether to start, and what the first steps should be.',
  },
  {
    icon: 'fa-tag',
    title: 'Pricing decision',
    prompt: 'How should I price my product or service? Help me choose a pricing model and a starting price.',
  },
  {
    icon: 'fa-user-plus',
    title: 'First hire',
    prompt: 'Should I hire my first employee or contractor now, or wait? Help me decide.',
  },
  {
    icon: 'fa-screwdriver-wrench',
    title: 'Build vs buy',
    prompt: 'Should we build this software capability in-house or buy an existing solution?',
  },
  {
    icon: 'fa-plane-departure',
    title: 'Relocation',
    prompt: 'I am considering relocating to another city or country. Help me weigh whether to move.',
  },
  {
    icon: 'fa-house',
    title: 'Buy vs rent a home',
    prompt: 'Should I buy a home or keep renting in my current situation?',
  },
  {
    icon: 'fa-graduation-cap',
    title: 'Back to school',
    prompt: 'Is going back to school for a degree or certification worth it for me right now?',
  },
  {
    icon: 'fa-chart-line',
    title: 'Savings allocation',
    prompt: 'Help me decide how to allocate my savings between different investment options, given my goals and risk tolerance.',
  },
  {
    icon: 'fa-bullhorn',
    title: 'Marketing channel',
    prompt: 'Which marketing channel should my business focus on first to acquire customers?',
  },
];

/**
 * MONETIZATION CONFIG — zero-cost, zero-infrastructure.
 *
 * This app is a free, static, browser-only tool. It can be monetized without any
 * servers or running costs through "support" / "pro upsell" links that YOU own.
 * To activate, replace the placeholder URLs below with your own accounts. Until
 * then the support UI stays hidden, so nothing fake is ever shown to your users.
 *
 *   support.url  -> a Ko-fi / Buy Me a Coffee / PayPal.me "tip jar" link
 *   pro.url      -> a Gumroad / Ko-fi / Lemon Squeezy product (e.g. a premium
 *                   prompt-pack or "Pro Analyst" template bundle you sell once)
 *
 * Both are 100% free to set up and take a cut only when you actually earn.
 * Nothing is enabled by default — flip `enabled` to true after adding your link.
 */
export const MONETIZATION = {
  support: {
    enabled: false,
    url: 'https://ko-fi.com/YOUR_HANDLE',
    label: 'Support this tool',
  },
  pro: {
    enabled: false,
    url: 'https://YOUR_HANDLE.gumroad.com/l/map-pro-pack',
    label: 'Get the Pro Prompt Pack',
    pitch: 'Unlock 25 expert-tuned decision templates (negotiation, hiring, pricing, investments).',
  },
};
