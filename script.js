// ----------------------
// Helpers
// ----------------------
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

const LS = {
  get(key, fallback){
    try{
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : fallback;
    }catch{ return fallback; }
  },
  set(key, value){
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// ----------------------
// Language (EN / TA)
// ----------------------
// ✅ If you want Tamil as default ALWAYS, change "en" to "ta"
let lang = localStorage.getItem("lang") || "en";

const dict = {
  en: {
    appName: "Serenly",
    appTag: "Healing starts here",
    welcomeTitle: "You’re not alone. You’re human.",
    welcomeSub: "Small steps count. This app supports you on hard days.",

    todayMood: "Today Mood",
    journals: "Journals",
    goalProgress: "Goal Progress",

    dailyProgress: "Daily Progress",
    gentleActionForToday: "Gentle action for today",
    moodTrend: "Mood Trend",
    moodTrendSub: "Based on your last check-ins.",
    dailyAffirmation: "Daily Affirmation",
    safetyPlan: "Safety Plan (Quick)",

    btnBreathing: "Breathing",
    btnMusic: "Music",
    btnJournal: "Journal",
    btnStart: "Start",
    btnStop: "Stop",
    btnDone: "Done",
    btnSave: "Save",
    btnClear: "Clear",
    btnAdd: "Add",
    btnPost: "Post",
    btnBook: "Book a Session",
    btnNewPrompt: "New Prompt",
    btnUseInJournal: "Use in Journal",

    // Safety list
    s1: "✅ Drink water",
    s2: "✅ Eat something small",
    s3: "✅ Text someone you trust",
    s4: "✅ If you feel unsafe, use Emergency Help",

    // Nav
    navDashboard: "Dashboard",
    navMood: "Mood",
    navCoping: "Coping",
    navGoals: "Goals",
    navJournal: "Journal",
    navMeds: "Meds",
    navCommunity: "Community",
    navSupport: "Support",

    // Coping
    copingStrategies: "Coping Strategies",
    tabBreathing: "Breathing",
    tabGrounding: "Grounding",
    tabMusic: "Music",

    boxBreathing: "Box Breathing (4–4–4–4)",
    boxBreathingSub: "Inhale 4 • Hold 4 • Exhale 4 • Hold 4",

    groundingTitle: "5–4–3–2–1 Grounding",
    g1: "5 things you can see",
    g2: "4 things you can feel",
    g3: "3 things you can hear",
    g4: "2 things you can smell",
    g5: "1 thing you can taste",

    musicTitle: "Calm Music Player",
    trackCalm: "🌙 Calm Night",
    trackRain: "🌧 Rain",
    trackPiano: "🎹 Soft Piano",
    loop: "🔁 Loop",
    loopOn: "🔁 Loop ON",

    // Prompts + resources
    selfHelpPrompts: "Self-help Prompts",
    tryOneLine: "Try writing one line:",
    educationalResources: "Educational Resources",
    r1: "Depression symptoms & why it happens",
    r2: "When to seek professional help",
    r3: "Sleep, movement, and nutrition basics",

    // Mood page
    moodCheckIn: "Mood Check-in",
    moodQ: "How heavy does today feel?",
    moodNoteLabel: "Mood note (optional)",
    moodNotePH: "Write a small note…",
    saveMood: "Save Mood",

    // Goals
    goalSetting: "Goal Setting",
    goalSub: "Small goals are powerful on low-energy days.",
    goalPH: "Add a small goal…",

    // Journal page
    privateJournal: "Private Journal",
    journalSub: "This is only for you. No judgement.",
    journalPH: "Write here…",
    savedEntries: "Saved Entries",

    // Meds page
    medTitle: "Medication Reminders",
    medNamePH: "Medicine name",
    tips: "Tips",
    t1: "Use reminders for consistency",
    t2: "If side effects occur, contact a professional",
    t3: "Never self-adjust dosage without advice",

    // Community
    communityTitle: "Peer Support Community (Demo)",
    communitySub: "Share gently. Be kind. This is a safe space.",
    postPH: "Write a supportive message…",
    postsTitle: "Posts",

    // Support
    profSupport: "Professional Support",
    profSub: "Demo: In production, therapists would be verified.",
    privacyTitle: "Privacy & Data Security",
    p1: "Demo stores data locally in browser",
    p2: "Production: encryption + consent + access control",
    p3: "No public sharing of journal by default",

    accessibility: "Accessibility",
    a1: "Font size controls (A-/A+)",
    a2: "High contrast mode",
    a3: "Simple, calm layout",

    // Bottom / emergency
    emergency: "Emergency Help",
    demoNote: "Demo: data stored locally in your browser (localStorage).",

    emergencyTitle: "Emergency Help",
    emergencyMsg: "If you feel unsafe right now, please contact local emergency services or a trusted person immediately.",
    e1: "Call your local emergency number",
    e2: "Reach a friend/family member",
    e3: "Go to the nearest hospital",

    // Menu button aria
    openMenu: "Open menu"
  },

  ta: {
    appName: "Serenly",
    appTag: "ஆரோக்கியம் இங்கே தொடங்குகிறது",
    welcomeTitle: "நீங்கள் தனியாக இல்லை. நீங்கள் மனிதர்.",
    welcomeSub: "சிறிய முன்னேற்றங்களும் முக்கியம். கடினமான நாட்களில் இந்த பயன்பாடு உங்களுடன் இருக்கும்.",

    todayMood: "இன்றைய மனநிலை",
    journals: "ஜர்னல்கள்",
    goalProgress: "இலக்கு முன்னேற்றம்",

    dailyProgress: "இன்றைய முன்னேற்றம்",
    gentleActionForToday: "இன்றைக்கு மென்மையான செயல்",
    moodTrend: "மூட் போக்கு",
    moodTrendSub: "உங்கள் சமீப பதிவு அடிப்படையில்.",
    dailyAffirmation: "இன்றைய உறுதிமொழி",
    safetyPlan: "சேஃப்டி திட்டம் (சுருக்கம்)",

    btnBreathing: "மூச்சு",
    btnMusic: "இசை",
    btnJournal: "ஜர்னல்",
    btnStart: "தொடங்கு",
    btnStop: "நிறுத்து",
    btnDone: "முடிந்தது",
    btnSave: "சேமி",
    btnClear: "அழி",
    btnAdd: "சேர்",
    btnPost: "பதிவு செய்",
    btnBook: "செஷன் பதிவு செய்",
    btnNewPrompt: "புதிய கேள்வி",
    btnUseInJournal: "ஜர்னலில் பயன்படுத்து",

    s1: "✅ தண்ணீர் குடிக்கவும்",
    s2: "✅ சிறிது உணவு சாப்பிடவும்",
    s3: "✅ நம்பிக்கை உள்ள ஒருவருக்கு மெசேஜ் செய்யவும்",
    s4: "✅ பாதுகாப்பாக இல்லையெனில், அவசர உதவியை பயன்படுத்தவும்",

    navDashboard: "டாஷ்போர்டு",
    navMood: "மனநிலை",
    navCoping: "சமாளிப்பு",
    navGoals: "இலக்குகள்",
    navJournal: "ஜர்னல்",
    navMeds: "மருந்துகள்",
    navCommunity: "சமூக ஆதரவு",
    navSupport: "உதவி",

    copingStrategies: "சமாளிப்பு முறைகள்",
    tabBreathing: "மூச்சு",
    tabGrounding: "நிலைப்படுத்தல்",
    tabMusic: "இசை",

    boxBreathing: "பெட்டி மூச்சு (4–4–4–4)",
    boxBreathingSub: "உள்ளிழுக்கு 4 • பிடி 4 • வெளியேற்று 4 • பிடி 4",

    groundingTitle: "5–4–3–2–1 நிலைப்படுத்தல்",
    g1: "நீங்கள் பார்க்கக்கூடிய 5 விஷயங்கள்",
    g2: "நீங்கள் உணரக்கூடிய 4 விஷயங்கள்",
    g3: "நீங்கள் கேட்கக்கூடிய 3 விஷயங்கள்",
    g4: "நீங்கள் மணக்கக்கூடிய 2 விஷயங்கள்",
    g5: "நீங்கள் சுவைக்கக்கூடிய 1 விஷயம்",

    musicTitle: "அமைதியான இசை ப்ளேயர்",
    trackCalm: "🌙 அமைதியான இரவு",
    trackRain: "🌧 மழை",
    trackPiano: "🎹 மென்மையான பியானோ",
    loop: "🔁 மீளச்சுழல்",
    loopOn: "🔁 மீளச்சுழல் ON",

    selfHelpPrompts: "சுய உதவி கேள்விகள்",
    tryOneLine: "ஒரு வரி எழுதிப் பார்க்கவும்:",
    educationalResources: "கல்வி வளங்கள்",
    r1: "மன அழுத்த அறிகுறிகள் & ஏன் நிகழ்கிறது",
    r2: "எப்போது நிபுணர் உதவி தேட வேண்டும்",
    r3: "தூக்கம், இயக்கம், ஊட்டச்சத்து அடிப்படைகள்",

    moodCheckIn: "மனநிலை பதிவு",
    moodQ: "இன்றைய நாள் எவ்வளவு கனமாக உள்ளது?",
    moodNoteLabel: "மனநிலை குறிப்பு (விருப்பம்)",
    moodNotePH: "ஒரு சிறிய குறிப்பு எழுதுங்கள்…",
    saveMood: "மனநிலை சேமி",

    goalSetting: "இலக்கு அமைப்பு",
    goalSub: "குறைந்த சக்தி நாட்களில் சிறிய இலக்குகள் பெரிய உதவி.",
    goalPH: "ஒரு சிறிய இலக்கு சேர்க்கவும்…",

    privateJournal: "தனிப்பட்ட ஜர்னல்",
    journalSub: "இது உங்களுக்கானது மட்டும். தீர்ப்பில்லை.",
    journalPH: "இங்கே எழுதுங்கள்…",
    savedEntries: "சேமித்த பதிவுகள்",

    medTitle: "மருந்து நினைவூட்டல்கள்",
    medNamePH: "மருந்து பெயர்",
    tips: "குறிப்புகள்",
    t1: "தொடர்ச்சிக்கு நினைவூட்டல் உதவும்",
    t2: "பக்க விளைவுகள் இருந்தால் நிபுணரை அணுகவும்",
    t3: "ஆலோசனை இன்றி அளவை மாற்ற வேண்டாம்",

    communityTitle: "சமூக ஆதரவு (டெமோ)",
    communitySub: "மென்மையாக பகிருங்கள். கருணையுடன் இருங்கள்.",
    postPH: "ஒரு ஆதரவான செய்தி எழுதுங்கள்…",
    postsTitle: "பதிவுகள்",

    profSupport: "நிபுணர் ஆதரவு",
    profSub: "டெமோ: தயாரிப்பில் நிபுணர்கள் சரிபார்க்கப்படுவர்.",
    privacyTitle: "தனியுரிமை & தரவு பாதுகாப்பு",
    p1: "டெமோவில் தரவு உலாவியில் உள்ளூராக சேமிக்கப்படும்",
    p2: "தயாரிப்பு: குறியாக்கம் + சம்மதம் + அணுகல் கட்டுப்பாடு",
    p3: "ஜர்னல் இயல்பாக பொது பகிர்வு இல்லை",

    accessibility: "அணுகல் வசதி",
    a1: "எழுத்தளவு கட்டுப்பாடு (A-/A+)",
    a2: "உயர் கான்ட்ராஸ்ட் முறை",
    a3: "எளிய, அமைதியான அமைப்பு",

    emergency: "அவசர உதவி",
    demoNote: "டெமோ: தரவு உங்களின் உலாவியில் உள்ளூராக சேமிக்கப்படுகிறது (localStorage).",

    emergencyTitle: "அவசர உதவி",
    emergencyMsg: "இப்போது பாதுகாப்பாக இல்லையெனில், அருகிலுள்ள அவசர சேவையையோ அல்லது நம்பிக்கை உள்ள ஒருவரையோ உடனே தொடர்பு கொள்ளுங்கள்.",
    e1: "உங்கள் பகுதி அவசர எண்ணை அழைக்கவும்",
    e2: "நண்பர்/குடும்பத்தினரை அணுகவும்",
    e3: "அருகிலுள்ள மருத்துவமனைக்கு செல்லவும்",

    openMenu: "மெனு திறக்க"
  }
};

function applyI18n(){
  // Text nodes
  $$("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (dict[lang] && dict[lang][key] != null) el.textContent = dict[lang][key];
  });

  // Attributes
  $$("[data-i18n-placeholder]").forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (dict[lang] && dict[lang][key] != null) el.setAttribute("placeholder", dict[lang][key]);
  });
  $$("[data-i18n-title]").forEach(el => {
    const key = el.dataset.i18nTitle;
    if (dict[lang] && dict[lang][key] != null) el.setAttribute("title", dict[lang][key]);
  });
  $$("[data-i18n-aria]").forEach(el => {
    const key = el.dataset.i18nAria;
    if (dict[lang] && dict[lang][key] != null) el.setAttribute("aria-label", dict[lang][key]);
  });

  // Button label
  const lt = $("#langToggle");
  if (lt) lt.textContent = (lang === "ta") ? "TA / EN" : "EN / TA";

  // Refresh dynamic text in chosen language
  setAffirmation();
  setPrompt();
  suggestGentleAction((moodDraft && moodDraft.score) ? moodDraft.score : 50);
  updateLoopLabel();
}

