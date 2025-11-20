"use client";

import { useState, useMemo } from "react";
import Spline from "@splinetool/react-spline";
import { Lock, User, Signal as SignalIcon, CheckCircle } from "lucide-react";

function App() {
  // Auth states
  const [accountId, setAccountId] = useState("");
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  // VIP gating
  const [isVip, setIsVip] = useState(false);

  // Signals
  const [hacking, setHacking] = useState(false);
  const [currentSignal, setCurrentSignal] = useState(null);
  const [history, setHistory] = useState([]);

  const backendGlow = useMemo(
    () =>
      "shadow-[0_0_40px_-5px_rgba(56,189,248,0.35)] ring-1 ring-blue-500/30",
    []
  );

  const generateMultiplier = () => {
    const min = 1.5;
    const max = 4.0;
    const value = Math.random() * (max - min) + min;
    return `${value.toFixed(2)}x`;
  };

  const handleConnect = () => {
    if (!accountId || connecting) return;
    setConnecting(true);
    setConnected(false);
    setTimeout(() => {
      setConnecting(false);
      setConnected(true);
    }, 2000);
  };

  const handleGenerate = () => {
    if (hacking) return;
    setHacking(true);
    setTimeout(() => {
      const m = generateMultiplier();
      setCurrentSignal(m);
      setHistory((prev) => [m, ...prev].slice(0, 3));
      setHacking(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden">
      {/* Glow gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className={`h-9 w-9 rounded-lg bg-blue-500/10 ${backendGlow} flex items-center justify-center`}>
            <SignalIcon className="h-5 w-5 text-blue-400" />
          </div>
          <div className="text-xl tracking-widest font-light">
            <span className="text-slate-200">SIGNALS</span>{" "}
            <span className="font-extrabold text-blue-500">NOMA</span>
          </div>
        </div>

        {/* Hidden admin toggle */}
        <button
          title="Admin Test Toggle"
          onClick={() => setIsVip((v) => !v)}
          className="text-[10px] px-2 py-1 opacity-40 hover:opacity-100 transition rounded-md bg-white/5 backdrop-blur ring-1 ring-blue-500/20"
        >
          VIP: {isVip ? "ON" : "OFF"}
        </button>
      </nav>

      {/* Hero with Spline */}
      <section className="relative z-0">
        <div className="relative mx-auto max-w-6xl px-6">
          <div
            className={`relative h-[320px] sm:h-[420px] md:h-[520px] rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl ${backendGlow}`}
          >
            <Spline
              scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode"
              style={{ width: "100%", height: "100%" }}
            />
            {/* Overlay content */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-slate-950/40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
                Precision Betting Signals in{" "}
                <span className="text-blue-500">Cyber Mode</span>
              </h1>
              <p className="mt-3 max-w-2xl text-slate-300 text-sm sm:text-base">
                Tap into a futuristic engine that predicts high‑odds multipliers.
                Secure. Fast. Built for winners.
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                <span>Encrypted Access</span>
                <span className="mx-1 opacity-40">•</span>
                <span>VIP-Only Signals</span>
                <span className="mx-1 opacity-40">•</span>
                <span>Cyberpunk UI</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="relative z-10 mx-auto max-w-5xl px-6 pt-10 pb-24">
        {/* Authentication / Link Account */}
        <div className="grid md:grid-cols-2 gap-6">
          <div
            className={`rounded-2xl bg-white/5 backdrop-blur-xl p-5 ${backendGlow}`}
          >
            <div className="flex items-center gap-2 mb-3">
              <User className="h-5 w-5 text-blue-400" />
              <h2 className="text-sm font-semibold tracking-wide text-slate-200">
                Link 1Win / Aviator Account
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Enter Account ID..."
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                className="w-full rounded-lg bg-slate-900/70 border border-blue-500/20 focus:border-blue-500/50 outline-none px-4 py-3 text-sm placeholder:text-slate-500"
              />
              <button
                onClick={handleConnect}
                disabled={!accountId || connecting}
                className={`relative overflow-hidden rounded-lg px-4 py-3 text-sm font-semibold transition 
                ${!accountId || connecting
                    ? "bg-blue-500/30 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-500"} 
                text-white ring-1 ring-blue-400/40`}
              >
                {connecting ? "Connecting..." : connected ? "Re-link" : "Link"}
                <span className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0 animate-pulse" />
              </button>
            </div>

            <div className="mt-4 min-h-[28px]">
              {connecting && (
                <div className="flex items-center gap-2 text-blue-300 text-sm">
                  <span className="inline-block h-3 w-3 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />
                  Connecting to Database...
                </div>
              )}
              {!connecting && connected && (
                <div className="flex items-center gap-2 text-emerald-300 text-sm">
                  <CheckCircle className="h-4 w-4" />
                  Connected ✅
                </div>
              )}
            </div>

            <p className="mt-3 text-xs text-slate-400">
              Your ID is used to sync secure access and payouts. Keep it safe.
            </p>
          </div>

          {/* VIP Card */}
          <div
            className={`rounded-2xl bg-white/5 backdrop-blur-xl p-5 ${backendGlow}`}
          >
            <div className="flex items-center gap-2 mb-3">
              <Lock className={`h-5 w-5 ${isVip ? "text-emerald-400" : "text-blue-400"}`} />
              <h2 className="text-sm font-semibold tracking-wide text-slate-200">
                VIP Access
              </h2>
            </div>
            <p className="text-sm text-slate-300">
              Unlock premium signals with higher confidence multipliers.
            </p>

            {!isVip ? (
              <button
                onClick={() => {}}
                className="mt-4 w-full rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white py-3 font-semibold tracking-wide transition ring-1 ring-blue-400/30"
              >
                UNLOCK VIP (M-PESA)
              </button>
            ) : (
              <div className="mt-4 flex items-center gap-2 text-emerald-300 text-sm">
                <CheckCircle className="h-4 w-4" />
                VIP Active
              </div>
            )}
          </div>
        </div>

        {/* Signals Panel */}
        <div
          className={`mt-8 relative rounded-2xl bg-white/5 backdrop-blur-xl p-6 ${backendGlow}`}
        >
          <div className="flex items-center gap-2 mb-4">
            <SignalIcon className="h-5 w-5 text-blue-400" />
            <h3 className="text-sm font-semibold tracking-wide text-slate-200">
              Signal Generator
            </h3>
          </div>

          {/* VIP gating overlay */}
          {!isVip && (
            <>
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-2xl bg-slate-900/70 ring-1 ring-blue-500/30">
                    <Lock className="h-8 w-8 text-blue-400" />
                  </div>
                  <p className="mt-3 text-slate-300 text-sm">
                    VIP required to access live signals.
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Use the VIP button above to unlock.
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 rounded-2xl backdrop-blur-md bg-slate-950/20" />
            </>
          )}

          {/* Main generate area */}
          <div className={`${!isVip ? "pointer-events-none blur-sm" : ""}`}>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Current signal card */}
              <div className="md:col-span-2 rounded-xl border border-blue-500/20 bg-slate-900/40 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-slate-400">
                    Current Signal
                  </span>
                  {hacking && (
                    <span className="text-[10px] text-blue-300 flex items-center gap-2">
                      <span className="inline-flex h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                      Hacking...
                    </span>
                  )}
                </div>

                <div className="mt-4 h-28 rounded-xl bg-slate-950/40 border border-blue-500/10 flex items-center justify-center relative overflow-hidden">
                  {/* animated sheen */}
                  {hacking && (
                    <div className="absolute inset-0">
                      <div className="absolute -inset-x-20 -inset-y-10 rotate-12 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-[pulse_1.8s_ease-in-out_infinite]" />
                    </div>
                  )}
                  <div className="text-5xl font-extrabold tracking-tight">
                    <span
                      className={
                        currentSignal
                          ? "text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                          : "text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.35)]"
                      }
                    >
                      {currentSignal ? currentSignal : hacking ? "…" : "— — —"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={hacking}
                  className={`mt-5 w-full rounded-xl py-3 font-semibold tracking-wide transition relative overflow-hidden
                  ${hacking ? "bg-blue-500/30 cursor-wait" : "bg-blue-600 hover:bg-blue-500"} text-white ring-1 ring-blue-400/40`}
                >
                  {hacking ? "Hacking..." : "GENERATE SIGNAL"}
                  <span className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0 animate-pulse" />
                </button>
                <p className="mt-2 text-[11px] text-slate-400">
                  Range: 1.50x – 4.00x. Use responsibly.
                </p>
              </div>

              {/* History */}
              <div className="rounded-xl border border-blue-500/20 bg-slate-900/40 p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-wider text-slate-400">
                    Last 3 Signals
                  </span>
                </div>
                <div className="space-y-2">
                  {history.length === 0 && (
                    <div className="text-sm text-slate-500">
                      No signals yet. Generate your first one.
                    </div>
                  )}
                  {history.map((h, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-lg bg-slate-950/40 border border-blue-500/10 px-3 py-2"
                    >
                      <div className="flex items-center gap-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/80 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                        <span className="text-slate-300 text-sm">Signal</span>
                      </div>
                      <span className="font-semibold text-emerald-300">
                        {h}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer / Support */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <a
            href="#"
            className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3 text-sm font-semibold tracking-wide transition ring-1 ring-emerald-400/40"
          >
            Contact Admin on WhatsApp
          </a>
          <div className="text-xs text-slate-400">
            Secure Payments via M-Pesa & Airtel Money
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
