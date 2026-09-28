export type CarePlan = {
  slug: string;
  name: string;
  tagline: string;
  heroDescription: string;
  condition: string;
  color: string;
  icon: string;
  team: string[];
  pricingTiers: { label: string; duration: string; price: string; discount: string; popular: boolean }[];
  features: string[];
  howItWorks: { step: number; title: string; description: string }[];
  benefits: { title: string; description: string }[];
  whoIsThisFor: string;
  emergencyNote: string | null;
  durationNote?: string;
};

const careFlow = (first: string, second: string, third: string, fourth: string, fifth: string) => [
  { step: 1, title: first, description: "Share your health history, current needs, and goals. Your care team reviews your information and prepares your personalised starting point." },
  { step: 2, title: second, description: "Meet the specialist leading your care. Together, you will set clear goals and agree on a care plan that works in your daily life." },
  { step: 3, title: third, description: "Regular check-ins begin through the app, SMS, or WhatsApp. Your care team sees the full picture, not just a single appointment." },
  { step: 4, title: fourth, description: "Get practical guidance built around Nigerian life, your budget, and your routines, with support whenever your plan needs to change." },
  { step: 5, title: fifth, description: "Your lead clinician reviews progress, answers questions, and adjusts care so you can keep moving forward with confidence." },
];