function toggleLang(){
  lang = (lang === "en") ? "ta" : "en";
  localStorage.setItem("lang", lang);
  applyI18n();
}

// ----------------------
// Mobile sidebar toggle
// ----------------------
const sidebar = $("#sidebar");
const menuBtn = $("#menuBtn");
const overlay = $("#overlay");

function openSidebar(){
  if (!sidebar) return;
  sidebar.classList.add("show");
  if (overlay) overlay.classList.add("show");
}
function closeSidebar(){
  if (!sidebar) return;
  sidebar.classList.remove("show");
  if (overlay) overlay.classList.remove("show");
}

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    if (sidebar && sidebar.classList.contains("show")) closeSidebar();
    else openSidebar();
  });
}
if (overlay) overlay.addEventListener("click", closeSidebar);

// ----------------------
// Navigation (pages)
// ----------------------
$$(".nav-link").forEach(btn => {
  btn.addEventListener("click", () => {
    $$(".nav-link").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const target = btn.dataset.target;
    $$(".page").forEach(p => p.classList.remove("active"));
    const page = document.getElementById(target);
    if (page) page.classList.add("active");

    closeSidebar();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// Quick buttons
const quickBreath = $("#quickBreath");
const quickMusic = $("#quickMusic");
const quickJournal = $("#quickJournal");

if (quickBreath) quickBreath.addEventListener("click", () => {
  const copingBtn = document.querySelector('[data-target="coping"]');
  if (copingBtn) copingBtn.click();
  setTab("breath");
});
if (quickMusic) quickMusic.addEventListener("click", () => {
  const copingBtn = document.querySelector('[data-target="coping"]');
  if (copingBtn) copingBtn.click();
  setTab("music");
});
if (quickJournal) quickJournal.addEventListener("click", () => {
  const jbtn = document.querySelector('[data-target="journal"]');
  if (jbtn) jbtn.click();
});

// ----------------------
// Dynamic: Affirmations + prompts
// ----------------------
const affirmationsEN = [
  "You are not alone.",
  "This feeling will pass — slowly, gently.",
  "Small steps still count.",
  "You matter.",
  "Even being here is progress."
];
const affirmationsTA = [
  "நீங்கள் தனியாக இல்லை.",
  "இந்த உணர்வு மெதுவாக மாறும் — மென்மையாக.",
  "சிறிய முன்னேற்றங்களும் மதிப்புள்ளது.",
  "நீங்கள் முக்கியமானவர்.",
  "இங்கே இருப்பதும் ஒரு முன்னேற்றமே."
];

function setAffirmation(){
  const el = $("#affirmation");
  if (!el) return;
  const arr = (lang === "ta") ? affirmationsTA : affirmationsEN;
  el.textContent = arr[Math.floor(Math.random() * arr.length)];
}
setAffirmation();

const promptsEN = [
  "What is one thing I need today?",
  "What would I tell a friend feeling this way?",
  "What’s one small action I can do in 2 minutes?",
  "What did I survive before that I’m proud of?",
  "What is one gentle boundary I can set?"
];
const promptsTA = [
  "இன்று எனக்கு தேவையான ஒரு விஷயம் என்ன?",
  "இப்படி உணர்கிற நண்பருக்கு நான் என்ன சொல்வேன்?",
  "2 நிமிடங்களில் நான் செய்யக்கூடிய சிறிய செயல் என்ன?",
  "முன்பு நான் கடந்து வந்ததில் எனக்கு பெருமை அளிப்பது என்ன?",
  "நான் அமைதியாக அமைக்கக்கூடிய ஒரு எல்லை என்ன?"
];

function setPrompt(){
  const el = $("#promptText");
  if (!el) return;
  const arr = (lang === "ta") ? promptsTA : promptsEN;
  el.textContent = arr[Math.floor(Math.random() * arr.length)];
}
setPrompt();

const newPromptBtn = $("#newPrompt");
const usePromptBtn = $("#usePrompt");
if (newPromptBtn) newPromptBtn.addEventListener("click", setPrompt);

if (usePromptBtn) usePromptBtn.addEventListener("click", () => {
  const jbtn = document.querySelector('[data-target="journal"]');
  if (jbtn) jbtn.click();
  const jt = $("#journalText");
  if (!jt) return;
  const text = $("#promptText") ? $("#promptText").textContent : "";
  jt.value = jt.value ? (jt.value + "\n\n" + text + "\n") : (text + "\n");
});

// ----------------------
// Mood tracking + chart
// ----------------------
let moodDraft = LS.get("moodDraft", { mood:"—", score:50, note:"" });
let moodHistory = LS.get("moodHistory", []);

function renderMoodBars(){
  const container = $("#moodChart");
  if (!container) return;
  container.innerHTML = "";

  const last = moodHistory.slice(-10);
  const base = last.length ? last : [{score:20},{score:45},{score:35},{score:60},{score:50},{score:70},{score:40}];

  base.forEach((m) => {
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = Math.max(18, Math.min(140, m.score)) + "px";
    container.appendChild(bar);
  });
}
renderMoodBars();

let selectedMood = null;
let selectedScore = 0;

$$(".moodBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    selectedMood = btn.dataset.mood;
    selectedScore = Number(btn.dataset.score);

    $$(".moodBtn").forEach(b => b.style.outline = "none");
    btn.style.outline = "2px solid rgba(123,211,255,0.7)";
  });
});

const saveMoodBtn = $("#saveMoodBtn");
if (saveMoodBtn) saveMoodBtn.addEventListener("click", () => {
  const note = $("#moodNote") ? $("#moodNote").value.trim() : "";

  const mood = selectedMood || moodDraft.mood || "—";
  const score = selectedScore || moodDraft.score || 50;

  moodDraft = { mood, score, note };
  moodHistory.push({ mood, score, ts: Date.now(), note });

  LS.set("moodDraft", moodDraft);
  LS.set("moodHistory", moodHistory);

  if ($("#todayMood")) $("#todayMood").innerText = mood;
  renderMoodBars();
  suggestGentleAction(score);

  alert(lang === "ta" ? "மனநிலை சேமிக்கப்பட்டது ✅" : "Mood saved ✅");
});

// load state
if ($("#todayMood")) $("#todayMood").innerText = moodDraft.mood || "—";
if ($("#moodNote")) $("#moodNote").value = moodDraft.note || "";

// ----------------------
// Coping tabs + breathing
// ----------------------
function setTab(tab){
  $$(".tab").forEach(t => t.classList.remove("active"));
  $$(".tab-panel").forEach(p => p.classList.remove("active"));
  const tabBtn = document.querySelector(`.tab[data-tab="${tab}"]`);
  const panel = document.querySelector(`#tab-${tab}`);
  if (tabBtn) tabBtn.classList.add("active");
  if (panel) panel.classList.add("active");
}
$$(".tab").forEach(t => t.addEventListener("click", () => setTab(t.dataset.tab)));

let breathTimer = null;
const breathCircle = $("#breathCircle");

const phasesEN = [
  { label: "Inhale", scale: 1.15 },
  { label: "Hold", scale: 1.15 },
  { label: "Exhale", scale: 0.92 },
  { label: "Hold", scale: 0.92 }
];
const phasesTA = [
  { label: "உள்ளிழுக்கு", scale: 1.15 },
  { label: "பிடி", scale: 1.15 },
  { label: "வெளியேற்று", scale: 0.92 },
  { label: "பிடி", scale: 0.92 }
];

let phaseIndex = 0;

function startBreathing(){
  stopBreathing();
  phaseIndex = 0;

  const phases = (lang === "ta") ? phasesTA : phasesEN;

  const step = () => {
    const p = phases[phaseIndex];
    if (breathCircle) {
      breathCircle.textContent = p.label;
      breathCircle.style.transform = `scale(${p.scale})`;
    }
    phaseIndex = (phaseIndex + 1) % phases.length;
  };

  step();
  breathTimer = setInterval(step, 4000);
}
function stopBreathing(){
  if(breathTimer) clearInterval(breathTimer);
  breathTimer = null;
  if (breathCircle) {
    breathCircle.textContent = (lang === "ta") ? "உள்ளிழுக்கு" : "Inhale";
    breathCircle.style.transform = "scale(1)";
  }
}

if ($("#startBreath")) $("#startBreath").addEventListener("click", startBreathing);
if ($("#stopBreath")) $("#stopBreath").addEventListener("click", stopBreathing);
if ($("#groundDone")) $("#groundDone").addEventListener("click", () => alert(lang === "ta" ? "நன்றாக செய்தீர்கள் ✅" : "Nice. You did it ✅"));

// ----------------------
// Music player
// ----------------------
const audio = $("#audio");

function playTrack(src){
  if (!audio) return;
  audio.pause();
  audio.currentTime = 0;
  audio.src = src;
  audio.play().catch(() => {
    alert(lang === "ta"
      ? "ஒருமுறை ஆடியோ ப்ளே பட்டனை கிளிக் செய்யுங்கள் (browser autoplay-ஐ தடை செய்கிறது)."
      : "Click play on the audio controls once (browser blocks autoplay)."
    );
  });
}

$$(".track").forEach(btn => {
  btn.addEventListener("click", () => playTrack(btn.dataset.src));
});

if ($("#volUp")) $("#volUp").addEventListener("click", () => { if(audio) audio.volume = Math.min(1, audio.volume + 0.1); });
if ($("#volDown")) $("#volDown").addEventListener("click", () => { if(audio) audio.volume = Math.max(0, audio.volume - 0.1); });

function updateLoopLabel(){
  const lt = $("#loopToggle");
  if (!lt || !audio) return;
  if (audio.loop) lt.textContent = (lang === "ta") ? dict.ta.loopOn : dict.en.loopOn;
  else lt.textContent = (lang === "ta") ? dict.ta.loop : dict.en.loop;
}

if ($("#loopToggle")) $("#loopToggle").addEventListener("click", () => {
  if (!audio) return;
  audio.loop = !audio.loop;
  updateLoopLabel();
});
updateLoopLabel();

// ----------------------
// Goals + progress
// ----------------------
let goals = LS.get("goals", [
  { text:"Drink water", done:false },
  { text:"Stand near sunlight", done:false },
  { text:"Reply to one message", done:false }
]);

function renderGoals(){
  const ul = $("#goalList");
  if (!ul) return;
  ul.innerHTML = "";

  goals.forEach((g, idx) => {
    const li = document.createElement("li");
    li.className = "row between";
    li.style.padding = "10px 0";
    li.style.borderBottom = "1px solid rgba(255,255,255,0.08)";

    const left = document.createElement("div");
    left.className = "row";
    left.style.gap = "10px";

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = g.done;
    cb.addEventListener("change", () => {
      goals[idx].done = cb.checked;
      LS.set("goals", goals);
      updateProgress();
    });

    const t = document.createElement("div");
    t.textContent = g.text; // (user-created goals stay as typed)

    left.appendChild(cb);
    left.appendChild(t);

    const del = document.createElement("button");
    del.className = "btn";
    del.textContent = "🗑";
    del.addEventListener("click", () => {
      goals.splice(idx, 1);
      LS.set("goals", goals);
      renderGoals();
      updateProgress();
    });

    li.appendChild(left);
    li.appendChild(del);
    ul.appendChild(li);
  });
}
renderGoals();

if ($("#addGoal")) $("#addGoal").addEventListener("click", () => {
  const input = $("#goalInput");
  const val = input ? input.value.trim() : "";
  if(!val) return;
  goals.push({ text: val, done:false });
  if (input) input.value = "";
  LS.set("goals", goals);
  renderGoals();
  updateProgress();
});

function calcGoalPercent(){
  if(!goals.length) return 0;
  const done = goals.filter(g => g.done).length;
  return Math.round((done / goals.length) * 100);
}
function updateProgress(){
  if ($("#goalPercent")) $("#goalPercent").innerText = calcGoalPercent() + "%";
}
updateProgress();

// ----------------------
// Journal
// ----------------------
let journalEntries = LS.get("journalEntries", []);
const journalText = $("#journalText");

function escapeHtml(str){
  return str.replace(/[&<>"']/g, (m) => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;"
  }[m]));
}

