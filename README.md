[README.md](https://github.com/user-attachments/files/32759003/README.md)
# Xohren Health Technologies

> *Nigeria's digital health infrastructure — built for the 70 million people a smartphone app will never reach.*

[![Status](https://img.shields.io/badge/status-active%20build-brightgreen)]()
[![Stack](https://img.shields.io/badge/stack-Next.js%20%7C%20Supabase%20%7C%20Node.js-blue)]()
[![Stage](https://img.shields.io/badge/stage-pre--seed-orange)]()
[![License](https://img.shields.io/badge/license-MIT-lightgrey)]()

---

## The Problem

Nigeria has **0.4 doctors per 1,000 people**. The average patient waits hours in a queue to be seen for minutes. Rural communities go without a doctor entirely.

When care does arrive, it arrives in English — to patients who speak Hausa, Yorùbá, Igbo, or Pidgin. Most patients have no medical record. Every visit starts from zero.

I built Xohren because I have watched these failures happen in real time. As a Clinical Nutritionist working in hospital networks in Kano, I have seen scientifically sound care plans collapse within 48 hours — not because of clinical failure, but because the systems around them were not designed for the people using them.

| Challenge | Scale |
|---|---|
| Distance | 70M+ Nigerians live more than 5km from the nearest clinic |
| Language | Medical advice in English reaches less than 30% of the population meaningfully |
| Continuity | Most patients have no medical record — every visit starts from zero |
| Maternal risk | Nigeria accounts for 20% of global maternal deaths — most preventable |

---

## The Solution

Xohren is not a telehealth app. It is an **access layer** — connecting patients to verified doctors across every channel that exists in Nigeria, not just smartphones.

```
Patient with no smartphone          Patient with smartphone
         │                                    │
    Dials *384#                        Opens Xohren App
    (USSD — zero data)                 or WhatsApp
         │                                    │
         └──────────────┬─────────────────────┘
                        │
              Xohren Access Layer
                        │
         ┌──────────────┼──────────────┐
         ▼              ▼              ▼
   AI Triage      Verified Doctor   Care Record
  (5 languages)    Network          (portable)
```

### Core Features

**Multi-channel delivery**
The only health platform in Nigeria that works on a feature phone with zero data. Dial `*384#` and book a doctor. No smartphone, no data plan, no barrier.

**Xohren AI — multilingual triage**
Patients describe symptoms in English, Hausa, Yorùbá, Igbo, or Pidgin. AI recommends the right specialist and urgency level. Powered by Claude (Anthropic).

**Care Codes — continuity incentivised**
After every consultation, doctors issue a Care Code. Patients use it to book follow-ups at up to 60% off. Continuity is incentivised structurally, not assumed behaviourally.

**Nigeria's first portable health record**
Every consultation, every AI check-in, every care plan — stored in a single digital record that travels with the patient to any doctor, anywhere.

---

## Care Bundles

Beyond single consultations — structured, ongoing care for conditions that require continuity, not just a one-time visit.

| Bundle | Focus |
|---|---|
| 🤰 Maternal | 10-month prenatal to postpartum care |
| 🩸 Diabetes Care | Weekly AI monitoring + nutritionist |
| ❤️ Hypertension | BP tracking + cardiologist oversight |
| 🧠 Mental Wellness | Anonymous therapy, daily AI check-ins |
| 🔴 Sickle Cell | Crisis monitoring + haematologist |
| 💊 HIV Wellness | Dignified ARV support + nutrition |
| 🫀 Stroke Recovery | Caregiver support + physio coordination |
| 🥗 Child Nutrition | Free AI malnutrition screening tool |
| ✅ General Wellness | Preventive care · annual GP relationship |

The diabetes and nutrition bundle is the one I care most about — and the one built most directly from clinical practice. Weekly AI monitoring, nutritionist coordination, structured follow-up, and caregiver integration. It is designed around what I have watched fail in ward rounds, not around what was technically convenient to build.

---

## Technical Architecture

**Stack**
- **Frontend:** Next.js (App Router)
- **Backend / Database:** Supabase (PostgreSQL)
- **AI Layer:** Claude API (Anthropic) — multilingual triage and symptom assessment
- **USSD / SMS:** Africa's Talking API
- **Auth:** Supabase Auth
- **Payments:** Paystack

**Architecture overview**

```
┌─────────────────────────────────────────────┐
│                 Client Layer                 │
│  Next.js App │ WhatsApp │ USSD (*384#) │ SMS │
└──────────────────────┬──────────────────────┘
                       │
┌──────────────────────▼──────────────────────┐
│               API / Logic Layer              │
│         Node.js │ Supabase Edge Functions    │
│                                             │
│  ┌─────────────┐   ┌──────────────────────┐ │
│  │  Triage AI  │   │   Care Bundle Engine  │ │
│  │  (Claude)   │   │   Scheduling · Codes  │ │
│  └─────────────┘   └──────────────────────┘ │
└──────────────────────┬──────────────────────┘
                       │
┌──────────────────────▼──────────────────────┐
│              Data Layer (Supabase)           │
│  Patient Records │ Consultations │ Care Logs │
│  Doctor Profiles │ Care Codes    │ Audit Log │
└─────────────────────────────────────────────┘
```

**Key design decisions**

*Why USSD and SMS as first-class channels, not afterthoughts?*
Every other telehealth platform in Nigeria requires a smartphone and data. The decision to build USSD as a primary interface — not a fallback — meant rebuilding the session management and state logic from scratch. USSD sessions are stateless and time-limited. The entire consultation booking flow had to be compressed into a decision tree that works within those constraints. That constraint produced a better core flow than the app version did.

*Why five languages at the model level, not through translation APIs?*
Translation APIs convert Nigerian-language input into English before feeding it to a clinical AI. That introduces two layers of error — translation error and clinical interpretation error — at exactly the point where precision matters most. The triage layer is prompted natively in each language, with language-specific clinical vocabulary built into the system prompt.

*Why portable records over facility-based records?*
In Nigeria, patients frequently move between facilities, between states, and between formal and informal providers. A record tied to a facility is a record that follows the facility's incentives, not the patient's continuity. Every design decision in the record layer was made to ensure the patient owns and carries their own data.

---

## Clinical Context

This platform was not designed from a product brief. It was designed from ward rounds.

The specific failures that shaped Xohren's architecture:

- Diabetes patients leaving consultations with dietary plans they could not follow because the plans assumed food access, literacy, and follow-up infrastructure that did not exist
- Maternal patients missing critical postnatal check-ins because there was no system of reminders, and no way to reach them that did not require a smartphone
- Patients with no record of their last consultation arriving at a specialist having to reconstruct their own medical history from memory

Each of these failures has a corresponding feature in Xohren. The care bundle structure, the Care Code follow-up incentive, the portable record, and the USSD channel all exist because I watched their absence cause harm.

---

## Roadmap

- [x] Core architecture and database schema
- [x] Supabase auth and patient record layer
- [x] AI triage — English and Yorùbá
- [ ] USSD flow — full booking and follow-up
- [ ] AI triage — Hausa, Igbo, Pidgin
- [ ] Care bundle engine — Diabetes and Maternal
- [ ] Doctor dashboard and Care Code issuance
- [ ] Paystack payment integration
- [ ] Pilot — 3 partner clinics, Kano

---

## Impact We Are Building Toward

| Metric | Context |
|---|---|
| 150,000 | Nigerian children born with sickle cell every year — most without continuous care |
| 20% | Of global maternal deaths occur in Nigeria — most in the two weeks after birth |
| 11M+ | Nigerians living with diabetes — the majority undiagnosed and unmonitored |
| 70M+ | People reachable by SMS and USSD who have never had a digital health touchpoint |

---

## About the Builder

**Feyikemi Joy Olusesi** — Clinical Nutritionist & Software Developer, Kano, Nigeria.

I hold a Bachelor's degree in Nutrition and have worked as a Clinical Nutritionist in hospital networks in Kano, including the Nigerian Air Force Hospital, across maternal and child nutrition, diabetes, and obesity. I transitioned into software development because the clinical problems I encountered were, at their root, systems problems — and systems problems need systems solutions.

I have four years of professional software development experience, building in JavaScript, Node.js, and SQL. I also previously built **Heritage Health** — a prototype exploring how culturally grounded nutritional knowledge and clinical evidence can be organised through technology.

Xohren is not a pivot. It is the same question I have been trying to answer since my first year in clinical practice, now with better tools.

---

## Contributing

Xohren is in active pre-seed build. If you are a developer, clinician, or researcher working on digital health in low-resource settings and want to contribute or collaborate, see [CONTRIBUTING.md](./CONTRIBUTING.md).

---

*"We are not building another telehealth app. We are building the infrastructure healthcare in Nigeria was never given."*
