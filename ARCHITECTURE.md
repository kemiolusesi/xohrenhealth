# Xohren — Architecture Notes

This document explains the key architectural decisions in Xohren and the reasoning behind them. It is written for a technical collaborator or researcher who wants to understand not just what was built but why specific choices were made.

---

## System Overview

Xohren operates across four delivery channels simultaneously: a Next.js web/mobile app, WhatsApp, USSD (`*384#`), and SMS. All channels share the same backend logic and data layer — a patient's record, care code, or consultation history is accessible regardless of which channel they used to create it.

This is the core architectural constraint that shaped every other decision: **channel-agnostic data, channel-specific interfaces.**

---

## Data Layer

**Supabase (PostgreSQL)**

The data layer is built on Supabase for three reasons specific to this context:

1. Row-Level Security (RLS) allows patient-owned records to be enforced at the database level, not just the application level. A patient's record is inaccessible to any doctor, facility, or admin role unless an explicit consultation relationship has been established.

2. Supabase Edge Functions allow business logic to run close to the data without a separate server layer — important for latency in the Nigerian network environment.

3. The free tier allows the MVP to run at ₦0 infrastructure cost until pilot revenue justifies paid infrastructure.

**Core tables:**

```sql
patients          -- identity, language preference, contact channels
consultations     -- session record linking patient ↔ doctor
care_codes        -- issued post-consultation, time-limited discount tokens
care_bundles      -- longitudinal programme enrolment
ai_interactions   -- triage logs (language, input, output, recommended specialty)
health_records    -- portable longitudinal patient record
doctors           -- verified provider profiles and availability
```

**Patient ownership:** Every record in `health_records` and `consultations` carries a `patient_id` foreign key and RLS policies that make the patient the primary owner. Facilities see only records created within their consultation sessions.

---

## AI Triage Layer

**Claude API (Anthropic) — `claude-sonnet-4-6`**

The triage layer takes a patient's symptom description in any of five languages and returns: recommended specialty, urgency level (routine / urgent / emergency), and a plain-language explanation of the recommendation — in the same language the patient used.

**Why not a translation-first approach?**

The alternative — translate Nigerian-language input into English, run it through a clinical model, translate the output back — introduces compounding error at the point of highest stakes. Clinical terms do not translate cleanly. "Iba" in Yorùbá is not simply "fever" — it carries a specific local understanding of malaria presentation that a translation API will flatten. The triage prompt is written natively for each language, with language-specific clinical vocabulary and common local disease presentation patterns built into the system prompt.

**Prompt structure (simplified):**

```
System: You are a clinical triage assistant for Nigerian patients. 
The patient will describe their symptoms in [LANGUAGE]. 
Respond only in [LANGUAGE]. 
Consider common presentations of malaria, typhoid, sickle cell crisis, 
hypertensive emergency, and maternal complications in the Nigerian context.
Return: specialty recommendation, urgency level, plain-language explanation.

User: [patient symptom description]
```

**Logging:** Every AI interaction is logged to `ai_interactions` with language, anonymised input hash, output, and recommended specialty. This log is the foundation for future model evaluation and dataset building.

---

## USSD Layer

**Africa's Talking API**

USSD sessions are stateless and time-limited (typically 180 seconds). The entire consultation booking flow — symptom triage, specialty selection, doctor selection, appointment confirmation — had to be designed as a compressed decision tree that resolves within that constraint.

**Session state management:**

Because USSD provides no persistent session state, Xohren maintains a `ussd_sessions` table in Supabase keyed by phone number and session ID. Each request from Africa's Talking carries the full USSD string input (`*384*1*2#`), which is parsed to reconstruct session position.

```
*384#                          → Language selection
*384*1#    (English)           → Symptom input (free text)
*384*1*1#  (AI triage result)  → Confirm specialty recommendation
*384*1*1*1#                    → Available doctors
*384*1*1*1*2#                  → Confirm booking
```

**The USSD flow produced a better core UX than the app.**

Designing for USSD forced every step to be reduced to its essential information. The constraint of a 182-character display limit and a numbered menu selection meant that every word in the flow had to earn its place. The app UI was subsequently redesigned to match that clarity, not the other way around.

---

## Care Bundle Engine

Care bundles are longitudinal care programmes — not single consultations. The engine manages:

- Enrolment and assigned care team (doctor + nutritionist where applicable)
- Scheduled check-in generation (AI-driven weekly interactions)
- Care Code issuance and redemption tracking
- Escalation logic (AI flags anomalous check-in responses for human review)

**Escalation:** If a patient's weekly diabetes check-in reports blood glucose readings outside a defined threshold, or describes symptoms consistent with a crisis presentation, the system generates an escalation flag and notifies the assigned doctor via the doctor dashboard. This is the feature I am most cautious about — clinical escalation logic carries the highest stakes if it fails, so the current implementation errs toward over-escalation rather than under.

---

## Payments

**Paystack**

Paystack processes consultation fees and subscription payments. The platform takes a 20–30% cut of consultation fees. Paystack's fee is 1.5% per transaction, charged only when money flows. For the pilot phase, payment processing will be manual for USSD bookings — Paystack does not support USSD natively, so an interim solution using mobile money reference codes is in place.

---

## What Is Not Yet Built

Being specific about what is incomplete is more useful than a roadmap that implies everything is nearly done.

- USSD flow: the decision tree is designed and partially implemented. The Africa's Talking integration is live in test mode. Full end-to-end USSD booking is not yet production-ready.
- AI triage: English and Yorùbá prompts are built and tested. Hausa, Igbo, and Pidgin prompts are drafted but not yet evaluated against real patient descriptions.
- Care bundle engine: schema is built. The scheduling and escalation logic is partially implemented for the Diabetes bundle only.
- Doctor dashboard: wireframed, not yet built.
- Payments: Paystack integration is in test mode.

The web app, database schema, auth layer, portable record structure, and AI triage core are the parts that work.

---

## Research and Evaluation Questions

These are the questions I do not yet have the methodological training to answer properly — and the reason I am seeking a research environment:

1. How do we measure whether a USSD-delivered care plan produces meaningfully different health outcomes than a paper-based one in the same population?
2. What does appropriate evaluation of an AI triage system look like in a context where ground-truth diagnostic data is sparse and inconsistently recorded?
3. How do we design a portable health record system that patients in low-literacy contexts can meaningfully own and control — not just technically, but practically?
4. What implementation science frameworks are most applicable to evaluating a platform that operates simultaneously across formal healthcare facilities, informal providers, and direct-to-patient channels?

These questions are not rhetorical. They are the specific gaps in my current practice that formal research training would address.