function renderJournal(){
  if ($("#journalCount")) $("#journalCount").innerText = String(journalEntries.length);

  const ul = $("#journalEntries");
  if (!ul) return;
  ul.innerHTML = "";

  journalEntries.slice().reverse().forEach((entry, revIdx) => {
    const idx = journalEntries.length - 1 - revIdx;

    const li = document.createElement("li");
    li.className = "row between";
    li.style.padding = "10px 0";
    li.style.borderBottom = "1px solid rgba(255,255,255,0.08)";

    const left = document.createElement("div");
    left.innerHTML = `<div>${escapeHtml(entry.text.slice(0, 90))}${entry.text.length>90 ? "…" : ""}</div>
                      <div class="small muted">${new Date(entry.ts).toLocaleString()}</div>`;

    const del = document.createElement("button");
    del.className = "btn";
    del.textContent = "🗑";
    del.addEventListener("click", () => {
      journalEntries.splice(idx, 1);
      LS.set("journalEntries", journalEntries);
      renderJournal();
    });

    li.appendChild(left);
    li.appendChild(del);
    ul.appendChild(li);
  });
}
renderJournal();

if ($("#saveJournal")) $("#saveJournal").addEventListener("click", () => {
  const text = journalText ? journalText.value.trim() : "";
  if(!text) return;
  journalEntries.push({ text, ts: Date.now() });
  LS.set("journalEntries", journalEntries);
  if (journalText) journalText.value = "";
  renderJournal();
  alert(lang === "ta" ? "சேமிக்கப்பட்டது ✅" : "Saved ✅");
});
if ($("#clearJournal")) $("#clearJournal").addEventListener("click", () => { if (journalText) journalText.value = ""; });

