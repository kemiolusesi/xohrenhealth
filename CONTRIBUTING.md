# Contributing to Xohren

Xohren is in active pre-seed build. Contributions from developers, clinicians, and researchers working on digital health in low-resource settings are welcome.

---

## Who This Is For

If any of the following describes you, there may be a meaningful way to contribute:

- You build backend systems and are interested in health data architecture
- You work in clinical practice in Nigeria or a similar low-resource context and have thoughts on the care bundle design
- You research mHealth, implementation science, or digital health in LMICs
- You speak Hausa, Igbo, or Nigerian Pidgin fluently and can help evaluate the AI triage prompts in those languages
- You have experience with USSD or SMS-based application development in Nigeria

---

## Current Priority Areas

1. **AI triage prompt evaluation** — Hausa, Igbo, and Pidgin prompts need evaluation against real symptom descriptions by fluent speakers with clinical context
2. **USSD flow testing** — end-to-end testing of the Africa's Talking integration across different handset types
3. **Care bundle clinical review** — the diabetes and maternal bundle structures need clinical review against Nigerian standard of care guidelines
4. **Research methodology** — if you have experience designing evaluations for mHealth interventions in LMICs, I want to talk to you

---

## How to Get Involved

Open an issue describing your background and what you are interested in contributing. I will respond within a week.

For research collaborations or clinical advisory conversations, email directly: **[your email]**

---

## Code Standards

- JavaScript / Node.js — follow existing file and naming conventions
- All patient-related logic must preserve Supabase RLS policies — do not bypass row-level security for convenience
- Document architectural decisions in `ARCHITECTURE.md` rather than inline comments where possible
- No patient data, real or simulated, in any commit

---

*This is a platform built to solve real problems for real people. Contributions that take that seriously are welcome. Contributions that do not are not.*
