const __vite__fileDeps=["./quiz-renderer-recommendation-products-KsUoSYJJ.js","./quiz-renderer-useItemSlotDataFetcher-ac9xH1rl.js","./quiz-renderer.js","./quiz-renderer-storeFrontClient-Dh-TPIVy.js","./quiz-renderer-recommendation-card-D0WWyRM8.js","./quiz-renderer-mount-BXrM9heh.js","./quiz-renderer-has-variant-choice-Bygb1hHs.js","./quiz-renderer-quiz-renderer-messaging-C9QqZsWP.js","./quiz-renderer-variant-title-B1Oi9SHh.js","./quiz-renderer-image-processing-B3Hir3-2.js","./quiz-renderer-currency-helper-ggAAwMUm.js","./quiz-renderer-storefront-reporter-TqwI4yVH.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import { getPublicEnvironment, __vitePreload, ASSISTANT_TURN_URL, ASSISTANT_URL, loadArtifact, overPlanGate } from "./quiz-renderer.js";
import { mountQuizDocument, createQuizKernel, quizTrackingSender, readQuizRuntime, requireValue, installQuizProductEvents, quizPageSource, loadQuizCommerce, detectQuizCommerceHost, defaultRecommendationTemplate, QUIZ_ORDER_STATUS_MESSAGES, mountHtmlQuiz } from "./quiz-renderer-mount-BXrM9heh.js";
import { formatPriceWithCurrency } from "./quiz-renderer-currency-helper-ggAAwMUm.js";
import "./quiz-renderer-has-variant-choice-Bygb1hHs.js";
import "./quiz-renderer-quiz-renderer-messaging-C9QqZsWP.js";
function voiceAssetsUrl(path = "") {
  const base = getPublicEnvironment().VOICE_ASSETS_URL || "/voice/";
  return new URL(path, new URL(base.replace(/\/?$/, "/"), window.location.origin)).href;
}
function voiceWorker(path) {
  const blob = new Blob([`importScripts(${JSON.stringify(voiceAssetsUrl(path))});`], {
    type: "text/javascript"
  });
  const url = URL.createObjectURL(blob);
  const worker2 = new Worker(url);
  URL.revokeObjectURL(url);
  return worker2;
}
const VOICE_BY_LANGUAGE = {
  en: "am_puck",
  es: "em_alex",
  fr: "ff_siwis",
  hi: "hf_alpha"
};
const paradeeSpeaks = (lang) => lang in VOICE_BY_LANGUAGE;
let worker$1;
let ready;
const runs = /* @__PURE__ */ new Map();
let nextId$1 = 1;
function loadParadee() {
  ready ?? (ready = new Promise((resolve, reject) => {
    worker$1 = voiceWorker("paradee/worker.js");
    worker$1.onmessage = ({ data }) => {
      if (data.type === "ready") return resolve();
      const run = runs.get(data.id);
      if (data.type === "error" && !run) return reject(new Error(data.message));
      if (!run) return;
      if (data.type === "chunk") run.onChunk(data.audio, data.sampleRate);
      if (data.type === "done" || data.type === "error") runs.delete(data.id);
      if (data.type === "done") run.done();
      if (data.type === "error") run.fail(new Error(data.message));
    };
    worker$1.onerror = (event) => reject(new Error(event.message));
    worker$1.postMessage({ type: "load", base: voiceAssetsUrl() });
  }));
  ready.catch(() => {
    ready = void 0;
    worker$1 == null ? void 0 : worker$1.terminate();
    worker$1 = void 0;
  });
  return ready;
}
async function speakParadee(text, lang, play2, signal, onFirst) {
  await loadParadee();
  if (signal.aborted) return;
  const id = nextId$1++;
  let first = true;
  await new Promise((done, fail) => {
    runs.set(id, {
      onChunk: (pcm, rate) => {
        if (signal.aborted) return;
        const at = play2(pcm, rate);
        if (first) onFirst(at);
        first = false;
      },
      done,
      fail
    });
    signal.addEventListener("abort", () => {
      worker$1 == null ? void 0 : worker$1.postMessage({ type: "cancel", id });
      runs.delete(id);
      done();
    });
    worker$1.postMessage({ type: "speak", id, text, lang, voice: VOICE_BY_LANGUAGE[lang] });
  });
}
const COMMON = {
  en: "the and to you is of your it for this that with on can want are be have will was what how",
  es: "el la de que y en los las tu es para con por una un del lo se su al quieres puedo más",
  fr: "le la les de des et est pas une un du que pour avec vous dans sur ce qui",
  de: "der die das und ist nicht ein eine zu mit den von sie ich auf für dass",
  pt: "o a os as de que e em um uma para com não você do da é ao",
  it: "il la di che e è per non un una con del della sono gli le"
};
const WORDS = Object.fromEntries(
  Object.entries(COMMON).map(([lang, words]) => [lang, new Set(words.split(" "))])
);
let browserDetector;
function getBrowserDetector() {
  const api = globalThis.LanguageDetector;
  browserDetector ?? (browserDetector = api ? (async () => {
    var _a;
    return await ((_a = api.availability) == null ? void 0 : _a.call(api)) === "unavailable" ? void 0 : api.create();
  })().catch(
    () => void 0
  ) : Promise.resolve(void 0));
  return browserDetector;
}
function guessLanguage(text, fallback) {
  if (new RegExp("\\p{Script=Devanagari}", "u").test(text)) return "hi";
  if (/[^\p{Script=Latin}\p{N}\p{P}\p{S}\s]/u.test(text)) return fallback;
  const counts = Object.fromEntries(Object.keys(WORDS).map((lang) => [lang, 0]));
  for (const word of text.toLowerCase().match(new RegExp("\\p{L}+", "gu")) ?? [])
    for (const lang in WORDS) if (WORDS[lang].has(word)) counts[lang] += 1;
  if (/[¿¡ñ]/.test(text)) counts.es += 3;
  const [best, score] = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  return score >= 2 ? best : fallback;
}
async function detectLanguage(text, fallback) {
  const base = fallback.split("-")[0].toLowerCase();
  const detector = await getBrowserDetector();
  if (detector) {
    const [top] = await detector.detect(text).catch(() => []);
    if (top && top.confidence > 0.6) return top.detectedLanguage.split("-")[0];
  }
  return guessLanguage(text, base);
}
function markTurn(key, at = performance.now()) {
  if (key === "speechEnd") return set({ turn: { speechEnd: at, bargeInMs: state.turn.bargeInMs } });
  if (state.turn[key] != null || state.turn.speechEnd == null) return;
  if ((key === "reply" || key === "firstSound") && state.turn.sent == null) return;
  set({ turn: { ...state.turn, [key]: at } });
}
function noteBargeIn(ms) {
  set({ turn: { ...state.turn, bargeInMs: ms } });
}
let state = {
  conversation: false,
  speaking: false,
  modelStatus: "idle",
  turn: {}
};
const listeners = /* @__PURE__ */ new Set();
function set(patch) {
  state = { ...state, ...patch };
  listeners.forEach((listener) => listener());
}
const voiceStore = {
  get: () => state,
  subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }
};
function speakable(markdown) {
  return markdown.replace(/```[\s\S]*?```/g, " ").replace(/<[^>]+>/g, " ").replace(/!\[[^\]]*\]\([^)]*\)/g, " ").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/https?:\/\/\S+/g, " ").replace(/`([^`]*)`/g, "$1").replace(/^\s{0,3}#{1,6}\s+/gm, "").replace(
    /^\s*(?:[-*+]|\d+[.)])\s+(.*?)\s*$/gm,
    (_, item) => /[.!?:;,]$/.test(item) ? item : `${item}.`
  ).replace(/[*_~|>]+/g, " ").replace(/\s*\n+\s*/g, (gap) => /\n\s*\n/.test(gap) ? ". " : " ").replace(/([.!?])\s*\.\s/g, "$1 ").replace(/\s+/g, " ").trim();
}
const ABBREVIATIONS = /(?:\b(?:mr|mrs|ms|dr|prof|sr|jr|st|vs|etc|no|inc|ltd|co|e\.g|i\.e|a\.m|p\.m)|\b[A-Z])\.$/i;
function sentences(text) {
  const parts = [];
  let current2 = "";
  for (const piece of text.split(new RegExp(`(?<=[.!?…:]["')\\]]?)\\s+(?=["'(¿¡[]?[\\p{Lu}0-9])`, "u"))) {
    current2 = current2 ? `${current2} ${piece}` : piece;
    if (!ABBREVIATIONS.test(current2)) {
      parts.push(current2);
      current2 = "";
    }
  }
  if (current2) parts.push(current2);
  return parts.filter((part) => /[\p{L}\p{N}]/u.test(part)).map((part) => /[.!?…,;:]["'”’)\]»]*$/.test(part) ? part : `${part}.`);
}
let audio$1;
const LEAD = 0.05;
let nextStart = 0;
const sources = /* @__PURE__ */ new Set();
function context() {
  audio$1 ?? (audio$1 = new AudioContext());
  if (audio$1.state !== "running") void audio$1.resume().catch(() => {
  });
  return audio$1;
}
let generation = 0;
function play(samples, rate) {
  const ctx = context();
  const buffer = ctx.createBuffer(1, samples.length, rate);
  buffer.getChannelData(0).set(samples);
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(ctx.destination);
  const when = Math.max(nextStart, ctx.currentTime + LEAD);
  source.start(when);
  nextStart = when + samples.length / rate;
  sources.add(source);
  source.onended = () => {
    sources.delete(source);
    settle();
  };
  return when;
}
let current;
function speakReply(text, lang, requested) {
  const run = new AbortController();
  current = run;
  settle();
  speakParadee(text, lang, play, run.signal, (when) => {
    const ctx = context();
    const at = performance.now() + (when - ctx.currentTime) * 1e3;
    const ms = Math.round(at - requested);
    console.info(`[voice] paradee (${lang}) first sound after ${ms} ms`);
    set({ lastFirstSoundMs: ms });
    markTurn("firstSound", at);
  }).catch((error) => {
    if (!run.signal.aborted) console.warn("[voice] paradee failed", error);
  }).finally(() => {
    if (current === run) current = void 0;
    if (!run.signal.aborted) startNextReply();
  });
}
const replies = [];
function busy() {
  return !!current || sources.size > 0;
}
function settle() {
  const speaking = busy() || replies.length > 0;
  if (speaking !== state.speaking) set({ speaking });
}
function startNextReply() {
  if (current) return settle();
  const reply = replies.shift();
  if (!reply) return settle();
  const parts = sentences(speakable(reply.text));
  if (!parts.length) return startNextReply();
  const mine = generation;
  current = new AbortController();
  settle();
  void detectLanguage(parts.join(" "), reply.lang).then((lang) => {
    if (generation !== mine) return;
    current = void 0;
    set({ lastLanguage: lang });
    if (paradeeSpeaks(lang)) return speakReply(parts.join(" "), lang, reply.requested);
    console.info(`[voice] no voice for ${lang}: not read aloud`);
    startNextReply();
  });
}
function speak(text, lang = "en-US") {
  if (typeof window === "undefined") return;
  replies.push({ text, lang, requested: performance.now() });
  markTurn("reply");
  startNextReply();
}
function stopSpeaking() {
  generation += 1;
  replies.length = 0;
  current == null ? void 0 : current.abort();
  current = void 0;
  for (const source of sources) {
    source.onended = null;
    try {
      source.stop();
    } catch {
    }
  }
  sources.clear();
  nextStart = 0;
  settle();
}
function readsAloud() {
  return state.conversation;
}
function setVoice(patch) {
  set(patch);
  if (!readsAloud()) stopSpeaking();
  if (readsAloud()) {
    context();
    preloadVoice();
  }
}
function preloadVoice() {
  if (!readsAloud() || state.modelStatus === "ready" || state.modelStatus === "loading") return;
  set({ modelStatus: "loading" });
  loadParadee().then(() => set({ modelStatus: "ready" })).catch(() => set({ modelStatus: "error" }));
}
function unlockAudio() {
  if (readsAloud()) context();
}
const LANGUAGES = ["en", "es"];
const moonshineHears = (lang) => LANGUAGES.includes(lang.slice(0, 2).toLowerCase());
let worker;
let loaded;
const pending = /* @__PURE__ */ new Map();
let nextId = 1;
function loadMoonshine(lang) {
  lang = lang.slice(0, 2).toLowerCase();
  if ((loaded == null ? void 0 : loaded.lang) === lang) return loaded.ready;
  worker == null ? void 0 : worker.terminate();
  const w = voiceWorker("moonshine/worker.js");
  worker = w;
  const ready2 = new Promise((resolve, reject) => {
    w.onmessage = ({ data }) => {
      if (data.type === "ready") return resolve();
      const run = pending.get(data.id);
      if (data.type === "error" && !run) return reject(new Error(data.message));
      if (!run) return;
      pending.delete(data.id);
      if (data.type === "text") run.resolve(data.text);
      else run.reject(new Error(data.message));
    };
    w.onerror = (event) => reject(new Error(event.message));
    w.postMessage({ type: "load", lang, base: voiceAssetsUrl() });
  });
  const current2 = { lang, ready: ready2 };
  loaded = current2;
  ready2.catch(() => {
    if (loaded === current2) loaded = void 0;
  });
  return ready2;
}
async function transcribe(audio2, lang) {
  await loadMoonshine(lang);
  const id = nextId++;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    worker.postMessage({ type: "transcribe", id, audio: audio2 }, [audio2.buffer]);
  });
}
const LIVE_EVERY_MS = 700;
function startDictation(options) {
  let stopped = false;
  let vad;
  let finalText = "";
  let speaking = null;
  let liveBusy = false;
  let chain = Promise.resolve();
  const addFinal = (audio2) => chain = chain.then(async () => {
    const text = await transcribe(audio2, options.lang).catch(() => "");
    if (text) finalText = join(finalText, text);
    options.onText(finalText, "");
  });
  const live = setInterval(async () => {
    if (!speaking || liveBusy || speaking.length < 20) return;
    liveBusy = true;
    const text = await transcribe(concat$1(speaking), options.lang).catch(() => "");
    liveBusy = false;
    if (speaking && !stopped) options.onText(finalText, text);
  }, LIVE_EVERY_MS);
  let stream;
  const ready2 = (async () => {
    try {
      const [{ MicVAD }] = await Promise.all([
        __vitePreload(() => import("./quiz-renderer-no-voice-DyVA6vUM.js"), true ? [] : void 0, import.meta.url),
        loadMoonshine(options.lang)
      ]);
      if (stopped) return;
      const micVad = await MicVAD.new({
        model: "v5",
        positiveSpeechThreshold: 0.5,
        negativeSpeechThreshold: 0.35,
        minSpeechMs: 96,
        // A breath between phrases isn't the end of a stretch.
        redemptionMs: 500,
        preSpeechPadMs: 200,
        baseAssetPath: voiceAssetsUrl("vad/"),
        onnxWASMBasePath: voiceAssetsUrl("ort/"),
        startOnLoad: true,
        getStream: async () => stream = await navigator.mediaDevices.getUserMedia({
          audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true }
        }),
        onSpeechStart: () => {
          speaking = [];
        },
        onFrameProcessed: (_probs, frame) => {
          speaking == null ? void 0 : speaking.push(frame.slice());
        },
        onVADMisfire: () => {
          speaking = null;
        },
        onSpeechEnd: (audio2) => {
          speaking = null;
          if (!stopped) void addFinal(audio2);
        }
      });
      if (stopped) return void micVad.destroy();
      vad = micVad;
      if (stream) options.onListening(stream);
    } catch (error) {
      stream == null ? void 0 : stream.getTracks().forEach((track) => track.stop());
      console.warn("[voice] dictation failed to start", error);
      options.onError(
        error instanceof DOMException && error.name === "NotAllowedError" ? "denied" : "failed"
      );
      stopped = true;
      clearInterval(live);
    }
  })();
  return {
    async stop() {
      stopped = true;
      clearInterval(live);
      await ready2;
      const rest = speaking ? concat$1(speaking) : null;
      speaking = null;
      await (vad == null ? void 0 : vad.destroy());
      if (rest && rest.length > 3200) await addFinal(rest);
      await chain;
      return finalText;
    }
  };
}
function join(a, b) {
  return a && b ? `${a} ${b}` : a || b;
}
function concat$1(parts) {
  const out = new Float32Array(parts.reduce((n, p) => n + p.length, 0));
  let at = 0;
  for (const p of parts) {
    out.set(p, at);
    at += p.length;
  }
  return out;
}
let audio;
function tones(notes, { gain = 0.12, step = 0.1, length = 0.12 } = {}) {
  if (typeof window === "undefined") return;
  audio ?? (audio = new AudioContext());
  void audio.resume();
  const t0 = audio.currentTime + 0.01;
  notes.forEach((frequency, i) => {
    const at = t0 + i * step;
    const osc = audio.createOscillator();
    const volume = audio.createGain();
    osc.type = "sine";
    osc.frequency.value = frequency;
    volume.gain.setValueAtTime(0, at);
    volume.gain.linearRampToValueAtTime(gain, at + 0.01);
    volume.gain.exponentialRampToValueAtTime(1e-3, at + length - 0.01);
    osc.connect(volume).connect(audio.destination);
    osc.start(at);
    osc.stop(at + length);
  });
}
const CHIMES = { start: [660, 880], stop: [880, 660] };
function chime(kind) {
  tones(CHIMES[kind]);
}
const VAD = {
  model: "v5",
  positiveSpeechThreshold: 0.5,
  negativeSpeechThreshold: 0.35,
  minSpeechMs: 96,
  redemptionMs: 200,
  preSpeechPadMs: 200
};
const MAX_QUIET_MS = 3e3;
function startCall(options) {
  let stopped = false;
  let vad;
  let stream;
  let smartTurn;
  let segments = [];
  let speechStartAt = 0;
  let giveUp;
  async function open() {
    var _a, _b;
    try {
      const [{ MicVAD }, { SmartTurn }, { setSmartTurnOptions }] = await Promise.all([
        __vitePreload(() => import("./quiz-renderer-no-voice-DyVA6vUM.js"), true ? [] : void 0, import.meta.url),
        __vitePreload(() => import("./quiz-renderer-no-voice-DyVA6vUM.js"), true ? [] : void 0, import.meta.url),
        __vitePreload(() => import("./quiz-renderer-no-voice-DyVA6vUM.js"), true ? [] : void 0, import.meta.url)
      ]);
      if (stopped) return;
      const wasm = voiceAssetsUrl("ort/");
      setSmartTurnOptions({
        model: voiceAssetsUrl("turn/assets/smart-turn-v3.2-cpu.onnx"),
        executionProvider: "wasm",
        wasmPath: wasm
      });
      const turn = new SmartTurn();
      smartTurn = turn;
      await Promise.all([turn.load(), loadMoonshine(options.lang)]);
      if (stopped) return release();
      const micVad = await MicVAD.new({
        ...VAD,
        // vad-web's own constraints (echo cancellation on, see the echo test), on the chosen mic.
        getStream: async () => stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            channelCount: 1,
            echoCancellation: true,
            autoGainControl: true,
            noiseSuppression: true,
            ...options.deviceId ? { deviceId: { exact: options.deviceId } } : {}
          }
        }),
        baseAssetPath: voiceAssetsUrl("vad/"),
        onnxWASMBasePath: wasm,
        startOnLoad: true,
        onSpeechStart: () => {
          speechStartAt = performance.now();
          clearTimeout(giveUp);
        },
        // ~96 ms of speech: a real start, not a click.
        onSpeechRealStart: () => {
          if (!voiceStore.get().speaking) return;
          stopSpeaking();
          const ms = Math.round(performance.now() - speechStartAt);
          noteBargeIn(ms);
          console.info(`[voice] barge-in: voice stopped ${ms} ms after speech started`);
        },
        onSpeechEnd: (audio2) => {
          if (stopped) return;
          markTurn("speechEnd", performance.now() - VAD.redemptionMs);
          segments.push(audio2);
          void decide(turn);
        }
      });
      vad = micVad;
      if (stopped) return release();
      console.info("[voice] conversation: listening");
      if (stream) (_a = options.onListening) == null ? void 0 : _a.call(options, stream);
    } catch (error) {
      console.warn("[voice] conversation failed to start", error);
      const denied = error instanceof DOMException && error.name === "NotAllowedError";
      if (!stopped) (_b = options.onError) == null ? void 0 : _b.call(options, denied ? "denied" : "failed");
      stop();
      release();
    }
  }
  async function decide(smartTurn2) {
    const audio2 = concat(segments);
    const { complete, probability, duration } = await smartTurn2.predictOnce(audio2);
    console.info(
      `[voice] turn ${complete ? "over" : "goes on"} (p=${probability.toFixed(2)}, ${duration} ms)`
    );
    if (stopped) return;
    if (complete) return finish(audio2);
    clearTimeout(giveUp);
    giveUp = setTimeout(() => {
      console.info("[voice] turn over after 3 s of quiet");
      void finish(concat(segments));
    }, MAX_QUIET_MS);
  }
  async function finish(audio2) {
    clearTimeout(giveUp);
    segments = [];
    markTurn("decided");
    const started = performance.now();
    const text = await transcribe(audio2, options.lang).catch((error) => {
      console.warn("[voice] speech to text failed", error);
      return "";
    });
    markTurn("words");
    console.info(`[voice] heard in ${Math.round(performance.now() - started)} ms: "${text}"`);
    if (stopped || !text) return;
    markTurn("sent");
    options.onTurn(text);
  }
  function stop() {
    if (stopped) return;
    stopped = true;
    clearTimeout(giveUp);
    release();
  }
  function release() {
    void (vad == null ? void 0 : vad.destroy());
    stream == null ? void 0 : stream.getTracks().forEach((track) => track.stop());
    void (smartTurn == null ? void 0 : smartTurn.release());
    vad = stream = smartTurn = void 0;
  }
  void open();
  return stop;
}
function concat(parts) {
  const out = new Float32Array(parts.reduce((n, p) => n + p.length, 0));
  let at = 0;
  for (const p of parts) {
    out.set(p, at);
    at += p.length;
  }
  return out;
}
function micAllowed() {
  if (typeof document === "undefined") return false;
  if (document.documentElement.dataset.viewAs === "shopify") return false;
  const policy = document.featurePolicy;
  return (policy == null ? void 0 : policy.allowsFeature("microphone")) !== false;
}
const ASSISTANT_CSS = `@layer base {
  section[part="assistant"]:not([role]) { box-sizing: border-box; width: 100%; padding: 24px; max-width: 768px; }
  [part~="assistant"][role="log"], form[part~="assistant"], [part~="assistant"][role="alert"] { display: flex; flex-direction: column; gap: 16px; min-width: 0; }
  [part~="assistant"][hidden] { display: none !important; }
  form[part~="assistant"] { margin: 0; }
  p[part~="assistant"] { margin: 0; width: 100%; line-height: 1.6; white-space: pre-wrap; overflow-wrap: anywhere; }
  form[part~="assistant"]:not([role]) { gap: 8px; }
  form[part~="assistant"]:not([role]) > button { justify-content: start; gap: 12px; text-align: start; background: var(--secondary); color: var(--secondary-foreground); border-color: var(--border); }
  [part~="assistant"][role="alert"]:not(:empty) { margin-top: 16px; color: var(--destructive); }
  label[part~="assistant"] { display: flex; flex-direction: column; gap: 8px; width: 100%; min-width: 0; }
  label[part~="assistant"] > input[part~="assistant"] { box-sizing: border-box; width: 100%; min-width: 0; }
  button[part~="assistant"] { max-width: 100%; white-space: normal; overflow-wrap: anywhere; }
  button[part~="assistant"] > img[part~="assistant"] { width: 48px; height: 48px; object-fit: cover; }
  form[part~="assistant"][role="search"] { position: relative; flex-direction: row; align-items: end; gap: 8px; margin-top: 24px; }
  form[part~="assistant"][role="search"] > label { flex: 1; }
  form[part~="assistant"][role="search"] > button { flex: none; white-space: nowrap; padding-inline: 16px; }
  form[part~="assistant"][role="search"] > button[part~="assistant-voice"] { padding-inline: 10px; }
  form[part~="assistant"][role="search"] > button[part~="assistant-voice"]:not([part~="assistant-call-start"]) { background: transparent; color: inherit; border-color: color-mix(in srgb, var(--foreground) 15%, var(--background)); }
  [part~="assistant-voice"] svg { width: 18px; height: 18px; display: block; }
  [part~="assistant-voice"][aria-pressed="true"] { color: var(--primary); }
  [part~="assistant-call"] { flex: 1; min-height: 0; display: flex; flex-direction: column; }
  [part~="assistant-call-status"] { display: grid; justify-items: center; gap: 8px; padding: 24px; color: var(--muted-foreground); font-size: 12px; }
  [part~="assistant-call-mark"] { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 50%; background: var(--secondary); color: var(--primary); animation: assistant-busy 1s ease-in-out infinite alternate; }
  [part~="assistant-call-status"][data-state="muted"] [part~="assistant-call-mark"] { animation: none; }
  [part~="assistant-call-cards"] { flex: 1; min-height: 0; overflow: auto; padding: 16px 26px; }
  [part~="assistant-call-cards"] [part~="assistant-feedback"], [part~="assistant-call-cards"] [part~="assistant-why"] { display: none; }
  [part~="assistant-call-actions"] { display: flex; justify-content: center; gap: 16px; padding: 16px; border-top: 1px solid color-mix(in srgb, var(--foreground) 15%, var(--background)); }
  [part~="assistant-call-actions"] button { display: flex; align-items: center; gap: 8px; }
  [part~="assistant-call-time"], [part~="assistant-call-summary"] { font-size: 12px; color: var(--muted-foreground); }
  [part~="assistant-call-summary"] { margin-block: 12px; }
  @media (prefers-reduced-motion: reduce) { [part~="assistant-call-mark"] { animation: none; } }
  p[part~="assistant"][tabindex="-1"]:focus { outline: none; }
  [part~="assistant-typing"] { display: flex; gap: 5px; }
  [part~="assistant-typing"] > span { width: 6px; height: 6px; border-radius: 50%; background: var(--primary); animation: assistant-busy 1s ease-in-out infinite alternate; }
  [part~="assistant-typing"] > span:nth-child(2) { animation-delay: .2s; }
  [part~="assistant-typing"] > span:nth-child(3) { animation-delay: .4s; }
  @keyframes assistant-busy { to { opacity: .3; } }
  @media (prefers-reduced-motion: reduce) { [part~="assistant-typing"] > span { animation: none; } }
  @media (max-width: 480px) { section[part="assistant"]:not([role]) { padding: 16px; } }
  [part~="assistant-message"] { display: flex; flex-direction: column; align-items: flex-start; gap: 6px; margin-bottom: 18px; min-width: 0; }
  [part~="assistant-bubble"] { width: auto; max-width: 86%; padding: 13px 16px; border-radius: 3px 15px 15px; background: var(--secondary); color: var(--secondary-foreground); text-align: start; font-size: 15px; line-height: 1.5; }
  [part~="assistant-slot"] { width: 100%; min-width: 0; }
  [part~="assistant-reason"] { margin: 0 0 8px; white-space: pre-wrap; overflow-wrap: anywhere; }
  [part~="assistant-message"][data-state="shopper"] { align-items: flex-end; }
  [data-state="shopper"] > [part~="assistant-bubble"] { background: var(--primary); color: var(--primary-foreground); border-radius: 15px 3px 15px 15px; border: 0; }
  [part~="assistant-message"] > small { font-size: 11px; color: var(--muted-foreground); }
  button[part~="assistant-reask"] { all: unset; display: block; max-width: 86%; cursor: pointer; }
  button[part~="assistant-reask"] > [part~="assistant-bubble"] { max-width: none; }
  [part~="assistant-picks"] { width: 100%; }
  [part~="assistant-feedback"] { display: flex; align-items: center; gap: 0; margin: -2px 0 0 -6px; color: #8a8a8a; font-size: 12px; line-height: 16px; }
  button[part~="assistant-thumb"] { display: inline-grid; place-items: center; width: 28px; height: 28px; min-height: 0; padding: 0; border: 0; border-radius: 6px; background: transparent; color: #8a8a8a; cursor: pointer; }
  button[part~="assistant-thumb"][part~="assistant"]:not(:disabled):hover, button[part~="assistant-thumb"][aria-pressed="true"] { background: #f5f5f5; color: #8a8a8a; }
  [part~="assistant-thumb"] svg { width: 16px; height: 16px; }
  [part~="assistant-feedback"] [role="status"] { margin-inline-start: 4px; }
  @media (hover: hover) {
    [part~="assistant-feedback"] { opacity: 0; }
    [part~="assistant-message"]:hover [part~="assistant-feedback"], [part~="assistant-message"]:focus-within [part~="assistant-feedback"], [part~="assistant-feedback"][data-selected] { opacity: 1; }
  }
  form[part~="assistant-feedback-form"] { width: 100%; padding: 12px; border: 1px solid #e5e5e5; border-radius: 12px; background: #fff; font-size: 14px; line-height: 20px; }
  [part~="assistant-feedback-form"] label { display: block; }
  [part~="assistant-feedback-form"] label span { color: #8a8a8a; }
  [part~="assistant-feedback-form"] textarea { display: block; box-sizing: border-box; width: 100%; min-height: 64px; margin-top: 8px; padding: 10px 12px; border: 1px solid var(--border); border-radius: 4px; background: #fff; color: inherit; font: inherit; resize: vertical; }
  [part~="assistant-feedback-form"] textarea:focus { border-color: var(--assistant-accent, var(--primary)); outline: none; box-shadow: 0 0 0 1px var(--assistant-accent, var(--primary)); }
  [part~="assistant-feedback-actions"] { display: flex; justify-content: flex-end; gap: 8px; margin-top: 2px; }
  [part~="assistant-feedback-actions"] button { height: 36px; min-height: 0; padding: 0 14px; border: 0; border-radius: 4px; background: transparent; color: #525252; font-size: 14px; }
  [part~="assistant-feedback-actions"] button[type="submit"] { background: var(--assistant-accent, var(--primary)); color: #fff; }
  @media (hover: none) { button[part~="assistant-thumb"] { width: 32px; height: 32px; } [part~="assistant-feedback"] { margin-inline-start: -8px; } }
  [part~="assistant-cart-status"] { min-height: 1.4em; margin: 4px 0 0; font-size: 12px; }
  [part~="assistant-pick-card"] [part~="assistant-cart-status"]:empty { display: none; }
  [part~="assistant-why"] { font: 12px/16px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #8a8a8a; margin: 4px 0 0; }
  [part~="assistant-why"] { order: 10; }
  :host([assistant="chat"]) { --assistant-radius: 12px; }
  :host([side="left"]) { --assistant-align: flex-start; --assistant-slide: -100%; }
  :host([assistant="chat"]) section[part="assistant"]:not([role]) { max-width: 840px; margin-inline: auto; height: min(820px, 100dvh); min-height: 360px; padding: 0; display: flex; flex-direction: column; background: var(--background); border: 1px solid var(--border); }
  :host([assistant="chat"]) form[role="search"] > label { font-size: 0; gap: 0; }
  :host([assistant="chat"]) form[role="search"] input { font-size: 14px; }
  :host([assistant="chat"]) [part~="assistant-close"] { position: absolute; top: 12px; right: 12px; border: 0; background: transparent; color: inherit; padding: 8px; cursor: pointer; font-size: 20px; line-height: 1; }
  :host([assistant="chat"]) section[part="assistant"]:not([role]) { position: relative; }
  :host([assistant="chat"]) section[part="assistant"]:not([role]) > header { padding-inline-end: 56px; }
  :host([placement="bubble"]), :host([placement="sidebar"]) { position: var(--assistant-position, fixed); inset: 0; width: 100%; height: 100%; z-index: 98; pointer-events: none; container-type: size; background: transparent; }
  :host([placement="bubble"]) [part~="body"], :host([placement="sidebar"]) [part~="body"] { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: var(--assistant-align, flex-end); justify-content: flex-end; background: transparent; }
  :host([placement="bubble"]) section[part="assistant"]:not([role]) { width: min(380px, calc(100% - 32px)); height: calc(100% - 120px); max-height: 700px; margin: 0 16px 84px; border-radius: var(--assistant-radius); box-shadow: 0 12px 32px rgb(0 0 0 / 12%); }
  :host([placement="sidebar"]) section[part="assistant"]:not([role]) { width: min(420px, calc(100% - 28px)); height: 100%; margin: 0; border-radius: 0; transform: translateX(0); transition: transform 180ms ease-out; }
  :host([placement="bubble"]) section[part="assistant"]:not([role]), :host([placement="sidebar"]) section[part="assistant"]:not([role]) { min-height: 0; pointer-events: auto; overflow: hidden; }
  :host([placement="bubble"]:not([open])) section[part="assistant"]:not([role]) { visibility: hidden; pointer-events: none; }
  :host([placement="sidebar"]:not([open])) section[part="assistant"]:not([role]) { visibility: hidden; pointer-events: none; transform: translateX(var(--assistant-slide, 100%)); }
  [part~="assistant-launcher"] { position: absolute; bottom: 16px; margin-inline: 16px; pointer-events: auto; cursor: pointer; }
  :host([placement="sidebar"][open]) [part~="assistant-launcher"], :host([placement="inline"]) [part~="assistant-launcher"], :host([placement="inline"]) [part~="assistant-close"] { display: none; }
  :host([placement="inline"]) [part~="assistant-picks"] { max-width: 400px; }
  :host([placement="inline"]) section[part="assistant"]:not([role]) { height: min(520px, 100dvh); border-radius: var(--assistant-radius); overflow: hidden; }
  @media (max-width: 480px) { :host([placement="bubble"]) section[part="assistant"]:not([role]) { width: 100%; height: calc(100% - 28px); max-height: none; margin: 0; border-radius: 0; } :host([placement="bubble"][open]) [part~="assistant-launcher"] { display: none; } }
  @media (prefers-reduced-motion: reduce) { :host([placement="sidebar"]) section[part="assistant"]:not([role]) { transition: none; } }
  [part~="assistant"][tabindex="-1"]:focus { outline: none; }
  [part~="assistant-pick-grid"] { display: grid; grid-template-columns: minmax(0, 1fr); gap: 28px; margin-top: 10px; }
  [part~="assistant-pick-pair"] { display: flex; flex-direction: column; align-items: flex-start; gap: 8px; min-width: 0; }
  [part~="assistant-pick-card"] { width: 100%; }
  form[part~="assistant-choices"] { flex-direction: row; flex-wrap: wrap; gap: 8px; margin-top: 4px; max-width: 100%; }
  form[part~="assistant-choices"] > button { width: auto; min-height: 44px; }
  form[part~="assistant-choices"][data-state="select"] { flex-direction: column; align-items: stretch; min-width: min(240px, 100%); border: 1px solid var(--border); border-radius: 10px; padding: 9px 12px; }
  form[part~="assistant-choices"] > label:has(input[type="checkbox"], input[type="radio"]) { flex-direction: row; align-items: center; padding: 9px 0; }
  form[part~="assistant-choices"] input[type="checkbox"], form[part~="assistant-choices"] input[type="radio"] { width: 17px; height: 17px; flex: none; accent-color: var(--primary); }
  form[part~="assistant-choices"] > button[type="submit"] { justify-content: center; background: var(--primary); color: var(--primary-foreground); white-space: nowrap; }
  :host([assistant="chat"]) form[part~="assistant-choices"] > button { border-radius: 9px; padding: 11px 15px; }
  :host([assistant="chat"]) form[part~="assistant-choices"] > button[type="button"] { background: var(--background); color: var(--foreground); }
  :host([assistant="chat"]) [part~="assistant-message"] { margin-bottom: 12px; }
  :host([assistant="chat"]) [data-state="assistant"] > [part~="assistant-bubble"], :host([assistant="chat"]) [part~="assistant-bubble"][data-state="assistant"] { background: color-mix(in srgb, var(--foreground) 6%, var(--background)); }
  :host([assistant="chat"]) form[part~="assistant"][role="search"] input { background: var(--background); }
  :host([assistant="chat"]) [part~="assistant"][role="log"] { flex: 1; overflow: auto; overscroll-behavior: contain; padding: 26px; display: block; }
  :host([assistant="chat"]) form[part~="assistant"][role="search"] { flex: none; margin: 0; padding: 16px 26px; border-top: 1px solid var(--border); background: var(--background); }
  :host([assistant="chat"]) section[part="assistant"]:not([role]), :host([assistant="chat"]) form[part~="assistant"][role="search"], :host([assistant="chat"]) input[part~="assistant"], :host([assistant="chat"]) form[part~="assistant-choices"][data-state="select"], :host([assistant="chat"]) form[part~="assistant-choices"] > button[type="button"] { border-color: color-mix(in srgb, var(--foreground) 15%, var(--background)); }
  :host([assistant="chat"]) [part~="assistant"][role="alert"]:not(:empty) { padding: 0 26px 16px; margin: 0; }
  @media (max-width: 480px) { :host([assistant="chat"]) [part~="assistant"][role="log"] { padding: 16px; } :host([assistant="chat"]) form[part~="assistant"][role="search"] { padding: 12px 16px; } }
}`;
function storedConversationId(domain, assistantId) {
  const key = JSON.stringify(["assistant-chat", domain, assistantId]);
  try {
    const id = sessionStorage.getItem(key) ?? crypto.randomUUID();
    sessionStorage.setItem(key, id);
    return id;
  } catch {
    return crypto.randomUUID();
  }
}
function mountAssistantShell(host, html, context2) {
  var _a, _b, _c;
  const { assistant } = context2;
  const shop = context2.shop ?? context2.myshopifyDomain;
  if (!host.hasAttribute("placement")) host.setAttribute("placement", "bubble");
  const create = (tag) => {
    const element = host.ownerDocument.createElement(tag);
    element.setAttribute("part", "assistant");
    return element;
  };
  const shell = mountQuizDocument(host, html, { ...context2, customCode: false });
  const root = shell.root;
  let sequence = 0;
  const conversationId = assistant.conversationId ?? ((_a = assistant.preview) == null ? void 0 : _a.conversationId) ?? (assistant.send ? crypto.randomUUID() : storedConversationId(shop ?? "", assistant.id));
  let disposed = false;
  let busy2 = false;
  let timer;
  const controller = new AbortController();
  const endpoint = assistant.turnUrl ?? ASSISTANT_TURN_URL(assistant.id, context2.myshopifyDomain ?? "", context2.shop);
  const fromTemplate = (name, values) => {
    var _a2, _b2;
    const template = root.querySelector(
      `template[data-assistant-template="${name}"]`
    );
    const element = (_a2 = template == null ? void 0 : template.content.firstElementChild) == null ? void 0 : _a2.cloneNode(true);
    if (!element) return void 0;
    for (const field of [
      element,
      ...element.querySelectorAll("[data-assistant-field]")
    ]) {
      const key = field.dataset.assistantField;
      if (!key || key === "slot" || key === "tracking" || ((_b2 = field.parentElement) == null ? void 0 : _b2.closest(
        '[data-assistant-field="slot"], [data-assistant-field="tracking"]'
      )))
        continue;
      const value = values[key];
      if (!value) field.remove();
      else if (key === "image") field.setAttribute("src", value);
      else if (key === "url") field.setAttribute("href", value);
      else field.textContent = value;
    }
    return element;
  };
  const kernel = createQuizKernel(root);
  const tracking = context2.adminPreview || assistant.send || assistant.preview || assistant.products ? void 0 : quizTrackingSender("assistant");
  let view;
  let errors;
  let composer;
  let messageInput;
  const runtime = readQuizRuntime(root);
  const title = ((_b = root.querySelector("title")) == null ? void 0 : _b.textContent) ?? "";
  const lang = (context2.locale || host.lang || host.ownerDocument.documentElement.lang || "en").toLowerCase().split(/[-_]/)[0];
  const voiceOn = context2.platform !== "woocommerce" && root.querySelector('meta[name="assistant-voice"][content="on"]') !== null && moonshineHears(lang) && micAllowed();
  const message = (key) => requireValue(runtime.messages[key], "Compiled runtime message");
  let call;
  let dictation;
  let dictationStop;
  let dictationBefore = "";
  let callView;
  let callCards;
  let callStatus;
  let callTime;
  let mute;
  let callClock;
  let latestCard;
  let cardPlaceholder;
  let lastEntryId;
  const calls = [];
  let callSummary;
  let paintComposer = () => {
  };
  const elapsed = (started2) => {
    const seconds = Math.floor((Date.now() - started2) / 1e3);
    return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
  };
  const restoreCard = () => {
    if (latestCard && cardPlaceholder) cardPlaceholder.replaceWith(latestCard);
    cardPlaceholder = void 0;
  };
  const showCallCard = () => {
    if (!call || !latestCard || cardPlaceholder) return;
    cardPlaceholder = host.ownerDocument.createComment("call card");
    latestCard.before(cardPlaceholder);
    callCards.replaceChildren(latestCard);
  };
  const paintCall = () => {
    if (!call) return;
    const state2 = call.muted ? "muted" : voiceStore.get().speaking ? "speaking" : busy2 || !call.stream ? "working" : "listening";
    callStatus.dataset.state = state2;
    const label = callStatus.querySelector('[role="status"]');
    if (label)
      label.textContent = message(
        {
          muted: "assistantVoiceMuted",
          speaking: "assistantVoiceSpeaking",
          working: "assistantVoiceWorking",
          listening: "assistantVoiceListening"
        }[state2]
      );
    callTime.textContent = `${message("assistantVoiceOnCall")} · ${elapsed(call.started)}`;
    mute.textContent = message(call.muted ? "assistantVoiceUnmute" : "assistantVoiceMute");
    mute.setAttribute("aria-pressed", String(call.muted));
  };
  const endCall = () => {
    var _a2, _b2;
    if (!call) return;
    const ended = call;
    call = void 0;
    (_a2 = ended.stop) == null ? void 0 : _a2.call(ended);
    (_b2 = ended.stream) == null ? void 0 : _b2.getTracks().forEach((track) => track.stop());
    setVoice({ conversation: false });
    stopSpeaking();
    chime("stop");
    clearInterval(callClock);
    restoreCard();
    callView.hidden = true;
    callTime.hidden = true;
    view.hidden = false;
    composer.hidden = false;
    if (callSummary) {
      callSummary.textContent = `${message("assistantVoiceCall")} ${elapsed(ended.started)}`;
      callSummary.hidden = false;
    }
    paintComposer();
  };
  const cancelDictation = () => {
    const active = dictation;
    if (!active) return;
    dictation = void 0;
    void (dictationStop ?? active.stop());
    dictationStop = void 0;
    messageInput.value = dictationBefore;
    chime("stop");
    paintComposer();
  };
  const finishDictation = async () => {
    const active = dictation;
    if (!active) return false;
    const text = await (dictationStop ?? (dictationStop = active.stop()));
    if (disposed || dictation !== active) return false;
    dictation = void 0;
    dictationStop = void 0;
    messageInput.value = [dictationBefore, text].filter(Boolean).join(" ").slice(0, 4e3);
    chime("stop");
    paintComposer();
    return true;
  };
  const voiceError = (reason) => {
    if (disposed) return;
    endCall();
    cancelDictation();
    errors.textContent = message(
      reason === "denied" ? "assistantVoiceDenied" : "assistantVoiceFailed"
    );
  };
  const setup = () => {
    var _a2, _b2, _c2;
    const body = requireValue(
      root.querySelector('[part~="body"]'),
      "Mounted quiz body"
    );
    const authored = create("div");
    authored.hidden = true;
    authored.inert = true;
    authored.append(...body.childNodes);
    body.append(authored);
    const styles = host.ownerDocument.createElement("style");
    styles.textContent = ASSISTANT_CSS;
    root.append(styles);
    const presentation = create("section");
    view = create("section");
    view.setAttribute("role", "log");
    view.setAttribute("aria-live", "polite");
    view.id = "assistant-feedback";
    errors = create("div");
    errors.setAttribute("role", "alert");
    composer = create("form");
    composer.setAttribute("role", "search");
    const inputLabel = create("label");
    inputLabel.textContent = requireValue(
      runtime.messages.assistantInputLabel,
      "Compiled runtime message"
    );
    messageInput = create("input");
    messageInput.type = "text";
    messageInput.maxLength = 4e3;
    messageInput.required = true;
    messageInput.placeholder = requireValue(
      runtime.messages.assistantInputPlaceholder,
      "Compiled runtime message"
    );
    messageInput.setAttribute("aria-describedby", view.id);
    messageInput.addEventListener("input", () => {
      messageInput.value = [...messageInput.value].slice(0, 2e3).join("");
    });
    inputLabel.append(messageInput);
    const send = create("button");
    send.type = "submit";
    send.textContent = requireValue(runtime.messages.assistantSend, "Compiled runtime message");
    composer.append(inputLabel);
    const iconButton = (key, path) => {
      const node = create("button");
      node.type = "button";
      node.setAttribute("part", "assistant assistant-voice");
      node.setAttribute("aria-label", message(key));
      node.title = message(key);
      node.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${path}"/></svg>`;
      return node;
    };
    callView = create("section");
    callView.setAttribute("part", "assistant assistant-call");
    callView.hidden = true;
    callCards = create("div");
    callCards.setAttribute("part", "assistant assistant-call-cards");
    callStatus = create("div");
    callStatus.setAttribute("part", "assistant assistant-call-status");
    const status = create("span");
    status.setAttribute("role", "status");
    const wavePath = "M4 10v4m4-7v10m4-14v18m4-14v10m4-7v4";
    if (voiceOn) {
      const mic = iconButton(
        "assistantVoiceDictate",
        "M9 5a3 3 0 0 1 6 0v7a3 3 0 0 1-6 0V5Zm-3 6v1a6 6 0 0 0 12 0v-1M12 18v4m-3 0h6"
      );
      const cancel = iconButton("assistantVoiceCancel", "m6 6 12 12M6 18 18 6");
      const done = iconButton("assistantVoiceDone", "m5 12 4 4L19 6");
      const wave = iconButton("assistantVoiceStartCall", wavePath);
      wave.setAttribute("part", "assistant assistant-voice assistant-call-start");
      paintComposer = () => {
        mic.hidden = !!dictation;
        cancel.hidden = done.hidden = !dictation;
        wave.hidden = !!dictation || !!messageInput.value.trim() || !paradeeSpeaks(lang);
        send.hidden = !dictation && !messageInput.value.trim() && paradeeSpeaks(lang);
        messageInput.readOnly = !!dictation;
      };
      mic.addEventListener("click", () => {
        if (busy2 || dictation) return;
        unlockAudio();
        errors.replaceChildren();
        dictationBefore = messageInput.value.trim();
        const active = startDictation({
          lang,
          onListening: () => {
            if (!disposed && dictation === active) chime("start");
          },
          onText: (final, live) => {
            if (disposed || dictation !== active) return;
            messageInput.value = [dictationBefore, final, live].filter(Boolean).join(" ").slice(0, 4e3);
            paintComposer();
          },
          onError: voiceError
        });
        dictation = active;
        paintComposer();
      });
      cancel.addEventListener("click", cancelDictation);
      done.addEventListener("click", () => void finishDictation());
      wave.addEventListener("click", () => {
        if (busy2 || call || dictation) return;
        unlockAudio();
        errors.replaceChildren();
        const active = { started: Date.now(), muted: false };
        call = active;
        callSummary = create("div");
        callSummary.setAttribute("part", "assistant assistant-call-summary");
        callSummary.hidden = true;
        calls.push({ after: lastEntryId, node: callSummary });
        view.append(callSummary);
        view.hidden = composer.hidden = true;
        callView.hidden = callTime.hidden = false;
        showCallCard();
        setVoice({ conversation: true });
        paintCall();
        callClock = setInterval(paintCall, 1e3);
        active.stop = startCall({
          lang,
          onTurn: (said) => {
            if (call === active && !active.muted && !busy2) void turn(void 0, void 0, said);
          },
          onListening: (stream) => {
            if (call !== active) {
              stream.getTracks().forEach((track) => track.stop());
              return;
            }
            active.stream = stream;
            stream.getAudioTracks().forEach((track) => {
              track.enabled = !active.muted;
            });
            chime("start");
            paintCall();
          },
          onError: (reason) => {
            if (call === active) voiceError(reason);
          }
        });
      });
      const mark = iconButton("assistantVoiceOnCall", wavePath);
      const markIcon = requireValue(mark.firstElementChild, "Call status icon");
      const markContainer = create("span");
      markContainer.setAttribute("part", "assistant assistant-call-mark");
      markContainer.append(markIcon);
      callStatus.append(markContainer, status);
      mute = create("button");
      mute.type = "button";
      mute.addEventListener("click", () => {
        var _a3;
        const active = call;
        if (!active) return;
        active.muted = !active.muted;
        (_a3 = active.stream) == null ? void 0 : _a3.getAudioTracks().forEach((track) => {
          track.enabled = !active.muted;
        });
        paintCall();
      });
      const hangUp = create("button");
      hangUp.type = "button";
      hangUp.textContent = message("assistantVoiceHangUp");
      hangUp.addEventListener("click", endCall);
      const actions = create("div");
      actions.setAttribute("part", "assistant assistant-call-actions");
      actions.append(mute, hangUp);
      callView.append(callStatus, callCards, actions);
      composer.append(cancel, mic, done, wave);
      messageInput.addEventListener("input", paintComposer);
      paintComposer();
    }
    composer.append(send);
    composer.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (dictation && !await finishDictation()) return;
      const text = messageInput.value.trim();
      if (!disposed && !busy2 && text && [...text].length <= 2e3)
        void turn(void 0, void 0, text);
    });
    const header = fromTemplate("header", { title });
    callTime = create("div");
    callTime.setAttribute("part", "assistant assistant-call-time");
    callTime.hidden = true;
    if (header) {
      header.append(callTime);
      const close = create("button");
      close.type = "button";
      close.setAttribute("part", "assistant-close");
      if (runtime.messages.assistantClose)
        close.setAttribute("aria-label", runtime.messages.assistantClose);
      close.textContent = "×";
      close.addEventListener("click", () => {
        endCall();
        cancelDictation();
        host.removeAttribute("open");
      });
      presentation.append(header, close);
    }
    presentation.append(view, callView, composer, errors);
    body.append(presentation);
    const launcher = (_b2 = (_a2 = root.querySelector('template[data-assistant-template="launcher"]')) == null ? void 0 : _a2.content.firstElementChild) == null ? void 0 : _b2.cloneNode(true);
    if (launcher) {
      const text = launcher.querySelector('[data-assistant-field="text"]');
      if (text && (!((_c2 = text.textContent) == null ? void 0 : _c2.trim()) || text.textContent.trim() === "Ask us"))
        text.textContent = runtime.messages.assistantLauncher ?? "Ask us";
      if (launcher.getAttribute("aria-label") === "Open shopping assistant")
        launcher.setAttribute("aria-label", (text == null ? void 0 : text.textContent) ?? "Ask us");
      launcher.setAttribute("part", "assistant-launcher");
      launcher.setAttribute("aria-controls", "assistant-panel");
      launcher.addEventListener("click", () => host.toggleAttribute("open"));
      body.append(launcher);
    }
    presentation.id = "assistant-panel";
    installQuizProductEvents(kernel);
  };
  const button = (label, action) => {
    const node = create("button");
    node.type = "button";
    node.textContent = label;
    node.addEventListener("click", () => {
      if (!busy2) action();
    });
    return node;
  };
  const chip = (label, action) => {
    const templated = fromTemplate("chips", { text: label });
    if (!templated) return button(label, action);
    const node = templated.localName === "button" ? templated : button("", action);
    if (node === templated) {
      node.type = "button";
      node.addEventListener("click", () => {
        if (!busy2) action();
      });
    } else node.append(templated);
    node.setAttribute("part", "assistant");
    return node;
  };
  const pickItems = /* @__PURE__ */ new Map();
  let chatId;
  const quizResponses = /* @__PURE__ */ new Map();
  const quizCarts = /* @__PURE__ */ new Map();
  const quizCart = (quiz) => {
    var _a2;
    let commerce = quizCarts.get(quiz);
    if (!commerce) {
      commerce = loadQuizCommerce(
        detectQuizCommerceHost(
          window,
          context2.adminPreview,
          context2.platform ?? ((_a2 = context2.run) == null ? void 0 : _a2.platform)
        ),
        quiz,
        context2.cartNotice,
        () => quizResponses.get(quiz),
        () => chatId && shop ? { chatId, shop } : void 0,
        shop
      );
      quizCarts.set(quiz, commerce);
    }
    return commerce;
  };
  const renderPicks = async (entry, target) => {
    var _a2, _b2, _c2, _d;
    const picks = entry.picks;
    const card = fromTemplate("picks", {});
    const prototype = card == null ? void 0 : card.querySelector('[data-assistant-field="slot"]');
    if (!picks || !card || !prototype) return;
    const ids = Object.values(picks.recommendations).flat();
    const quiz = entry.quizId;
    let items = pickItems.get(entry.id);
    if (!items) {
      items = quizCart(quiz ?? "").then(
        (commerce2) => {
          var _a3;
          return commerce2.items(
            ids,
            {
              storefrontAccessToken: picks.storefrontAccessToken,
              shop: picks.domain,
              products: assistant.products
            },
            void 0,
            { country: ((_a3 = window.quiz_country) == null ? void 0 : _a3.toUpperCase()) || null }
          );
        }
      );
      pickItems.set(entry.id, items);
    }
    const data = await items;
    const commerce = await quizCart(quiz ?? "");
    const { isUsableRecommendationItem } = await __vitePreload(async () => {
      const { isUsableRecommendationItem: isUsableRecommendationItem2 } = await import("./quiz-renderer-recommendation-products-KsUoSYJJ.js");
      return { isUsableRecommendationItem: isUsableRecommendationItem2 };
    }, true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10]) : void 0, import.meta.url);
    const { recommendationItemBindings } = await __vitePreload(async () => {
      const { recommendationItemBindings: recommendationItemBindings2 } = await import("./quiz-renderer-recommendation-card-D0WWyRM8.js").then((n) => n.recommendationCard);
      return { recommendationItemBindings: recommendationItemBindings2 };
    }, true ? __vite__mapDeps([4,5,2,6,7,8,9,10]) : void 0, import.meta.url);
    if (disposed || !target.isConnected) return;
    const grid = create("div");
    grid.setAttribute("part", "assistant-pick-grid");
    const text = (value) => typeof value === "string" ? value : "";
    const link = (value) => /^https?:\/\//.test(text(value)) ? text(value) : "";
    for (const id of ids) {
      const item = data[id];
      if (!isUsableRecommendationItem(item)) continue;
      const type = id.includes("/ProductVariant/") ? "product-variants" : id.includes("/Collection/") ? "collections" : "products";
      const { product, title: title2, variant, price, images } = recommendationItemBindings(item, type);
      const image = images.find((candidate) => link(candidate.url));
      const pair = create("div");
      pair.setAttribute("part", "assistant-pick-pair");
      const reason = (_b2 = (_a2 = entry.reasons) == null ? void 0 : _a2.find((reason2) => reason2.id === id)) == null ? void 0 : _b2.text;
      if (reason) {
        const bubble = fromTemplate("message", { text: reason }) ?? create("p");
        if (!bubble.textContent) bubble.textContent = reason;
        bubble.setAttribute("part", "assistant assistant-bubble");
        bubble.dataset.state = "assistant";
        pair.append(bubble);
      }
      const itemCard = card.cloneNode(true);
      itemCard.setAttribute("part", "assistant assistant-pick-card");
      const copy = requireValue(
        itemCard.querySelector('[data-assistant-field="slot"]'),
        "Picks slot"
      );
      for (const field of itemCard.querySelectorAll('[data-assistant-field="reason"]'))
        field.remove();
      pair.append(itemCard);
      grid.append(pair);
      const values = {
        title: title2,
        url: link(product.onlineStoreUrl),
        image: link(image == null ? void 0 : image.url),
        price: price ? formatPriceWithCurrency(
          price,
          !window.quiz_currency_code || window.quiz_currency_code === price.currencyCode ? window.quiz_currency : void 0
        ) : ""
      };
      for (const field of copy.querySelectorAll(
        '[data-assistant-field]:not([data-assistant-field="cart"])'
      )) {
        const key = field.dataset.assistantField;
        const value = values[key];
        if (!value && key === "url") field.replaceWith(...field.childNodes);
        else if (!value) field.remove();
        else if (key === "image") field.setAttribute("src", value);
        else if (key === "url") field.setAttribute("href", value);
        else field.textContent = value;
      }
      const cartButton = copy.querySelector(
        'button[data-assistant-field="cart"]'
      );
      if (cartButton && !(variant == null ? void 0 : variant.id)) cartButton.remove();
      else if (cartButton && (variant == null ? void 0 : variant.id)) {
        const variantId = type === "product-variants" ? id : text(variant.id);
        cartButton.type = "button";
        if (commerce.addAction === "viewProduct" || !((_c2 = cartButton.textContent) == null ? void 0 : _c2.trim()) || cartButton.textContent.trim() === "Add to cart")
          cartButton.textContent = requireValue(
            runtime.messages[commerce.addAction === "viewProduct" ? "viewProduct" : "addToCart"],
            "Compiled runtime message"
          );
        cartButton.setAttribute("aria-label", `${(_d = cartButton.textContent) == null ? void 0 : _d.trim()}, ${values.title}`);
        const status = create("p");
        status.setAttribute("role", "status");
        status.setAttribute("part", "assistant-cart-status");
        cartButton.after(status);
        if (!variant.availableForSale) {
          cartButton.disabled = true;
          cartButton.textContent = requireValue(
            runtime.messages.soldOut,
            "Compiled runtime message"
          );
        }
        cartButton.addEventListener("click", async () => {
          var _a3;
          cartButton.disabled = true;
          try {
            const trackProductClick = () => {
              const tracked = { id, title: title2, price: price ?? {} };
              kernel.emit("productClicked", { step: picks.resultsStepRef, variant: tracked });
              if (quiz)
                tracking == null ? void 0 : tracking.run(
                  (track) => track.trackProductClicked(
                    quiz,
                    picks.resultsStepRef,
                    tracked,
                    kernel.state.preferences
                  )
                );
            };
            if (commerce.addAction === "viewProduct") trackProductClick();
            const notice = await commerce.add(variantId);
            if (typeof notice === "object") {
              trackProductClick();
              window.open(notice.viewProduct, "_self");
              return;
            }
            if (commerce.addAction === "viewProduct") return;
            const short = variantId.slice(variantId.lastIndexOf("/") + 1);
            status.textContent = notice || requireValue(runtime.messages.countInCart, "Compiled runtime message").replace(
              "{{count}}",
              String(((_a3 = commerce.cart) == null ? void 0 : _a3.quantity(short)) ?? 1)
            );
          } catch {
            status.textContent = requireValue(
              runtime.messages.loadingErrorRetry,
              "Compiled runtime message"
            );
          } finally {
            cartButton.disabled = false;
          }
        });
      }
    }
    if (grid.childElementCount) target.append(grid);
  };
  let pending2;
  let typing;
  const spoken = /* @__PURE__ */ new Set();
  let spokenOnce = false;
  const controls = (disabled) => {
    for (const container of [view, composer, callCards])
      container.querySelectorAll('button[part~="assistant"],input[part~="assistant"]').forEach((n) => n.disabled = disabled);
    composer.setAttribute("aria-busy", String(disabled));
    paintComposer();
    paintCall();
  };
  const showError = (retry, wait = 0) => {
    errors.replaceChildren();
    const text = create("p");
    text.textContent = requireValue(
      pending2 ? runtime.messages.assistantSendFailed : runtime.messages.loadingErrorRetry,
      "Compiled runtime message"
    );
    const again = button(
      requireValue(runtime.messages.tryAgain, "Compiled runtime message"),
      retry
    );
    again.disabled = wait > 0;
    if (wait)
      timer = setTimeout(() => {
        if (!disposed) again.disabled = false;
      }, wait);
    errors.append(text, again);
  };
  const renderCollections = async (collections, target) => {
    const { createRecommendationCard } = await __vitePreload(async () => {
      const { createRecommendationCard: createRecommendationCard2 } = await import("./quiz-renderer-recommendation-card-D0WWyRM8.js").then((n) => n.recommendationCard);
      return { createRecommendationCard: createRecommendationCard2 };
    }, true ? __vite__mapDeps([4,5,2,6,7,8,9,10]) : void 0, import.meta.url);
    if (disposed || !target.isConnected) return;
    let template = root.querySelector('template[data-card="collections"]');
    if (!template) {
      const holder = host.ownerDocument.createElement("div");
      holder.innerHTML = defaultRecommendationTemplate();
      template = requireValue(holder.querySelector("template"), "Default collection template");
    }
    for (const collection of collections.slice(0, 3)) {
      let url;
      try {
        url = new URL(collection.url);
      } catch {
        continue;
      }
      if (url.protocol !== "https:" && url.protocol !== "http:") continue;
      const card = createRecommendationCard(
        host.ownerDocument,
        {
          title: collection.title,
          onlineStoreUrl: collection.url,
          image: collection.image ? { url: collection.image } : void 0
        },
        collection.id,
        {
          template,
          type: "collections",
          domain: url.host,
          message: (key) => requireValue(runtime.messages[key], "Compiled runtime message"),
          navigate: (url2, target2) => {
            window.open(url2, target2 ?? "_self", "noopener,noreferrer");
          },
          disposed: () => disposed
        }
      );
      card.element.querySelectorAll(
        '[data-cart],[data-field="price"],[data-field="compare-price"],[data-field="unit-price"]'
      ).forEach((node) => node.remove());
      target.append(card.element);
      if (collection.description) {
        const description = create("p");
        description.textContent = collection.description;
        card.element.after(description);
      }
    }
  };
  const votes = {};
  const feedback = (entry, row) => {
    const chrome = create("div");
    chrome.setAttribute("part", "assistant assistant-feedback");
    const thanks = create("span");
    thanks.setAttribute("role", "status");
    let form;
    let saving = false;
    const message2 = (key) => requireValue(runtime.messages[key], "Compiled runtime message");
    const update = (done) => {
      for (const thumb of chrome.querySelectorAll("button"))
        thumb.setAttribute("aria-pressed", String(thumb.dataset.thumb === votes[entry.id]));
      chrome.toggleAttribute("data-selected", !!votes[entry.id]);
      thanks.textContent = done ? message2("assistantFeedbackThanks") : "";
      if (done) {
        form == null ? void 0 : form.remove();
        form = void 0;
      }
    };
    const save = async (thumb, text) => {
      if (saving) return false;
      saving = true;
      try {
        if (!context2.adminPreview && !assistant.send && !assistant.preview && !assistant.products) {
          const url = new URL(endpoint, host.ownerDocument.baseURI);
          url.pathname = url.pathname.replace(/\/turn$/, "/feedback");
          const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              conversationId,
              replyId: entry.id,
              thumb,
              ...text === void 0 ? {} : { text }
            }),
            signal: controller.signal
          });
          if (!response.ok) throw new Error("Feedback failed");
        }
        votes[entry.id] = thumb;
        return true;
      } catch {
        if (!disposed)
          showError(() => {
            void save(thumb, text).then((ok) => {
              if (ok) update(true);
            });
          });
        return false;
      } finally {
        saving = false;
      }
    };
    const openField = () => {
      var _a2;
      form == null ? void 0 : form.remove();
      form = create("form");
      form.setAttribute("part", "assistant assistant-feedback-form");
      const label = create("label");
      const prompt = message2("assistantFeedbackPrompt");
      const optional = prompt.match(/^(.*?)([（(].*[）)])$/);
      label.append((optional == null ? void 0 : optional[1]) ?? prompt);
      if (optional) {
        const hint = create("span");
        hint.textContent = optional[2];
        label.append(hint);
      }
      const input = create("textarea");
      input.maxLength = 2e3;
      label.append(input);
      const actions = create("div");
      actions.setAttribute("part", "assistant assistant-feedback-actions");
      actions.append(button(message2("assistantFeedbackSkip"), () => update(true)));
      const send = create("button");
      send.type = "submit";
      send.textContent = message2("assistantSend");
      actions.append(send);
      form.append(label, actions);
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        void save("down", input.value).then((ok) => {
          if (ok) update(true);
        });
      });
      row.append(form);
      input.focus({ preventScroll: true });
      (_a2 = form.scrollIntoView) == null ? void 0 : _a2.call(form, { block: "nearest" });
    };
    for (const thumb of ["up", "down"]) {
      const node = button("", () => {
        void save(thumb).then((ok) => {
          if (!ok || disposed) return;
          update(thumb === "up");
          if (thumb === "down") openField();
        });
      });
      node.setAttribute("part", "assistant assistant-thumb");
      node.dataset.thumb = thumb;
      node.setAttribute(
        "aria-label",
        message2(thumb === "up" ? "assistantFeedbackGood" : "assistantFeedbackBad")
      );
      const svg = host.ownerDocument.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("fill", "none");
      svg.setAttribute("stroke", "currentColor");
      svg.setAttribute("stroke-width", "1.5");
      svg.setAttribute("stroke-linecap", "round");
      svg.setAttribute("stroke-linejoin", "round");
      svg.setAttribute("aria-hidden", "true");
      const path = host.ownerDocument.createElementNS(svg.namespaceURI, "path");
      path.setAttribute(
        "d",
        "M7 10v10H4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h3Zm0 0 5-7a2 2 0 0 1 2 2v5h5a2 2 0 0 1 2 2l-2 7a2 2 0 0 1-2 1H7"
      );
      if (thumb === "down") svg.setAttribute("transform", "rotate(180)");
      svg.append(path);
      node.append(svg);
      chrome.append(node);
    }
    chrome.append(thanks);
    row.append(chrome);
    update(!!votes[entry.id]);
  };
  const render = (reply, focus) => {
    var _a2, _b2, _c2, _d, _e;
    restoreCard();
    latestCard = void 0;
    const entries = reply.entries ?? [];
    lastEntryId = (_a2 = entries.at(-1)) == null ? void 0 : _a2.id;
    Object.assign(votes, reply.feedback);
    const questionIndex = entries.findLastIndex(
      (entry) => entry.role === "assistant" && entry.question && reply.messages.some((question) => {
        var _a3;
        return question.name === ((_a3 = entry.question) == null ? void 0 : _a3.name);
      })
    );
    const lastUserIndex = entries.findLastIndex((entry) => entry.role === "user");
    const repliesIndex = entries.findLastIndex(
      (entry, index) => {
        var _a3;
        return index > lastUserIndex && ((_a3 = entry.replies) == null ? void 0 : _a3.length);
      }
    );
    const nodes = [];
    const fills = [];
    for (const [index, entry] of entries.entries()) {
      const row = create("div");
      row.setAttribute("part", "assistant assistant-message");
      row.dataset.state = entry.role === "user" ? "shopper" : "assistant";
      const reask = () => void turn(void 0, void 0, void 0, { entryId: entry.id });
      const said = entry.note ? runtime.messages[entry.note] ?? "" : entry.text;
      const templated = said ? fromTemplate("message", { text: said }) : void 0;
      let bubble;
      if (templated) {
        templated.setAttribute("part", "assistant assistant-bubble");
        bubble = templated;
        if (entry.reaskable && entry.question) {
          bubble = button("", reask);
          bubble.setAttribute("part", "assistant assistant-reask");
          bubble.append(templated);
        }
      } else {
        bubble = entry.reaskable && entry.question ? button(entry.text, reask) : create("p");
        bubble.textContent = said;
        bubble.setAttribute("part", "assistant assistant-bubble");
      }
      if (bubble.textContent || entry.reaskable) row.append(bubble);
      if (index === questionIndex && entry.question && !entry.reaskable)
        row.append(
          questionControls(entry.question, (values) => {
            var _a3;
            void turn(
              {
                name: requireValue((_a3 = entry.question) == null ? void 0 : _a3.name, "Offered question name"),
                values
              },
              void 0,
              void 0,
              void 0,
              values.map(
                (value) => {
                  var _a4, _b3, _c3;
                  return ((_c3 = (_b3 = (_a4 = entry.question) == null ? void 0 : _a4.options) == null ? void 0 : _b3.find((option) => option.value === value)) == null ? void 0 : _c3.label) ?? value;
                }
              ).join(", ")
            );
          })
        );
      if ((_b2 = entry.collections) == null ? void 0 : _b2.length) {
        const container = create("div");
        row.append(container);
        fills.push(
          renderCollections(entry.collections, container).catch(() => {
            if (!disposed && container.isConnected) showError(() => void turn());
          })
        );
      }
      if (entry.order) {
        const order = entry.order;
        const status = (value) => {
          const entry2 = QUIZ_ORDER_STATUS_MESSAGES.find((entry3) => entry3.status === value);
          return entry2 ? requireValue(runtime.messages[entry2.key], "Compiled runtime message") : "";
        };
        const tracking2 = order.fulfillments.flatMap(
          (fulfillment) => fulfillment.tracking.map((item) => ({
            text: [status(fulfillment.status), item.company, item.number].filter(Boolean).join(" · "),
            url: item.url && /^https?:\/\//.test(item.url) ? item.url : ""
          }))
        );
        const text = [
          [status(order.financialStatus), status(order.fulfillmentStatus)].filter(Boolean).join(" · "),
          new Date(order.createdAt).toLocaleDateString(
            host.ownerDocument.documentElement.lang || "en"
          ),
          ...order.items.map((item) => `${item.quantity} × ${item.name}`)
        ].join("\n");
        const card = fromTemplate("order", {
          title: order.name,
          text,
          url: ((_c2 = tracking2[0]) == null ? void 0 : _c2.url) ?? ""
        });
        if (card) {
          const prototype = card.querySelector('[data-assistant-field="tracking"]');
          if (prototype) {
            prototype.replaceWith(
              ...tracking2.map((item) => {
                var _a3;
                const shipment = prototype.cloneNode(true);
                for (const field of shipment.querySelectorAll(
                  "[data-assistant-field]"
                )) {
                  if (field.dataset.assistantField === "text") field.textContent = item.text;
                  else if (field.dataset.assistantField === "url") {
                    if (item.url) {
                      field.setAttribute("href", item.url);
                      if (!((_a3 = field.textContent) == null ? void 0 : _a3.trim()) || field.textContent.trim() === "Track shipment")
                        field.textContent = requireValue(
                          runtime.messages.assistantTrackShipment,
                          "Compiled runtime message"
                        );
                    } else field.remove();
                  }
                }
                return shipment;
              })
            );
          }
          row.append(card);
        }
      }
      if (assistant.preview && entry.role === "assistant") {
        for (const label of assistant.preview.why(entry, reply.trace ?? [])) {
          const note = create("p");
          note.setAttribute("part", "assistant-why");
          note.textContent = label;
          row.append(note);
        }
      }
      if (entry.picks) {
        const picks = create("div");
        picks.setAttribute("part", "assistant assistant-picks");
        row.append(picks);
        fills.push(renderPicks(entry, picks).catch(() => {
        }));
      }
      if (index === repliesIndex && ((_d = entry.replies) == null ? void 0 : _d.length)) {
        const replies2 = create("form");
        replies2.setAttribute("part", "assistant assistant-choices");
        for (const text of entry.replies)
          replies2.append(chip(text, () => void turn(void 0, void 0, text)));
        row.append(replies2);
      }
      if (entry.role === "assistant" && entry.source !== "open") feedback(entry, row);
      nodes.push(row);
      if (index === questionIndex && entry.question && !entry.reaskable || entry.picks || ((_e = entry.collections) == null ? void 0 : _e.length) || entry.order)
        latestCard = row;
      for (const summary of calls.filter((summary2) => summary2.after === entry.id))
        nodes.push(summary.node);
    }
    nodes.unshift(...calls.filter((summary) => !summary.after).map((summary) => summary.node));
    pending2 = void 0;
    typing = void 0;
    view.replaceChildren(...nodes);
    showCallCard();
    const fresh = entries.filter((entry) => entry.role === "assistant" && !spoken.has(entry.id));
    for (const entry of entries) spoken.add(entry.id);
    if (call && spokenOnce)
      for (const entry of fresh) {
        const said = entry.note ? runtime.messages[entry.note] ?? "" : entry.text;
        if (said) speak(said, lang);
      }
    spokenOnce = true;
    if (focus && !call) {
      const latest = nodes.findLast((node) => node.dataset.state === "assistant");
      const newest = (latest == null ? void 0 : latest.querySelector('[part~="assistant-message"]')) ?? latest;
      if (newest) {
        const reveal = () => {
          if (disposed || !newest.isConnected) return;
          view.scrollTop += newest.getBoundingClientRect().top - view.getBoundingClientRect().top - view.clientTop - parseFloat(window.getComputedStyle(view).paddingTop);
        };
        newest.tabIndex = -1;
        newest.focus({ preventScroll: true });
        reveal();
        void Promise.all(fills).then(reveal);
      }
    }
  };
  const questionControls = (question, submit) => {
    var _a2, _b2;
    const group = create("form");
    group.setAttribute("part", "assistant assistant-choices");
    const multiple = question.multiple === true;
    if (multiple) group.dataset.state = "select";
    for (const option of question.options ?? []) {
      if (multiple) {
        const label = create("label");
        const input = create("input");
        input.type = multiple ? "checkbox" : "radio";
        input.name = "answer";
        input.value = option.value;
        input.checked = ((_a2 = question.values) == null ? void 0 : _a2.includes(option.value)) ?? false;
        input.required = !multiple;
        label.append(input, host.ownerDocument.createTextNode(option.label));
        group.append(label);
      } else {
        const node = chip(option.label, () => submit([option.value]));
        if (option.image) {
          const image = create("img");
          image.src = option.image;
          image.alt = "";
          node.prepend(image);
        }
        group.append(node);
      }
    }
    if (question.field) {
      const label = create("label");
      label.textContent = question.text;
      const input = create("input");
      input.name = requireValue(question.name, "Offered question name");
      for (const [key, value] of Object.entries(question.field)) {
        if (key === "required") input.required = Boolean(value);
        else if ([
          "type",
          "min",
          "max",
          "step",
          "minLength",
          "maxLength",
          "pattern",
          "placeholder",
          "autocomplete"
        ].includes(key))
          input.setAttribute(key, String(value));
      }
      input.value = ((_b2 = question.values) == null ? void 0 : _b2[0]) ?? "";
      label.append(input);
      group.append(label);
    }
    if (question.field || multiple) {
      const send = create("button");
      send.type = "submit";
      send.textContent = requireValue(runtime.messages.assistantSend, "Compiled runtime message");
      group.append(send);
      group.addEventListener("submit", (event) => {
        event.preventDefault();
        if (busy2 || !group.reportValidity()) return;
        const values = question.field ? [requireValue(group.querySelector("input"), "Native field").value] : [...group.querySelectorAll("input:checked")].map(
          (input) => input.value
        );
        submit(values);
      });
    }
    return group;
  };
  const turn = async (tap, retained, text, reask, tapLabel) => {
    var _a2, _b2;
    if (disposed || busy2) return;
    busy2 = true;
    const label = text ?? tapLabel;
    if (label && !retained) {
      pending2 == null ? void 0 : pending2.remove();
      pending2 = create("div");
      pending2.setAttribute("part", "assistant assistant-message");
      pending2.dataset.state = "shopper";
      const bubble = fromTemplate("message", { text: label }) ?? create("p");
      if (!bubble.textContent) bubble.textContent = label;
      bubble.setAttribute("part", "assistant assistant-bubble");
      pending2.append(bubble);
      view.append(pending2);
    }
    (_a2 = pending2 == null ? void 0 : pending2.querySelector("small")) == null ? void 0 : _a2.remove();
    messageInput.value = "";
    typing = create("div");
    typing.setAttribute("part", "assistant assistant-message");
    typing.dataset.state = "assistant";
    const dots = create("div");
    dots.setAttribute("part", "assistant assistant-bubble assistant-typing");
    dots.setAttribute("role", "status");
    dots.setAttribute(
      "aria-label",
      requireValue(runtime.messages.assistantTyping, "Compiled runtime message")
    );
    for (let i = 0; i < 3; i++) {
      const dot = create("span");
      dot.setAttribute("aria-hidden", "true");
      dots.append(dot);
    }
    typing.append(dots);
    view.append(typing);
    view.scrollTop = view.scrollHeight;
    controls(true);
    errors.replaceChildren();
    const locale = context2.locale || window.quiz_locale;
    const upperLocale = locale == null ? void 0 : locale.toUpperCase().replace("-", "_");
    const language = (upperLocale == null ? void 0 : upperLocale.startsWith("ZH_")) ? upperLocale : upperLocale == null ? void 0 : upperLocale.split("_")[0];
    const body = retained ?? {
      conversationId,
      ...assistant.shellPin ? { shellPin: assistant.shellPin } : {},
      requestId: crypto.randomUUID(),
      expectedSequence: sequence,
      ...reask ? { reask } : tap ? { tap } : text ? { text } : {},
      source: quizPageSource(),
      marketId: window.quiz_market_id == null ? void 0 : String(window.quiz_market_id),
      locale: locale || void 0,
      country: ((_b2 = window.quiz_country) == null ? void 0 : _b2.toUpperCase()) || void 0,
      language: language || void 0
    };
    try {
      const reply = await fetchReply(tap, body, text, reask);
      if (!reply || disposed) return;
      sequence = reply.sequence ?? sequence;
      chatId = reply.chatId ?? chatId;
      const responseId = reply.responseId;
      kernel.run.responseId = responseId;
      for (const [quiz2, run] of Object.entries(reply.quizzes ?? {}))
        if (run.responseId) quizResponses.set(quiz2, run.responseId);
      const currentChat = chatId;
      const quiz = reply.current;
      void quizCart(quiz ?? "").then((commerce) => commerce.tagCart(quiz ? responseId : void 0, currentChat)).catch(() => {
      });
      render(reply, !!tap || !!text || !!reask);
      if (text) messageInput.value = "";
    } catch {
      if (!disposed) showError(() => void turn(tap, body, text, reask));
    } finally {
      busy2 = false;
      if (!disposed) {
        typing == null ? void 0 : typing.remove();
        typing = void 0;
        if (pending2 && !pending2.querySelector("small")) {
          const status = create("small");
          status.textContent = requireValue(
            runtime.messages.assistantNotSent,
            "Compiled runtime message"
          );
          pending2.append(status);
          if (text) messageInput.value = text;
        }
        controls(false);
      }
    }
  };
  const fetchReply = async (tap, body, text, reask) => {
    var _a2, _b2;
    const response = (assistant == null ? void 0 : assistant.send) ? await assistant.send(JSON.stringify(body)) : await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...context2.preview ? { "X-Preview-Key": context2.preview.key } : {}
      },
      body: JSON.stringify(body),
      signal: controller.signal
    });
    if (disposed) return;
    if (response.status === 409 && (tap || text || reask)) {
      pending2 == null ? void 0 : pending2.remove();
      pending2 = void 0;
      typing == null ? void 0 : typing.remove();
      typing = void 0;
      busy2 = false;
      await turn();
      return;
    }
    if (!response.ok) {
      const after = response.headers.get("Retry-After");
      const wait = response.status === 429 ? Math.max(0, Number(after) * 1e3 || Date.parse(after ?? "") - Date.now() || 0) : 0;
      showError(() => void turn(tap, body, text, reask), wait);
      return;
    }
    const reply = await response.json();
    return {
      ...reply,
      ...reply.view ?? { messages: [], done: false },
      picks: reply.picks ?? null,
      quizVersionId: reply.current ? (_b2 = (_a2 = reply.quizzes) == null ? void 0 : _a2[reply.current]) == null ? void 0 : _b2.quizVersionId : void 0
    };
  };
  const cleanup = () => {
    endCall();
    cancelDictation();
    unsubscribeVoice();
    disposed = true;
    controller.abort();
    clearTimeout(timer);
    tracking == null ? void 0 : tracking.dispose();
    kernel.destroy();
    placementObserver.disconnect();
    shell.dispose();
    for (const commerce of quizCarts.values())
      void commerce.then((loaded2) => loaded2.dispose()).catch(() => {
      });
  };
  setup();
  const unsubscribeVoice = voiceStore.subscribe(paintCall);
  let started = false;
  const syncPlacement = () => {
    var _a2;
    const visible = host.getAttribute("placement") === "inline" || host.hasAttribute("open");
    const panel = root.querySelector("#assistant-panel");
    if (panel) panel.inert = !visible;
    if (!visible) {
      endCall();
      cancelDictation();
    }
    (_a2 = root.querySelector('[part~="assistant-launcher"]')) == null ? void 0 : _a2.setAttribute("aria-expanded", String(visible));
    if (visible && !started) {
      started = true;
      void turn();
    }
  };
  const placementObserver = new MutationObserver(syncPlacement);
  placementObserver.observe(host, { attributes: true, attributeFilter: ["placement", "open"] });
  syncPlacement();
  (_c = context2.onReady) == null ? void 0 : _c.call(context2);
  return () => {
    if (!disposed) cleanup();
  };
}
async function mountShopAssistant(host, assistantId, context2, signal) {
  var _a, _b, _c;
  const conversationId = storedConversationId(
    context2.shop ?? context2.myshopifyDomain ?? "",
    assistantId
  );
  const url = new URL(
    context2.proxy ? `/apps/rh-assistant/assistants/${encodeURIComponent(assistantId)}` : ASSISTANT_URL(assistantId, context2.myshopifyDomain ?? "", context2.shop),
    window.location.href
  );
  url.searchParams.set("conversationId", conversationId);
  const locale = context2.locale || window.quiz_locale;
  if (locale) url.searchParams.set("locale", locale);
  if (window.quiz_market_id != null)
    url.searchParams.set("marketId", String(window.quiz_market_id));
  const response = await fetch(url, { signal, cache: "no-store" });
  if (response.status === 404) return () => {
  };
  if (!response.ok) throw new Error(`Assistant unavailable (${response.status})`);
  const page = new DOMParser().parseFromString(await response.text(), "text/html");
  const id = requireValue(
    (_a = page.querySelector('meta[name="assistant"]')) == null ? void 0 : _a.content,
    "Assistant shell names its assistant"
  );
  const turnUrl = context2.proxy ? requireValue(
    (_b = page.querySelector('meta[name="assistant-turn"]')) == null ? void 0 : _b.content,
    "Proxy shell names its turn path"
  ) : void 0;
  return mountAssistantShell(host, page, {
    ...context2,
    customCode: false,
    assistant: {
      id,
      turnUrl,
      conversationId,
      shellPin: requireValue(
        (_c = page.querySelector('meta[name="assistant-shell-pin"]')) == null ? void 0 : _c.content,
        "Assistant shell pins its version"
      )
    }
  });
}
function getStorage(key) {
  try {
    const item = JSON.parse(localStorage.getItem(key) || "null");
    return item && Date.now() <= item.expiry ? item.value : null;
  } catch {
    return null;
  }
}
function setStorage(key, value, days) {
  try {
    localStorage.setItem(key, JSON.stringify({ value, expiry: Date.now() + days * 864e5 }));
  } catch {
  }
}
const popupCss = `
#prq-quiz-container { position:fixed; inset:0; width:100%; height:100%; display:flex; justify-content:center; align-items:center; background:rgba(0,0,0,.5); z-index:var(--quiz-z-index,100); overflow:auto; touch-action:manipulation; }
#prq-quiz-container .quiz-content { position:relative; border-radius:8px; box-shadow:0 2px 10px rgba(0,0,0,.1); width:var(--quiz-width,100%); height:var(--quiz-height,100%); max-height:100%; overflow:auto; background:white; z-index:var(--quiz-content-z-index,101); }
#prq-quiz-container .close-btn { position:absolute; top:10px; right:10px; background:none; border:0; padding:0; font-size:32px; line-height:32px; cursor:pointer; color:var(--close-btn-color,#777); z-index:var(--close-btn-z-index,102); }
@media(max-width:768px) { #prq-quiz-container .quiz-content { width:var(--quiz-width-mobile,var(--quiz-width,100%)); height:var(--quiz-height-mobile,var(--quiz-height,100%)); } }
body.revenuehunt-popup-open .react-dropdown-select-dropdown { z-index:var(--quiz-dropdown-z-index,103)!important; }
`;
function installStorefrontPieces(root, store, mountQuiz, assistantOnPage = false, platform = "woocommerce") {
  var _a, _b, _c;
  const controller = new AbortController();
  const { signal } = controller;
  const style = document.createElement("style");
  style.textContent = popupCss;
  document.head.append(style);
  let popup;
  let activeId;
  let openedByUrl = false;
  let releasePopup;
  let opener = null;
  const shownKey = (id) => `revenuehunt-popup-already-shown-quiz_${id}`;
  const completed = (id) => getStorage(`revenuehunt-responseId-quiz_${id}`);
  const close = (clearHash = true) => {
    if (!popup) return;
    popup.remove();
    popup = void 0;
    activeId = void 0;
    releasePopup == null ? void 0 : releasePopup();
    releasePopup = void 0;
    document.body.classList.remove("revenuehunt-popup-open");
    document.body.style.removeProperty("--quiz-dropdown-z-index");
    opener == null ? void 0 : opener.focus();
    if (clearHash && /^#quiz(?:-[A-Za-z0-9]+)?$/.test(location.hash))
      history.replaceState(null, "", location.pathname + location.search);
  };
  const open = (id, config = {}, source = "click") => {
    if (!id) return;
    setStorage(shownKey(id), true, 1);
    if (popup && source === "automatic") return;
    close(false);
    opener = document.activeElement;
    popup = document.createElement("div");
    const current2 = popup;
    activeId = id;
    openedByUrl = source === "url";
    popup.id = "prq-quiz-container";
    popup.className = "needsclick";
    popup.dataset.popupOwner = platform;
    const z = config.zIndex ?? 100;
    popup.style.setProperty("--quiz-z-index", String(z));
    popup.style.setProperty("--quiz-content-z-index", String(z + 1));
    popup.style.setProperty("--close-btn-z-index", String(z + 2));
    popup.style.setProperty("--close-btn-color", config.closeColor || "#777777");
    document.body.style.setProperty("--quiz-dropdown-z-index", String(z + 3));
    for (const [key, value] of Object.entries({
      width: config.width,
      height: config.height,
      "width-mobile": config.mobileWidth,
      "height-mobile": config.mobileHeight
    })) {
      const size = parseInt(value || "", 10);
      if (size > 0) popup.style.setProperty(`--quiz-${key}`, `${Math.min(size, 100)}%`);
    }
    const content = document.createElement("div");
    content.className = "quiz-content needsclick";
    content.setAttribute("role", "dialog");
    content.setAttribute("aria-modal", "true");
    content.setAttribute("aria-label", "Quiz");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "close-btn";
    button.setAttribute("aria-label", "Close quiz");
    button.textContent = "×";
    button.addEventListener("click", () => close());
    const host = document.createElement("div");
    host.style.cssText = "display:block;width:100%;height:100%";
    host.dataset.prqPopupQuiz = id;
    content.append(button, host);
    popup.append(content);
    popup.addEventListener("click", (event) => {
      if (event.target === current2) close();
    });
    document.body.classList.add("revenuehunt-popup-open");
    document.body.append(popup);
    button.focus();
    void mountQuiz(host, id, "modal").then((dispose) => {
      if (popup !== current2) dispose == null ? void 0 : dispose();
      else releasePopup = dispose;
    });
  };
  const focusables = (node) => Array.from(node.querySelectorAll("*")).flatMap((el) => [
    ...el.matches(
      'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'
    ) && !el.closest("[inert]") && el.getClientRects().length ? [el] : [],
    ...el.shadowRoot ? focusables(el.shadowRoot) : []
  ]);
  document.addEventListener(
    "keydown",
    (event) => {
      var _a2, _b2;
      if (!popup) return;
      if (event.key === "Escape" && !event.defaultPrevented && !event.isComposing && event.keyCode !== 229 && !event.composedPath().some(
        (el) => el instanceof Element && el.matches(
          'select,.react-dropdown-select-dropdown,.react-dropdown-select[aria-expanded="true"]'
        )
      ))
        close();
      if (event.key !== "Tab") return;
      const items = focusables(popup);
      let active = document.activeElement;
      while ((_a2 = active == null ? void 0 : active.shadowRoot) == null ? void 0 : _a2.activeElement) active = active.shadowRoot.activeElement;
      const index = items.indexOf(active);
      if (index < 0 || (event.shiftKey ? index === 0 : index === items.length - 1)) {
        event.preventDefault();
        (_b2 = event.shiftKey ? items.at(-1) : items[0]) == null ? void 0 : _b2.focus();
      }
    },
    { signal }
  );
  const targetFromHash = (hash) => /^#quiz(?:-([A-Za-z0-9]+))?$/.exec(hash);
  const linksEnabled = ((_a = store.siteWide) == null ? void 0 : _a.popupLinks) || Array.from(root.querySelectorAll("a.wp-element-button[href]")).some((a) => {
    const url = new URL(a.href, location.href);
    return url.origin === location.origin && url.pathname === location.pathname && url.search === location.search && targetFromHash(url.hash);
  });
  if (linksEnabled) {
    const sync = () => {
      const match = targetFromHash(location.hash);
      const id = match && (match[1] || store.defaultQuiz);
      if (id && !(openedByUrl && activeId === id)) open(id, {}, "url");
      else if (!id && openedByUrl) close(false);
    };
    document.addEventListener(
      "click",
      (event) => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
          return;
        const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null;
        if (!anchor || anchor.hasAttribute("download") || anchor.target && anchor.target !== "_self")
          return;
        const url = new URL(anchor.href, location.href);
        if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !targetFromHash(url.hash))
          return;
        event.preventDefault();
        if (location.hash !== url.hash) history.pushState(null, "", url.hash);
        sync();
      },
      { signal }
    );
    window.addEventListener("hashchange", sync, { signal });
    window.addEventListener("popstate", sync, { signal });
    sync();
  }
  const piece = (name, siteWide) => {
    const block = root.querySelector(`[data-prq-piece="${name}"]`);
    return block ? JSON.parse(block.dataset.prqConfig || "{}") : (siteWide == null ? void 0 : siteWide.enabled) ? siteWide : void 0;
  };
  const quizButton = piece("quizButton", (_b = store.siteWide) == null ? void 0 : _b.quizButton);
  const buttonQuizId = quizButton && (quizButton.quizId || store.defaultQuiz);
  let quizButtonHost;
  if (quizButton && buttonQuizId && !(quizButton.hideAfterCompletion && completed(buttonQuizId))) {
    quizButtonHost = document.createElement("div");
    const left = quizButton.position === "bottom-left";
    const bottom = assistantOnPage && !left ? 84 : 20;
    quizButtonHost.style.cssText = `position:fixed;bottom:${bottom}px;${left ? "left" : "right"}:20px;z-index:97;display:flex;align-items:center;gap:10px;flex-direction:${left ? "row" : "row-reverse"}`;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "revenuehunt-chat";
    button.setAttribute("aria-label", "Open quiz");
    button.style.cssText = "position:relative;display:grid;place-items:center;width:50px;height:50px;padding:12px;border:0;border-radius:25px;cursor:pointer;color:white;box-shadow:0 0 3px rgba(0,0,0,.1)";
    button.style.backgroundColor = quizButton.color || "#000000";
    button.innerHTML = '<svg viewBox="0 0 24 24" width="25" height="25" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" fill="none" stroke="currentColor" stroke-width="2"/></svg>';
    let dot;
    if (quizButton.showDot !== false && getStorage("revenuehunt-notification-closed") !== "true") {
      dot = document.createElement("span");
      dot.className = "revenuehunt-dot";
      dot.style.cssText = "position:absolute;right:0;top:0;width:10px;height:10px;background:#f50;border:2px solid white;border-radius:10px;box-sizing:content-box";
      button.append(dot);
    }
    quizButtonHost.append(button);
    let greeting;
    const dismissGreeting = () => {
      greeting == null ? void 0 : greeting.remove();
      setStorage("revenuehunt-greeting-closed", "true", 7);
    };
    if (quizButton.greeting && getStorage("revenuehunt-greeting-closed") !== "true") {
      greeting = document.createElement("div");
      greeting.className = "revenuehunt-greeting";
      greeting.style.cssText = "padding:8px;background:white;color:#666;font:12px Helvetica,Arial,sans-serif;border:1px solid #eee;border-radius:6px;box-shadow:0 0 3px rgba(0,0,0,.1)";
      greeting.textContent = quizButton.greeting + " ";
      const dismiss = document.createElement("button");
      dismiss.type = "button";
      dismiss.textContent = "×";
      dismiss.setAttribute("aria-label", "Dismiss greeting");
      dismiss.style.cssText = "border:0;background:none;color:inherit;cursor:pointer;padding:0 4px";
      dismiss.addEventListener("click", dismissGreeting);
      greeting.append(dismiss);
      quizButtonHost.append(greeting);
    }
    button.addEventListener("click", () => {
      dismissGreeting();
      dot == null ? void 0 : dot.remove();
      setStorage("revenuehunt-notification-closed", "true", 7);
      open(buttonQuizId, quizButton, "quiz-button");
    });
    document.body.append(quizButtonHost);
    if (quizButton.hideAfterCompletion)
      document.addEventListener(
        "quiz:complete",
        () => {
          if (completed(buttonQuizId)) quizButtonHost == null ? void 0 : quizButtonHost.remove();
        },
        { signal }
      );
  }
  const automatic = piece("automaticPopup", (_c = store.siteWide) == null ? void 0 : _c.automaticPopup);
  const autoId = automatic && (automatic.quizId || store.defaultQuiz);
  let timer;
  if (automatic && autoId) {
    const suppressed = () => getStorage(shownKey(autoId)) || completed(autoId);
    if (!suppressed()) {
      const startKey = `revenuehunt-popup-start-time-quiz_${autoId}`;
      if (!getStorage(startKey)) setStorage(startKey, Math.floor(Date.now() / 1e3), 1);
      const trigger = () => {
        if (!suppressed()) open(autoId, automatic, "automatic");
      };
      timer = setInterval(() => {
        const elapsed = Date.now() / 1e3 - Number(getStorage(startKey));
        if (elapsed >= (automatic.delaySeconds ?? 5)) trigger();
      }, 1e3);
      if (automatic.exitIntent)
        document.addEventListener(
          "mouseout",
          (event) => {
            if (event.relatedTarget === null && event.clientY <= 0) trigger();
          },
          { signal }
        );
    }
  }
  return () => {
    controller.abort();
    clearInterval(timer);
    close(false);
    quizButtonHost == null ? void 0 : quizButtonHost.remove();
    style.remove();
  };
}
const RUNTIME = 1;
function mountQuizAwaitingPreviewHostFrame(host, page, options) {
  return mountHtmlQuiz(host, page, options);
}
async function mountStore(root, store, platform) {
  var _a, _b, _c;
  const request = new AbortController();
  const cleanups = /* @__PURE__ */ new Set();
  const hosts = /* @__PURE__ */ new WeakMap();
  const seen = /* @__PURE__ */ new Map();
  const placements = [];
  let starting = true;
  const track = (pending2) => {
    if (starting) placements.push(pending2);
  };
  const context2 = {
    shop: store.shop,
    platform,
    // WordPress writes en_US; V2 takes language tags (en-US) and refuses the rest.
    locale: (_a = store.locale) == null ? void 0 : _a.replaceAll("_", "-")
  };
  const report = (error) => {
    if (request.signal.aborted) return;
    void __vitePreload(async () => {
      const { reportStorefrontError } = await import("./quiz-renderer-storefront-reporter-TqwI4yVH.js");
      return { reportStorefrontError };
    }, true ? __vite__mapDeps([11,2]) : void 0, import.meta.url).then(({ reportStorefrontError }) => reportStorefrontError(error, store.shop, platform)).catch(() => {
    });
  };
  const lifetime = (host) => {
    var _a2;
    (_a2 = hosts.get(host)) == null ? void 0 : _a2();
    const controller = new AbortController();
    const abort = () => controller.abort();
    request.signal.addEventListener("abort", abort, { once: true });
    let unmount;
    const dispose = () => {
      controller.abort();
      unmount == null ? void 0 : unmount();
      unmount = void 0;
      request.signal.removeEventListener("abort", abort);
      cleanups.delete(dispose);
      hosts.delete(host);
      seen.delete(host);
    };
    hosts.set(host, dispose);
    cleanups.add(dispose);
    return {
      signal: controller.signal,
      dispose,
      mounted(cleanup, placement) {
        if (controller.signal.aborted) return cleanup();
        unmount = cleanup;
        if (placement) seen.set(host, placement);
      }
    };
  };
  const mountQuiz = async (host, id, type) => {
    const { signal, dispose, mounted: mounted2 } = lifetime(host);
    host.setAttribute("aria-busy", "true");
    host.classList.add("needsclick");
    try {
      const copy = store.quizzes[id];
      const loaded2 = await loadArtifact(id, void 0, signal, void 0, {
        shop: store.shop,
        copy
      });
      if (loaded2.format !== "html") throw new Error("Storefront requires an HTML quiz");
      if (!await overPlanGate(host, store.overPlanAt ?? void 0, signal, "quiz", store.locale))
        return dispose;
      if (signal.aborted || !host.isConnected) return dispose;
      const height = /^(\d+(?:\.\d+)?)(px|vh)?$/.exec(
        (platform === "standalone" ? host.getAttribute("height") : host.dataset.prqHeight) || "600px"
      );
      const options = {
        ...context2,
        target: `quiz_${id}`,
        type,
        instanceId: `${platform === "woocommerce" ? "woo" : "standalone"}-${crypto.randomUUID()}`,
        quizInlineHeightEnabled: host.hasAttribute(
          platform === "standalone" ? "fixed-height" : "data-prq-fixed-height"
        ),
        quizHeight: height ? Number(height[1]) : 600,
        quizHeightUnit: (height == null ? void 0 : height[2]) || "px",
        customCode: !store.customFeaturesBlockedAt
      };
      if (host.hasAttribute(platform === "standalone" ? "full-width" : "data-prq-full-width")) {
        host.style.width = "100%";
        host.style.maxWidth = "none";
      }
      const unmount = platform === "woocommerce" && ((copy == null ? void 0 : copy.scripts) || ((copy == null ? void 0 : copy.runtime) ?? RUNTIME) > RUNTIME) ? mountQuizAwaitingPreviewHostFrame(host, loaded2.document, options) : mountHtmlQuiz(host, loaded2.document, options);
      mounted2(unmount, type === "inline" ? { kind: "inline", quizId: id } : void 0);
    } catch (error) {
      if (!signal.aborted) {
        report(error);
        host.textContent = "Quiz unavailable. Please try again later.";
      }
    } finally {
      host.removeAttribute("aria-busy");
    }
    return dispose;
  };
  const mountAssistant = async (host, id, placed = false) => {
    var _a2, _b2;
    if (!id) return;
    const { signal, mounted: mounted2 } = lifetime(host);
    host.setAttribute("assistant", "chat");
    try {
      if (!await overPlanGate(
        host,
        store.overPlanAt ?? void 0,
        signal,
        "assistant",
        store.locale
      ))
        return;
      if (signal.aborted) return;
      const src = (_b2 = (_a2 = store.assistants) == null ? void 0 : _a2[id]) == null ? void 0 : _b2.src;
      let page;
      if (src) {
        try {
          const response = await fetch(src, { signal });
          if (!response.ok) throw new Error(`Assistant copy: HTTP ${response.status}`);
          const parsed = new DOMParser().parseFromString(await response.text(), "text/html");
          if (!parsed.querySelector('script#quiz-runtime[type="application/json"]'))
            throw new Error("Invalid assistant shell");
          page = parsed;
        } catch (error) {
          if (signal.aborted) throw error;
          console.warn("[Storefront] Stored assistant unavailable; falling back to V2", error);
        }
      }
      if (signal.aborted || !host.isConnected) return;
      const options = { ...context2, type: "inline", target: `assistant_${id}` };
      const unmount = page ? mountAssistantShell(host, page, { ...options, assistant: { id } }) : await mountShopAssistant(host, id, options, signal);
      mounted2(unmount, placed ? { kind: "assistant", assistantId: id } : void 0);
    } catch (error) {
      if (!signal.aborted) report(error);
    }
  };
  let assistantHost;
  let assistantId = "";
  let bubble;
  const makeBubble = () => {
    bubble = document.createElement("div");
    bubble.setAttribute("placement", "bubble");
    document.body.append(bubble);
    return bubble;
  };
  {
    const [block, ...extraBlocks] = root.querySelectorAll("[data-prq-assistant]");
    for (const extra of extraBlocks) extra.remove();
    if (block) {
      assistantHost = block;
      assistantId = block.dataset.prqAssistant || store.defaultAssistant || "";
      document.body.append(block);
    } else if (((_c = (_b = store.siteWide) == null ? void 0 : _b.assistant) == null ? void 0 : _c.enabled) && store.defaultAssistant) {
      assistantHost = makeBubble();
      assistantId = store.defaultAssistant;
    }
    for (const host of root.querySelectorAll("[data-prq-quiz]")) {
      const id = host.dataset.prqQuiz || store.defaultQuiz;
      if (id) track(mountQuiz(host, id, "inline"));
    }
    if (assistantHost && assistantId) track(mountAssistant(assistantHost, assistantId));
  }
  cleanups.add(() => bubble == null ? void 0 : bubble.remove());
  cleanups.add(installStorefrontPieces(root, store, mountQuiz, !!assistantId, platform));
  await Promise.all(placements);
  starting = false;
  return () => {
    request.abort();
    for (const cleanup of cleanups) cleanup();
  };
}
const mounted = /* @__PURE__ */ new WeakSet();
async function mountWooStorefront(root) {
  var _a;
  const script = root.querySelector("#prq-v2-store");
  if (!script || mounted.has(script)) return;
  const store = JSON.parse(script.textContent || "{}");
  if (!((_a = store.shop) == null ? void 0 : _a.startsWith("wc-"))) throw new Error("Invalid WooCommerce storefront shop");
  mounted.add(script);
  const cleanup = await mountStore(root, store, "woocommerce");
  return () => {
    cleanup();
    mounted.delete(script);
  };
}
export {
  mountWooStorefront
};
