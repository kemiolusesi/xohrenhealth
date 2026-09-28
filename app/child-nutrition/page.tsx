"use client";

import Link from "next/link";
import { useState } from "react";
import { Eyebrow, Header } from "../components";

type Answers = { age: string; weight: string; meals: string; protein: string; produce: string; energy: string; weightLoss: string; signs: string[] };
const initial: Answers = { age: "", weight: "", meals: "", protein: "", produce: "", energy: "", weightLoss: "", signs: [] };
const signs = ["Swollen feet or face", "Very dry or patchy skin", "Hair that is thin, dry or changing colour", "Frequent infections or slow healing", "None of these"];

function resultFor(answer: Answers) {
  const meals = answer.meals === "3 meals" || answer.meals === "More than 3" ? 2 : answer.meals === "2 meals" ? 1 : 0;
  const foodScore = (value: string) => value === "Every day" ? 2 : value === "A few times a week" ? 1 : 0;
  const energy = answer.energy === "Very active and playful" ? 2 : answer.energy === "Somewhat active" ? 1 : answer.energy === "Often tired and sluggish" ? 0 : -1;
  const loss = answer.weightLoss === "No" ? 1 : answer.weightLoss === "Not sure" ? 0 : -1;
  const signScore = answer.signs.includes("None of these") ? 2 : -answer.signs.length;
  const score = meals + foodScore(answer.protein) + foodScore(answer.produce) + energy + loss + signScore;
  return score >= 10 ? "green" : score >= 6 ? "amber" : "red";
}

export default function ChildNutritionPage() {
  const [answers, setAnswers] = useState<Answers>(initial);
  const [result, setResult] = useState<"green" | "amber" | "red" | null>(null);
  const update = (key: keyof Answers, value: string) => setAnswers((current) => ({ ...current, [key]: value }));
  const toggleSign = (sign: string) => setAnswers((current) => ({ ...current, signs: sign === "None of these" ? [sign] : current.signs.filter((item) => item !== "None of these").includes(sign) ? current.signs.filter((item) => item !== sign) : [...current.signs.filter((item) => item !== "None of these"), sign] }));
  const choice = (key: "meals" | "protein" | "produce" | "energy" | "weightLoss", values: string[]) => <div className="mt-3 flex flex-wrap gap-2">{values.map((value) => <button className={`rounded-xl border px-4 py-3 text-sm ${answers[key] === value ? "border-primary bg-primary-light text-primary" : "border-border bg-card text-text-body"}`} key={value} onClick={() => update(key, value)} type="button">{value}</button>)}</div>;

  return <div className="min-h-screen bg-surface"><Header /><main>
    <section className="bg-primary-wash"><div className="mx-auto max-w-4xl px-5 py-18 text-center sm:px-8 sm:py-24"><Eyebrow>Free assessment tool</Eyebrow><h1 className="mt-4 font-serif text-4xl font-medium text-near-black sm:text-5xl">Is your child growing the way they should?</h1><p className="mx-auto mt-5 max-w-2xl leading-8 text-text-body">Malnutrition in Nigerian children is often invisible until it becomes serious. This free tool asks eight simple questions about your child&apos;s age, weight, and diet, then shows you a clear next step.</p><a className="mt-8 inline-block rounded-xl bg-gold px-6 py-3.5 text-sm font-medium text-white" href="#assessment">Start the assessment -&gt;</a><p className="mt-4 font-accent text-xl text-primary">Takes less than 3 minutes. Completely free.</p></div></section>
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8"><Eyebrow>How it works</Eyebrow><div className="mt-6 grid gap-4 md:grid-cols-3">{[["1", "Answer 8 simple questions", "Tell us about age, approximate weight, meals, and typical foods."], ["2", "Xohren AI analyses the answers", "A clear, practical risk screen using Nigerian dietary context."], ["3", "Receive a clear result", "See whether nutrition is on track, needs improvement, or needs attention now."]].map(([number, title, body]) => <article className="card p-6" key={number}><p className="font-serif text-4xl text-gold">{number}</p><h2 className="mt-3 font-serif text-2xl font-medium text-near-black">{title}</h2><p className="mt-3 leading-7 text-text-body">{body}</p></article>)}</div></section>
    <section id="assessment" className="mx-auto max-w-3xl px-5 pb-20 sm:px-8"><div className="card p-6 sm:p-9"><Eyebrow>Child nutrition check</Eyebrow><h2 className="mt-4 font-serif text-3xl font-medium text-near-black">Tell us about your child.</h2><div className="mt-8 grid gap-7">
      <label className="grid gap-2 font-medium text-near-black">How old is your child?<input className="rounded-xl border border-border px-4 py-3 text-text-body" inputMode="numeric" onChange={(event) => update("age", event.target.value)} placeholder="Months for under 2, years for 2+" value={answers.age} /></label>
      <label className="grid gap-2 font-medium text-near-black">What is your child&apos;s approximate weight?<input className="rounded-xl border border-border px-4 py-3 text-text-body" inputMode="decimal" onChange={(event) => update("weight", event.target.value)} placeholder="Weight in kg - a rough estimate is fine" value={answers.weight} /></label>
      <div><p className="font-medium text-near-black">How many meals does your child eat per day?</p>{choice("meals", ["1 meal", "2 meals", "3 meals", "More than 3"])}</div>
      <div><p className="font-medium text-near-black">Does your child eat protein regularly?</p><p className="mt-1 text-sm text-text-muted">Eggs, beans, fish, meat, groundnut</p>{choice("protein", ["Every day", "A few times a week", "Rarely", "Almost never"])}</div>
      <div><p className="font-medium text-near-black">Does your child eat fruits or vegetables regularly?</p>{choice("produce", ["Every day", "A few times a week", "Rarely", "Almost never"])}</div>
      <div><p className="font-medium text-near-black">How would you describe your child&apos;s energy levels?</p>{choice("energy", ["Very active and playful", "Somewhat active", "Often tired and sluggish", "Very weak and lethargic"])}</div>
      <div><p className="font-medium text-near-black">Has your child lost weight recently or seemed to stop growing?</p>{choice("weightLoss", ["Yes", "No", "Not sure"])}</div>
      <fieldset><legend className="font-medium text-near-black">Does your child experience any of these?</legend><div className="mt-3 grid gap-3">{signs.map((sign) => <label className="flex items-center gap-3 text-text-body" key={sign}><input checked={answers.signs.includes(sign)} onChange={() => toggleSign(sign)} type="checkbox" />{sign}</label>)}</div></fieldset>
      <button className="w-full rounded-xl bg-gold px-6 py-4 text-sm font-medium text-white" onClick={() => setResult(resultFor(answers))} type="button">Assess my child&apos;s nutrition -&gt;</button>
    </div>
    {result && <Result result={result} answers={answers} />}</div></section>
  </main></div>;
}