// ----------------------
// Med reminders
// ----------------------
let meds = LS.get("meds", []);
function renderMeds(){
  const ul = $("#medList");
  if (!ul) return;
  ul.innerHTML = "";

  meds.forEach((m, idx) => {
    const li = document.createElement("li");
    li.className = "row between";
    li.style.padding = "10px 0";
    li.style.borderBottom = "1px solid rgba(255,255,255,0.08)";

    const left = document.createElement("div");
    left.innerHTML = `<div>${escapeHtml(m.name)} <span class="small muted">(${m.time})</span></div>`;

    const del = document.createElement("button");
    del.className = "btn";
    del.textContent = "🗑";
    del.addEventListener("click", () => {
      meds.splice(idx, 1);
      LS.set("meds", meds);
      renderMeds();
    });

    li.appendChild(left);
    li.appendChild(del);
    ul.appendChild(li);
  });
}
renderMeds();

if ($("#addMed")) $("#addMed").addEventListener("click", () => {
  const name = $("#medName") ? $("#medName").value.trim() : "";
  const time = $("#medTime") ? $("#medTime").value : "";
  if(!name || !time) return;
  meds.push({ name, time });
  if ($("#medName")) $("#medName").value = "";
  if ($("#medTime")) $("#medTime").value = "";
  LS.set("meds", meds);
  renderMeds();
});

