const circuits = [
  "M520 150H580V180H640V160H700", "M450 200H500V230H560V210H620V240H680", "M480 280H530V310H490V340H560", "M660 260H720V300H680V330H740", "M500 360H550V390H610V370H650", "M430 430H480V460H520V440H580V470H640", "M550 500H600V530H650V510H710", "M460 560H520V590H480V620H550", "M570 580H630V610H690V590H740", "M490 650H540V680H600V660H650",
  "M440 170H470V145H510", "M590 205H650V225H710", "M470 250H510V270H575V245H615", "M445 330H495V355H545V335H590", "M575 420H625V445H690", "M455 485H510V510H570V490H620", "M425 545H475V570H535", "M615 555H665V575H720", "M435 600H465V640H510", "M535 700H585V725H640", "M625 130H670V155H725", "M700 355H730V390H690", "M605 470H660V490H705", "M520 540H560V560H610", "M470 710H520V735H580",
];
const nodes = Array.from({ length: 42 }, (_, index) => ({ x: 450 + ((index * 47) % 292), y: 145 + ((index * 83) % 570), r: index % 3 === 0 ? 2.5 : 2 }));
const mesh = Array.from({ length: 20 }, (_, index) => ({ x1: 430 + ((index * 43) % 250), y1: 130 + ((index * 71) % 560), x2: 480 + ((index * 89) % 270), y2: 180 + ((index * 107) % 570) }));
const dust = Array.from({ length: 30 }, (_, index) => ({ x: 365 + ((index * 19) % 120), y: 160 + ((index * 61) % 540), r: 0.8 + (index % 3) * 0.3, opacity: 0.18 + (index % 5) * 0.09, delay: `${(index % 6) * 0.45}s` }));

export function AIFaceIllustration() {
  return <svg viewBox="0 0 800 900" aria-hidden="true" className="pointer-events-none absolute right-0 top-0 z-[1] h-screen w-[60%] opacity-85">
    <defs>
      <radialGradient id="glowCenter" cx="55%" cy="45%" r="45%"><stop offset="0%" stopColor="rgba(0,210,200,.15)" /><stop offset="40%" stopColor="rgba(0,150,220,.08)" /><stop offset="100%" stopColor="rgba(0,0,0,0)" /></radialGradient>
      <linearGradient id="fadeLeft" x1="0%" x2="100%"><stop offset="0%" stopColor="#050810" /><stop offset="35%" stopColor="#050810" stopOpacity=".85" /><stop offset="65%" stopColor="#050810" stopOpacity=".3" /><stop offset="100%" stopColor="#050810" stopOpacity="0" /></linearGradient>
      <filter id="glow"><feGaussianBlur stdDeviation="3" result="coloredBlur" /><feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      <filter id="strongGlow"><feGaussianBlur stdDeviation="6" result="coloredBlur" /><feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      <filter id="softGlow"><feGaussianBlur stdDeviation="12" /></filter>
    </defs>
    <style>{`@keyframes eyePulse{0%,100%{opacity:.9;r:5}50%{opacity:.5;r:7}}@keyframes flicker{0%,100%{opacity:.6}25%{opacity:.3}75%{opacity:.8}}@keyframes drift{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}.eye{animation:eyePulse 3s ease-in-out infinite}.flicker{animation:flicker 5s ease-in-out infinite}.dust{animation:drift 5s ease-in-out infinite}`}</style>
    <rect width="800" height="900" fill="#050810" /><rect width="800" height="900" fill="url(#glowCenter)" />
    {mesh.map((line, index) => <line key={index} {...line} stroke="rgba(0,180,210,.23)" strokeWidth=".5" />)}
    <path d="M580 100C650 100 720 140 740 200C760 260 755 320 745 370C735 420 720 450 710 480C700 510 695 530 690 550C685 570 680 590 670 610C655 640 630 660 610 675C590 690 570 695 555 700C540 705 525 708 510 710C490 712 470 710 455 705C440 700 428 692 420 682C408 668 405 650 408 632C411 614 420 600 425 585C430 570 428 555 422 542C410 515 390 500 385 480C378 455 385 428 395 405C405 382 418 362 425 338C432 314 430 288 428 262C425 220 430 175 460 148C490 121 530 100 580 100Z" fill="none" stroke="rgba(0,210,200,.7)" strokeWidth="1.5" filter="url(#glow)" />
    <path d="M480 108C520 95 560 90 600 95M680 380C685 420 682 460 665 490C655 505 640 512 625 515M425 640C440 665 460 680 490 690C515 698 540 700 560 698M490 710L475 820M555 700L565 820" fill="none" stroke="rgba(0,210,200,.4)" strokeWidth="1" />
    <ellipse cx="620" cy="310" rx="35" ry="20" fill="none" stroke="rgba(0,210,200,.5)" strokeWidth="1" filter="url(#glow)" /><circle className="eye" cx="628" cy="310" r="5" fill="rgba(0,230,220,.9)" filter="url(#strongGlow)" /><circle cx="628" cy="310" r="2" fill="white" />
    {circuits.map((d, index) => <path key={d} d={d} className={index % 4 === 0 ? "flicker" : undefined} fill="none" stroke={index % 2 ? "rgba(0,210,200,.58)" : "rgba(0,200,220,.5)"} strokeWidth={index % 3 ? ".8" : "1"} filter="url(#glow)" />)}
    {nodes.map((node, index) => <circle key={index} cx={node.x} cy={node.y} r={node.r} fill={index % 2 ? "rgba(0,220,210,.8)" : "rgba(0,200,230,.7)"} filter="url(#glow)" />)}
    {[[628,310],[700,260],[690,420],[500,680],[600,170]].map(([x, y]) => <g key={`${x}-${y}`}><circle cx={x} cy={y} r="10" fill="rgba(0,230,220,.06)" filter="url(#softGlow)" /><circle cx={x} cy={y} r="3" fill="rgba(0,240,230,.5)" filter="url(#glow)" /></g>)}
    {dust.map((dot, index) => <circle key={index} className="dust" cx={dot.x} cy={dot.y} r={dot.r} style={{ animationDelay: dot.delay }} fill={`rgba(0,200,220,${dot.opacity})`} />)}
    <rect width="800" height="900" fill="url(#fadeLeft)" />
  </svg>;
}