function Result({ result, answers }: { result: "green" | "amber" | "red"; answers: Answers }) {
  if (result === "green") return <div className="mt-8 rounded-2xl border border-health-green bg-green-light p-6"><h2 className="font-serif text-3xl font-medium text-near-black">Great news - your child appears to be on track.</h2><p className="mt-3 leading-7 text-text-body">Based on your answers, your child&apos;s diet and growth appear to be developing well. Keep supporting healthy growth with eggs, beans and groundnut, sweet potato, dark leafy greens such as ugwu or efo, and breast milk for children under two.</p><Link className="mt-5 inline-block rounded-xl border border-primary px-5 py-3 text-sm font-medium text-primary" href="/doctors">Book a paediatric check-up for peace of mind</Link></div>;
  if (result === "amber") { const gaps = [answers.protein !== "Every day" ? "Add affordable protein such as eggs, beans, fish, or groundnut more often." : "", answers.produce !== "Every day" ? "Include sweet potato, pawpaw, oranges, ugwu, or efo through the week." : "", answers.meals === "1 meal" || answers.meals === "2 meals" ? "Aim for more regular meals and nourishing snacks." : ""].filter((gap): gap is string => Boolean(gap)); return <div className="mt-8 rounded-2xl border border-gold bg-gold-light p-6"><h2 className="font-serif text-3xl font-medium text-near-black">Some nutritional gaps to address.</h2><p className="mt-3 leading-7 text-text-body">This is common and very addressable. Here is what to focus on:</p><ul className="mt-4 grid gap-2 text-text-body">{gaps.map((gap) => <li key={gap}>- {gap}</li>)}</ul><Link className="mt-5 inline-block rounded-xl bg-gold px-5 py-3 text-sm font-medium text-white" href="/doctors">Speak to a Xohren nutritionist</Link></div>; }
  return <div className="mt-8 rounded-2xl border border-emergency bg-emergency-light p-6"><h2 className="font-serif text-3xl font-medium text-near-black">Your child needs nutritional support now.</h2><p className="mt-3 leading-7 text-text-body">Some answers suggest signs that may indicate moderate to severe malnutrition. This needs professional attention, not alarm, but action. A Xohren nutritionist and paediatrician can assess your child properly and create a recovery plan using foods available to you.</p><div className="mt-5 flex flex-wrap gap-3"><Link className="rounded-xl bg-emergency px-5 py-3 text-sm font-medium text-white" href="/doctors">Book urgent nutritionist consultation</Link><Link className="rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white" href="/doctors">Book paediatric consultation</Link></div><p className="mt-5 text-sm leading-6 text-emergency">If your child has swollen feet or face, severe weakness, or has stopped eating entirely, activate Xohren SOS or visit the nearest hospital immediately.</p></div>;
}