export const carePlans: CarePlan[] = [
  {
    slug: "maternal-bundle", name: "Maternal Care Bundle", icon: "Baby", color: "gold", condition: "Pregnancy & Postpartum Care",
    tagline: "With you from the first heartbeat to the first step.",
    heroDescription: "The Xohren Maternal Bundle covers your complete 10-month journey: months 1 to 9 for prenatal care across every trimester, then month 10 for your first month of postpartum monitoring. After month 10, your nutritionist offers continued postpartum support and your baby begins a separate paediatrics relationship.",
    team: ["OB/GYN Specialist", "Certified Nutritionist", "Maternal Nurse", "Paediatrician (from week 36)"],
    pricingTiers: [
      { label: "Standard", duration: "10 months", price: "N45,000", discount: "", popular: false },
      { label: "Plus", duration: "10 months", price: "N65,000", discount: "Includes home nurse visit (2x)", popular: true },
      { label: "Premium", duration: "10 months", price: "N90,000", discount: "Includes lab tests + home visits (4x)", popular: false },
    ],
    features: ["Assigned OB/GYN for full pregnancy duration", "Weekly AI check-ins by SMS or app", "Personalised Nigerian meal plans by trimester", "Maternal nurse available for daily questions", "Postpartum mental wellness support", "Emergency escalation with direct doctor line", "Paediatric handoff from week 36", "Digital birth plan creation", "Exclusive maternal community group", "Full health record for mother and newborn", "Clean handoff at month 10 - postpartum nutrition plan + baby paediatric registration"],
    howItWorks: [
      { step: 1, title: "Begin your prenatal care", description: "Share your due date, health history, and concerns. Your OB/GYN is matched within 24 hours for months 1 to 9 of prenatal care." },
      { step: 2, title: "Meet your full care team", description: "Your OB/GYN, nutritionist, and maternal nurse create a trimester-by-trimester care calendar." },
      { step: 3, title: "Continue through every trimester", description: "Weekly check-ins and personalised support continue through all nine months of pregnancy." },
      { step: 4, title: "Welcome month 10", description: "Your first month after delivery includes recovery monitoring, breastfeeding nutrition support, and maternal mental wellness care." },
      { step: 5, title: "A clean handoff after month 10", description: "Your nutritionist offers continued postpartum nutrition care, while your baby's paediatric consultation relationship begins separately." },
    ],
    benefits: [
      { title: "Never feel alone in your pregnancy", description: "A full care team is available every day, not just at your monthly antenatal appointment." },
      { title: "Nutrition that works for your body and budget", description: "Meal plans use Nigerian foods available in your market, not expensive imports." },
      { title: "Early warning system", description: "Weekly check-ins flag warning signs before they become emergencies." },
      { title: "Postpartum is not the end", description: "We stay with you through the critical weeks after birth." },
    ],
    whoIsThisFor: "Any woman who is pregnant or planning a pregnancy and wants continuous, expert-led care, not just occasional antenatal visits.",
    emergencyNote: "If you experience heavy bleeding, severe headache, vision changes, or reduced baby movement, activate Xohren SOS immediately. Your care team is alerted in real time.",
    durationNote: "This plan covers your full pregnancy plus your first month postpartum - 10 months total. After month 10, your nutritionist offers a continued postpartum nutrition plan and your baby's paediatric care begins as a separate Xohren relationship.",
  },
  {
    slug: "diabetes-care", name: "Diabetes Care Plan", icon: "Droplets", color: "primary", condition: "Type 1 & Type 2 Diabetes",
    tagline: "Manage your blood sugar. Reclaim your life.",
    heroDescription: "The Xohren Diabetes Care Plan gives you a dedicated endocrinologist, a nutritionist, and an AI monitoring system that watches your readings so you do not have to do it alone.",
    team: ["Endocrinologist", "Certified Nutritionist", "Diabetes Care Nurse", "AI Monitoring System"],
    pricingTiers: [
      { label: "Quarterly", duration: "3 months", price: "N12,000", discount: "5% off", popular: false },
      { label: "Half-Yearly", duration: "6 months", price: "N22,000", discount: "10% off", popular: true },
      { label: "Yearly", duration: "12 months", price: "N40,000", discount: "15% off - best value", popular: false },
    ],
    features: ["Assigned endocrinologist for plan duration", "Weekly AI blood sugar check-in", "Personalised Nigerian nutrition plan", "Medication reminders and refill alerts", "Monthly review of readings trends", "Dangerous-reading alerts", "A1C education", "Fitness-level exercise guidance", "Diabetes community group", "Digital prescription management"],
    howItWorks: careFlow("Complete your health baseline", "Meet your endocrinologist", "AI check-ins begin weekly", "Receive your meal plan", "Monthly review with your doctor"),
    benefits: [
      { title: "24/7 AI monitoring", description: "Your readings are watched between appointments so your care team can act early." },
      { title: "Eat Nigerian food and manage diabetes", description: "Practical meal guidance built around food you actually enjoy." },
      { title: "Stop complications before they start", description: "Continuous care helps prevent the progression of avoidable complications." },
      { title: "Medication management made simple", description: "Dose reminders and refill alerts help you stay consistent." },
    ],
    whoIsThisFor: "People living with Type 1 or Type 2 diabetes who want continuous, AI-supported care with a doctor who knows their history.",
    emergencyNote: "If you experience confusion, severe shaking, loss of consciousness, or a blood sugar reading below 3.9 or above 16.7, activate Xohren SOS immediately.",
  },
  {
    slug: "hypertension-care", name: "Hypertension Care Plan", icon: "Activity", color: "emergency", condition: "High Blood Pressure",
    tagline: "Your blood pressure. Under control. For good.",
    heroDescription: "Hypertension is called the silent killer because it often has no symptoms until it causes a stroke or heart attack. This plan gives you a cardiologist, continuous monitoring, and lifestyle guidance that fits Nigerian life.",
    team: ["Cardiologist", "Lifestyle Coach", "Care Nurse", "AI Monitoring System"],
    pricingTiers: [
      { label: "Quarterly", duration: "3 months", price: "N10,000", discount: "5% off", popular: false },
      { label: "Half-Yearly", duration: "6 months", price: "N18,000", discount: "10% off", popular: true },
      { label: "Yearly", duration: "12 months", price: "N32,000", discount: "15% off - best value", popular: false },
    ],
    features: ["Assigned cardiologist", "Weekly BP check-ins", "Sodium-reduction Nigerian meal guidance", "Medication adherence reminders", "Monthly BP trend review", "Stress management techniques", "Adapted exercise plan", "Dangerous BP alerts", "Understanding-your-numbers education", "Family risk guidance"],
    howItWorks: careFlow("Share your readings and history", "Set your target BP range", "Weekly check-ins begin", "Make lifestyle changes that stick", "Review and adjust your plan"),
    benefits: [
      { title: "Catch a crisis before it happens", description: "Trend monitoring helps your doctor see concerning changes early." },
      { title: "Manage BP without giving up Nigerian food", description: "Guidance works with your culture, not against it." },
      { title: "A cardiologist who knows your history", description: "One doctor with your full record, every time." },
      { title: "Protect your whole family", description: "Get guidance on screening family members before symptoms appear." },
    ],
    whoIsThisFor: "Anyone diagnosed with or at risk of high blood pressure who wants continuous expert monitoring instead of waiting for the next hospital appointment.",
    emergencyNote: "If your blood pressure is 180/120 or above, or you experience sudden severe headache, chest pain, or vision changes, activate Xohren SOS immediately.",
  },
  {
    slug: "mental-wellness", name: "Mental Wellness Plan", icon: "Brain", color: "health-green", condition: "Anxiety, Depression, Stress & Behavioural Health",
    tagline: "A safe place to be honest about how you feel.",
    heroDescription: "Mental health in Nigeria is surrounded by silence and stigma. You do not have to explain yourself to everyone. Just start talking. Xohren connects you to a licensed therapist in a confidential, continuous, deeply human space.",
    team: ["Licensed Therapist", "Mental Health Nurse", "Wellness Coach", "AI Support Layer"],
    pricingTiers: [
      { label: "Monthly", duration: "1 month", price: "N8,000", discount: "", popular: false },
      { label: "Quarterly", duration: "3 months", price: "N20,000", discount: "17% off", popular: true },
      { label: "Half-Yearly", duration: "6 months", price: "N35,000", discount: "27% off", popular: false },
    ],
    features: ["Assigned licensed therapist", "Two therapy sessions per month", "Anonymous enrolment option", "Daily AI mood check-ins", "24/7 crisis escalation", "Journaling prompts", "Anxiety management toolkit", "Sleep hygiene guidance", "Anonymous peer group", "Private therapist notes"],
    howItWorks: careFlow("Start anonymously if you prefer", "Meet your therapist", "Daily mood check-ins begin", "Attend regular therapy sessions", "Keep crisis support close"),
    benefits: [
      { title: "No stigma. No judgment.", description: "Your sessions remain between you and your therapist." },
      { title: "Start before you are ready", description: "You do not need a crisis to seek support." },
      { title: "Nigerian context, understood", description: "Therapists understand family pressure, faith, grief, and workplace stress." },
      { title: "AI support between sessions", description: "Daily check-ins help you feel supported between appointments." },
    ],
    whoIsThisFor: "Anyone experiencing anxiety, depression, grief, burnout, relationship stress, or feeling overwhelmed who wants confidential, culturally aware support.",
    emergencyNote: "If you are experiencing thoughts of self-harm or suicide, activate Xohren SOS immediately. A mental health professional will respond. You are not alone.",
  },
  {
    slug: "sickle-cell-care", name: "Sickle Cell Care Plan", icon: "Microscope", color: "primary", condition: "Sickle Cell Disease (HbSS, HbSC)",
    tagline: "Living with sickle cell. Supported every single day.",
    heroDescription: "The Xohren Sickle Cell Care Plan is built around the reality of living with SCD in Nigeria: crisis monitoring, pain management, and a haematologist who knows your history.",
    team: ["Haematologist", "Pain Management Specialist", "Nutritionist", "Crisis Response Nurse"],
    pricingTiers: [
      { label: "Quarterly", duration: "3 months", price: "N15,000", discount: "5% off", popular: false },
      { label: "Half-Yearly", duration: "6 months", price: "N27,000", discount: "10% off", popular: true },
      { label: "Yearly", duration: "12 months", price: "N48,000", discount: "15% off - best value", popular: false },
    ],
    features: ["Assigned haematologist", "AI crisis early warning", "Pain management protocol", "Medication management", "Hydration and nutrition plan", "Monthly review", "Trigger identification", "Urgent care line", "Family education", "Genetic counselling referrals"],
    howItWorks: careFlow("Share your SCD history", "Build your crisis profile", "Start daily monitoring", "Use your pain-management guidance", "Review and adjust your plan"),
    benefits: [
      { title: "Fewer crises, less hospital time", description: "Early monitoring helps catch a crisis before it needs hospital care." },
      { title: "A doctor who knows your SCD history", description: "No starting from scratch at every visit." },
      { title: "Family education included", description: "Caregivers receive practical guidance too." },
      { title: "Crisis protocol in your hands", description: "Know what to do in the early hours of a crisis." },
    ],
    whoIsThisFor: "People living with sickle cell disease who want continuous, expert-led care with a haematologist who knows them.",
    emergencyNote: "If you experience severe pain crisis, chest symptoms, fever above 38.5 C, severe anaemia symptoms, or stroke signs, activate Xohren SOS immediately.",
  },
  {
    slug: "nutrition-plan", name: "Nutrition & Wellness Plan", icon: "Apple", color: "gold", condition: "Weight Management, Malnutrition & General Wellness",
    tagline: "Food is medicine. Let us show you how.",
    heroDescription: "A nutritionist works with your body, budget, culture, and goals to build something that lasts. The Xohren Nutrition Plan is an ongoing, nutritionist-led programme for people who want to eat better, feel better, and live longer.",
    team: ["Certified Nutritionist", "Wellness Coach", "AI Meal Tracking System"],
    pricingTiers: [
      { label: "4 Weeks", duration: "1 month", price: "N6,000", discount: "", popular: false },
      { label: "12 Weeks", duration: "3 months", price: "N15,000", discount: "17% off", popular: true },
      { label: "6 Months", duration: "6 months", price: "N25,000", discount: "30% off", popular: false },
    ],
    features: ["Assigned nutritionist", "Personalised Nigerian meal plan", "Staple-food portion guidance", "Local-market grocery list", "Weekly nutrition check-in", "AI meal logging", "Child nutrition screening", "Postpartum nutrition support", "Condition-specific plans", "Healthy Nigerian recipe library"],
    howItWorks: careFlow("Complete your nutrition baseline", "Receive your first meal plan", "Start daily meal logging", "Review your plan fortnightly", "Keep coaching and accountability"),
    benefits: [
      { title: "Nigerian food. Healthy outcomes.", description: "Learn how to eat familiar foods in ways that support your goals." },
      { title: "For every budget", description: "Plans are built around what your local market carries and what you can afford." },
      { title: "Child nutrition screening", description: "Screen for malnutrition risk with practical guidance for families." },
      { title: "Works alongside your care bundle", description: "Your nutritionist can coordinate with your medical team." },
    ],
    whoIsThisFor: "Anyone who wants to eat better, whether managing a condition, losing weight, supporting a child's growth, or building healthier habits.",
    emergencyNote: null,
  },
  {
    slug: "hiv-wellness", name: "HIV Wellness Plan", icon: "Shield", color: "health-green", condition: "HIV/AIDS - Wellness & ARV Adherence Support",
    tagline: "Living with HIV. Thriving on your own terms.",
    heroDescription: "With the right support, people living with HIV live long, full, healthy lives. This plan is about continuity: medication adherence, nutrition, mental wellness, and a physician who knows your history and treats you with complete dignity.",
    team: ["Infectious Disease Physician", "Certified Nutritionist", "Mental Wellness Counsellor", "Adherence Support Nurse"],
    pricingTiers: [
      { label: "Quarterly", duration: "3 months", price: "N12,000", discount: "5% off", popular: false },
      { label: "Half-Yearly", duration: "6 months", price: "N22,000", discount: "10% off", popular: true },
      { label: "Yearly", duration: "12 months", price: "N40,000", discount: "15% off - best value", popular: false },
    ],
    features: ["Assigned infectious disease physician", "Daily discreet ARV reminders", "Monthly viral load and CD4 trend review", "Immune-supporting nutrition plan", "Monthly confidential wellness sessions", "Side-effect guidance", "Medication interaction checks", "Disclosure counselling if needed", "Zero external data sharing", "Anonymous moderated peer support"],
    howItWorks: [
      { step: 1, title: "Enrol with complete confidentiality", description: "Use a preferred name if you choose. Your information is never shared with your employer, family, or any third party." },
      { step: 2, title: "Meet your physician", description: "Review your ARV regimen, lab results, and any side effects in a conversation that respects your experience." },
      { step: 3, title: "Choose your reminder style", description: "Select discreet SMS, an app notification, or WhatsApp reminders. Your privacy, your choice." },
      { step: 4, title: "Build nutrition for immune health", description: "Your nutritionist creates a Nigerian-food plan that supports your goals and routine." },
      { step: 5, title: "Track your wellness progress", description: "Monthly reviews keep your care clear, consistent, and shaped around the life you are living." },
    ],
    benefits: [
      { title: "Dignity at every touchpoint", description: "Every interaction treats you as a whole person, not a diagnosis." },
      { title: "Never miss a dose", description: "Discreet reminders keep your regimen on track without revealing your status." },
      { title: "Nutrition for immune health", description: "Food guidance is built around what is available in your local market." },
      { title: "Mental wellness included", description: "Confidential counselling creates space to process what you carry." },
    ],
    whoIsThisFor: "People living with HIV who are on ARV treatment and want continuous, dignified support for adherence, nutrition, mental wellness, and everyday wellbeing in a completely private space.",
    emergencyNote: null,
  },
  {
    slug: "stroke-recovery", name: "Stroke Recovery & Caregiver Plan", icon: "PersonStanding", color: "primary", condition: "Post-Stroke Recovery & Rehabilitation Support",
    tagline: "Recovery is not a destination. It is a daily practice.",
    heroDescription: "Stroke recovery is a long journey carried by both the survivor and the person who loves them. This plan supports both with neurologist oversight, rehabilitation coordination, practical training, and caregiver wellness support.",
    team: ["Neurologist", "Physiotherapy Coordinator", "Speech & Language Therapist (referral)", "Caregiver Wellness Counsellor"],
    pricingTiers: [
      { label: "Quarterly", duration: "3 months", price: "N18,000", discount: "", popular: false },
      { label: "Half-Yearly", duration: "6 months", price: "N32,000", discount: "11% off", popular: true },
      { label: "Yearly", duration: "12 months", price: "N55,000", discount: "20% off - best value", popular: false },
    ],
    features: ["Assigned neurologist", "Monthly recovery review", "Physiotherapy coordination", "Speech therapy referral support", "Weekly recovery milestone check-ins", "Medication and blood-pressure monitoring", "Monthly caregiver wellness sessions", "Practical caregiver training", "Brain-health nutrition plan", "Secondary stroke prevention protocol", "Family warning-sign guidance"],
    howItWorks: [
      { step: 1, title: "Tell us about the survivor", description: "Share the stroke history, current medicines, rehabilitation so far, and the caregiver's needs." },
      { step: 2, title: "Set the recovery plan", description: "Your neurologist creates clear, measurable milestones for recovery." },
      { step: 3, title: "Coordinate physiotherapy", description: "Your coordinator helps organise local or remote support and tracks progress." },
      { step: 4, title: "Support the caregiver too", description: "The caregiver receives their own wellness session and practical support." },
      { step: 5, title: "Protect the future", description: "Ongoing monitoring of BP, medication adherence, and lifestyle lowers recurrence risk." },
    ],
    benefits: [
      { title: "The caregiver is not invisible", description: "Support is designed for the person carrying care as well as the survivor." },
      { title: "Structured recovery milestones", description: "Clear goals make progress visible and recovery more manageable." },
      { title: "Secondary prevention built in", description: "Continuous monitoring helps reduce the risk of a second stroke." },
      { title: "Rehabilitation support from home", description: "Coordinate physiotherapy guidance even when travel is difficult." },
    ],
    whoIsThisFor: "Stroke survivors in recovery and their family members or caregivers who want structured, neurologist-led rehabilitation alongside practical and mental wellness support.",
    emergencyNote: "If the survivor experiences sudden numbness, face drooping, arm weakness, speech difficulty, or a severe headache, activate Xohren SOS immediately and call emergency services.",
  },
  {
    slug: "general-wellness", name: "General Wellness Plan", icon: "HeartPulse", color: "primary", condition: "Preventive Care & Annual Health Monitoring",
    tagline: "Stay well before something goes wrong.",
    heroDescription: "Most Nigerians only see a doctor when they are already sick. The Xohren General Wellness Plan is an annual relationship with a general practitioner who knows you, monitors your baseline health, and catches anything unusual before it becomes serious. Prevention is the smartest investment you can make in yourself.",
    team: ["General Practitioner", "Wellness Nutritionist", "AI Health Monitoring System"],
    pricingTiers: [
      { label: "Quarterly Check-in", duration: "3 months", price: "N8,000", discount: "", popular: false },
      { label: "Half-Year Plan", duration: "6 months", price: "N14,000", discount: "12% off", popular: true },
      { label: "Annual Wellness", duration: "12 months", price: "N24,000", discount: "25% off - best value", popular: false },
    ],
    features: ["Assigned general practitioner", "Quarterly health reviews", "Annual bloodwork interpretation", "Blood pressure and BMI trend monitoring", "Preventive health checklist", "Lifestyle improvement plan", "Vaccination and screening reminders", "Monthly AI wellness check-in", "Specialist referral when needed", "Annual shareable health summary"],
    howItWorks: [
      { step: 1, title: "Complete your wellness baseline", description: "Answer a short questionnaire about lifestyle, family history, and current health habits. Your GP reviews it within 24 hours." },
      { step: 2, title: "Meet your general practitioner", description: "Start with a full wellness conversation, not a crisis appointment. Your GP gets to know you as a whole person." },
      { step: 3, title: "Monthly AI wellness check-ins", description: "Each month, Xohren checks in on sleep, energy, and new concerns for your GP to review." },
      { step: 4, title: "Quarterly health reviews", description: "Review health metrics, update your preventive checklist, and catch anything developing." },
      { step: 5, title: "Annual health summary", description: "Receive a complete, shareable picture of your metrics, trends, and progress." },
    ],
    benefits: [
      { title: "A doctor who knows your healthy baseline", description: "When your GP knows your normal, they can notice change earlier." },
      { title: "Stop problems before they start", description: "Regular monitoring catches rising blood pressure and pre-diabetes earlier." },
      { title: "One complete health picture", description: "Your check-ins, consultations, and metrics live together in your record." },
      { title: "Referrals when you need them", description: "If anything needs specialist attention, your GP can refer you within Xohren." },
    ],
    whoIsThisFor: "Healthy adults who want to stay that way: people who believe prevention is cheaper, smarter, and kinder than treatment, and want a doctor who knows their health history.",
    emergencyNote: null,
  },
];

export function getCarePlan(slug: string) {
  return carePlans.find((plan) => plan.slug === slug);
}