// ----------------------
// Community posts
// ----------------------
let posts = LS.get("posts", []);
function renderPosts(){
  const ul = $("#postList");
  if (!ul) return;
  ul.innerHTML = "";

  posts.slice().reverse().forEach((p, revIdx) => {
    const idx = posts.length - 1 - revIdx;

    const li = document.createElement("li");
    li.className = "row between";
    li.style.padding = "10px 0";
    li.style.borderBottom = "1px solid rgba(255,255,255,0.08)";

    const left = document.createElement("div");
    left.innerHTML = `<div>${escapeHtml(p.text)}</div>
                      <div class="small muted">${new Date(p.ts).toLocaleString()}</div>`;

    const del = document.createElement("button");
    del.className = "btn";
    del.textContent = "🗑";
    del.addEventListener("click", () => {
      posts.splice(idx, 1);
      LS.set("posts", posts);
      renderPosts();
    });

    li.appendChild(left);
    li.appendChild(del);
    ul.appendChild(li);
  });
}
renderPosts();

if ($("#addPost")) $("#addPost").addEventListener("click", () => {
  const text = $("#postText") ? $("#postText").value.trim() : "";
  if(!text) return;
  posts.push({ text, ts: Date.now() });
  if ($("#postText")) $("#postText").value = "";
  LS.set("posts", posts);
  renderPosts();
});

// ----------------------
// Professional support
// ----------------------
if ($("#bookBtn")) $("#bookBtn").addEventListener("click", () => {
  alert(lang === "ta"
    ? "டெமோ: தயாரிப்பில் இது சரிபார்க்கப்பட்ட நிபுணர்களுடன் இணைக்கும் ✅"
    : "Demo: In production, this would connect to verified professionals ✅"
  );
});

// ----------------------
// Emergency modal
// ----------------------
const modal = $("#modal");
if ($("#emergencyBtn")) $("#emergencyBtn").addEventListener("click", () => modal && modal.classList.add("show"));
if ($("#closeModal")) $("#closeModal").addEventListener("click", () => modal && modal.classList.remove("show"));
if (modal) modal.addEventListener("click", (e) => {
  if(e.target === modal) modal.classList.remove("show");
});

// ----------------------
// Accessibility
// ----------------------
let fontSize = LS.get("fontSize", 16);
document.documentElement.style.setProperty("--font", fontSize + "px");

if ($("#fontPlus")) $("#fontPlus").addEventListener("click", () => {
  fontSize = Math.min(20, fontSize + 1);
  document.documentElement.style.setProperty("--font", fontSize + "px");
  LS.set("fontSize", fontSize);
});
if ($("#fontMinus")) $("#fontMinus").addEventListener("click", () => {
  fontSize = Math.max(14, fontSize - 1);
  document.documentElement.style.setProperty("--font", fontSize + "px");
  LS.set("fontSize", fontSize);
});

if ($("#contrastToggle")) $("#contrastToggle").addEventListener("click", () => {
  document.body.classList.toggle("high-contrast");
});

// ----------------------
// Gentle action suggestion (EN + TA)
// ----------------------
function suggestGentleAction(score){
  const lowEN = [
    "Sit comfortably and take 3 slow breaths.",
    "Drink a glass of water.",
    "Stand near a window for 30 seconds.",
    "Text one trusted person: “Can you check on me?”"
  ];
  const midEN = [
    "Write one sentence about today.",
    "Do 2 minutes of stretching.",
    "Play a calm song for 3 minutes."
  ];
  const highEN = [
    "Plan one small task and finish it.",
    "Go for a short walk.",
    "Do a 5-minute breathing session."
  ];

  const lowTA = [
    "சௌகரியமாக அமர்ந்து 3 மெதுவான மூச்சுகள் எடுக்கவும்.",
    "ஒரு கிளாஸ் தண்ணீர் குடிக்கவும்.",
    "30 விநாடிகள் ஜன்னல் அருகில் நிற்கவும்.",
    "நம்பிக்கை உள்ள ஒருவருக்கு: “என்னை சற்று கவனிக்க முடியுமா?” என்று மெசேஜ் செய்யவும்."
  ];
  const midTA = [
    "இன்றையைப் பற்றி ஒரு வரி எழுதவும்.",
    "2 நிமிடம் இலகுவாக நீட்டிப்பு செய்யவும்.",
    "3 நிமிடம் அமைதியான இசை கேளுங்கள்."
  ];
  const highTA = [
    "ஒரு சிறிய பணியை திட்டமிட்டு முடிக்கவும்.",
    "சிறிய நடைப்பயணம் செய்யவும்.",
    "5 நிமிடம் மூச்சு பயிற்சி செய்யவும்."
  ];

  let pick;
  if (lang === "ta") {
    pick = midTA;
    if(score <= 30) pick = lowTA;
    else if(score >= 75) pick = highTA;
  } else {
    pick = midEN;
    if(score <= 30) pick = lowEN;
    else if(score >= 75) pick = highEN;
  }

  const ga = $("#gentleAction");
  if (ga) ga.textContent = pick[Math.floor(Math.random() * pick.length)];
}
suggestGentleAction(moodDraft.score || 50);

// ----------------------
// Init
// ----------------------
applyI18n();
const langBtn = $("#langToggle");
if (langBtn) langBtn.addEventListener("click", toggleLang);
