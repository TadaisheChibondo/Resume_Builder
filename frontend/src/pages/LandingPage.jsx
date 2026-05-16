import { useState, useEffect } from "react";

// ─── Monokai Palette ─────────────────────────────────────────
const mk = {
  bg: "#272822",
  bgPanel: "#1e1f1a",
  bgCard: "#2f3025",
  border: "#3e3d32",
  comment: "#75715E",
  fg: "#F8F8F2",
  red: "#F92672",
  orange: "#FD971F",
  yellow: "#E6DB74",
  green: "#A6E22E",
  cyan: "#66D9E8",
  purple: "#AE81FF",
};

// ─── Typewriter hook ──────────────────────────────────────────
function useTypewriter(lines, speed = 34) {
  const [displayed, setDisplayed] = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    if (lineIdx >= lines.length) {
      setDone(true);
      return;
    }
    const line = lines[lineIdx];
    if (charIdx < line.length) {
      const t = setTimeout(() => {
        setDisplayed((p) => p + line[charIdx]);
        setCharIdx((c) => c + 1);
      }, speed);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setDisplayed((p) => p + "\n");
        setLineIdx((l) => l + 1);
        setCharIdx(0);
      }, speed * 5);
      return () => clearTimeout(t);
    }
  }, [charIdx, lineIdx, lines, speed, done]);

  return displayed;
}

// ─── Syntax-coloured code block ───────────────────────────────
function CodeBlock() {
  const lines = [
    `// resume.engine.js — v1.0`,
    `const student = {`,
    `  name:   "Tadaishe Chibondo",`,
    `  degree: "B.Sc. Computer Science",`,
    `  stack:  ["React", "Django", "Flutter"],`,
    `  status: "seeking_attachment_2026",`,
    `};`,
    ``,
    `const resume = await engine`,
    `  .optimiseWithAI(student.experience)`,
    `  .applyTemplate("meridian")`,
    `  .exportPDF({ watermark: false });`,
    ``,
    `// ✓ ATS score: 94 / 100  🚀`,
  ];
  const text = useTypewriter(lines, 30);
  const rows = text.split("\n");

  const colorize = (line) => {
    if (line.trim().startsWith("//"))
      return [
        <span key="c" style={{ color: mk.comment }}>
          {line}
        </span>,
      ];
    const parts = line.split(
      /("(?:[^"\\]|\\.)*"|\b(?:const|await|return|true|false|null)\b|\b\d+\b)/g,
    );
    return parts.map((tok, i) => {
      if (/^"/.test(tok))
        return (
          <span key={i} style={{ color: mk.yellow }}>
            {tok}
          </span>
        );
      if (/^\d+$/.test(tok))
        return (
          <span key={i} style={{ color: mk.purple }}>
            {tok}
          </span>
        );
      if (/^(const|await|return|true|false|null)$/.test(tok))
        return (
          <span key={i} style={{ color: mk.red }}>
            {tok}
          </span>
        );
      return (
        <span key={i} style={{ color: mk.fg }}>
          {tok}
        </span>
      );
    });
  };

  return (
    <pre
      style={{
        fontFamily: "'JetBrains Mono','Fira Code','Cascadia Code',monospace",
        fontSize: "12.5px",
        lineHeight: "1.85",
        color: mk.fg,
        background: mk.bgPanel,
        border: `1px solid ${mk.border}`,
        borderRadius: "10px",
        padding: "24px 28px",
        overflowX: "auto",
        minHeight: "270px",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      }}
    >
      {rows.map((line, i) => (
        <div key={i}>
          {colorize(line)}
          {i === rows.length - 1 && (
            <span style={{ color: mk.green }} className="blink">
              █
            </span>
          )}
        </div>
      ))}
    </pre>
  );
}

// ─── Feature card ─────────────────────────────────────────────
function FeatureCard({ icon, accent, title, body }) {
  return (
    <div
      className="feat-card"
      style={{
        background: mk.bgCard,
        border: `1px solid ${mk.border}`,
        borderRadius: "14px",
        padding: "28px",
        position: "relative",
        overflow: "hidden",
        transition: "transform .2s, box-shadow .2s",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "3px",
          height: "100%",
          background: accent,
          borderRadius: "3px 0 0 3px",
        }}
      />
      <div
        style={{
          fontSize: "26px",
          marginBottom: "14px",
          background: `${accent}16`,
          width: "50px",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "10px",
          border: `1px solid ${accent}30`,
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          color: mk.fg,
          fontWeight: 700,
          fontSize: "15px",
          marginBottom: "8px",
        }}
      >
        {title}
      </h3>
      <p style={{ color: mk.comment, fontSize: "13.5px", lineHeight: "1.65" }}>
        {body}
      </p>
    </div>
  );
}

// ─── Mini resume previews ─────────────────────────────────────
const ClassicPreview = () => (
  <div style={{ fontFamily: "sans-serif", padding: "2px" }}>
    <div
      style={{
        textAlign: "center",
        borderBottom: "2px solid #333",
        paddingBottom: "5px",
        marginBottom: "6px",
      }}
    >
      <div
        style={{
          fontSize: "11px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        John Mawere
      </div>
      <div style={{ fontSize: "7px", color: "#666" }}>
        john@mail.com | +263 77 123 4567
      </div>
    </div>
    {["EDUCATION", "EXPERIENCE", "PROJECTS"].map((s) => (
      <div key={s} style={{ marginBottom: "4px" }}>
        <div
          style={{
            fontSize: "6.5px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "1px",
            borderBottom: "1px solid #ddd",
            marginBottom: "2px",
          }}
        >
          {s}
        </div>
        <div style={{ fontSize: "6px", color: "#444", lineHeight: "1.4" }}>
          Lorem ipsum dolor sit amet consectetur adipiscing...
        </div>
      </div>
    ))}
  </div>
);

const MeridianPreview = () => (
  <div style={{ display: "flex", height: "100%", fontFamily: "sans-serif" }}>
    <div
      style={{
        width: "36%",
        background: "#1b2537",
        padding: "7px",
        borderRadius: "4px 0 0 0",
      }}
    >
      <div
        style={{
          fontSize: "9px",
          fontWeight: 700,
          color: "#fff",
          lineHeight: "1.2",
          marginBottom: "3px",
        }}
      >
        John Mawere
      </div>
      <div
        style={{
          fontSize: "5.5px",
          color: "#c9a84c",
          textTransform: "uppercase",
          letterSpacing: "1px",
          marginBottom: "7px",
          borderBottom: "1px solid rgba(201,168,76,.2)",
          paddingBottom: "5px",
        }}
      >
        CV
      </div>
      <div style={{ fontSize: "5.5px", color: "#b0bac9" }}>john@mail.com</div>
      <div style={{ fontSize: "5.5px", color: "#b0bac9", marginTop: "2px" }}>
        +263 77 123 4567
      </div>
    </div>
    <div style={{ flex: 1, padding: "7px" }}>
      {["Profile", "Experience", "Projects"].map((s) => (
        <div key={s} style={{ marginBottom: "4px" }}>
          <div
            style={{
              fontSize: "6.5px",
              fontWeight: 700,
              color: "#1b2537",
              borderBottom: "1.5px solid #c9a84c",
              paddingBottom: "1px",
              marginBottom: "2px",
            }}
          >
            {s}
          </div>
          <div style={{ fontSize: "6px", color: "#444" }}>
            Lorem ipsum dolor sit amet...
          </div>
        </div>
      ))}
    </div>
  </div>
);

const MonolithPreview = () => (
  <div
    style={{
      fontFamily: "sans-serif",
      borderLeft: "4px solid #e63329",
      paddingLeft: "8px",
    }}
  >
    <div
      style={{
        borderBottom: "1px solid #111",
        paddingBottom: "5px",
        marginBottom: "5px",
      }}
    >
      <div
        style={{
          fontSize: "16px",
          fontWeight: 900,
          textTransform: "uppercase",
          letterSpacing: "2px",
          lineHeight: "1.05",
        }}
      >
        JOHN
      </div>
      <div
        style={{
          fontSize: "16px",
          fontWeight: 900,
          textTransform: "uppercase",
          letterSpacing: "2px",
          lineHeight: "1.05",
        }}
      >
        MAWERE
      </div>
      <div style={{ fontSize: "6.5px", color: "#555", marginTop: "3px" }}>
        john@mail.com | +263 77 123
      </div>
    </div>
    {["EXPERIENCE", "PROJECTS"].map((s) => (
      <div key={s} style={{ marginBottom: "4px", display: "flex", gap: "5px" }}>
        <div
          style={{
            fontSize: "5.5px",
            color: "#e63329",
            width: "38px",
            textAlign: "right",
            borderRight: "1px solid #ddd",
            paddingRight: "4px",
            flexShrink: 0,
          }}
        >
          2023–Now
        </div>
        <div style={{ fontSize: "6px", color: "#333" }}>
          Lorem ipsum dolor sit amet...
        </div>
      </div>
    ))}
  </div>
);

const VivantPreview = () => (
  <div style={{ fontFamily: "Georgia, serif" }}>
    <div
      style={{
        background: "#b85c38",
        padding: "8px",
        borderRadius: "3px",
        marginBottom: "5px",
      }}
    >
      <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff" }}>
        John Mawere
      </div>
      <div style={{ fontSize: "6.5px", color: "rgba(255,255,255,.82)" }}>
        john@mail.com · +263 77 123
      </div>
    </div>
    {["Profile", "Experience", "Projects"].map((s) => (
      <div key={s} style={{ marginBottom: "4px" }}>
        <div
          style={{
            fontSize: "7.5px",
            fontStyle: "italic",
            color: "#b85c38",
            borderBottom: "1px solid #b85c3840",
            marginBottom: "2px",
          }}
        >
          {s}
        </div>
        <div style={{ fontSize: "6px", color: "#4a3728" }}>
          Lorem ipsum dolor sit amet consectetur...
        </div>
      </div>
    ))}
  </div>
);

// ─── Template preview card ────────────────────────────────────
function TemplateCard({
  id,
  name,
  tag,
  accent,
  activeTemplate,
  setActiveTemplate,
  Preview,
}) {
  const selected = activeTemplate === id;
  return (
    <div
      onClick={() => setActiveTemplate(id)}
      style={{
        background: selected ? `${accent}12` : mk.bgCard,
        border: `2px solid ${selected ? accent : mk.border}`,
        borderRadius: "14px",
        padding: "18px",
        cursor: "pointer",
        transition: "all .2s",
        transform: selected ? "scale(1.025)" : "scale(1)",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "7px",
          padding: "10px",
          marginBottom: "12px",
          height: "138px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Preview />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "36px",
            background: "linear-gradient(transparent,rgba(255,255,255,.96))",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <p style={{ color: mk.fg, fontWeight: 700, fontSize: "13.5px" }}>
            {name}
          </p>
          <p
            style={{ color: mk.comment, fontSize: "11.5px", marginTop: "2px" }}
          >
            {tag}
          </p>
        </div>
        {selected && (
          <span
            style={{
              background: accent,
              color: mk.bgPanel,
              fontSize: "10px",
              fontWeight: 800,
              padding: "3px 9px",
              borderRadius: "20px",
            }}
          >
            SELECTED
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Step dot ─────────────────────────────────────────────────
function StepDot({ num, label, done }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        flex: 1,
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          width: "42px",
          height: "42px",
          borderRadius: "50%",
          background: done ? mk.cyan : mk.bgCard,
          border: `2px solid ${done ? mk.cyan : mk.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "14px",
          fontWeight: 800,
          color: done ? mk.bgPanel : mk.comment,
          transition: "all .35s",
          boxShadow: done ? `0 0 12px ${mk.cyan}66` : "none",
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        {done ? "✓" : num}
      </div>
      <span
        style={{
          color: done ? mk.fg : mk.comment,
          fontSize: "11.5px",
          fontWeight: done ? 600 : 400,
          textAlign: "center",
          lineHeight: "1.3",
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────
export default function LandingPage({ onGetStarted }) {
  const [activeTemplate, setActiveTemplate] = useState("meridian");
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveStep((s) => (s + 1) % 7), 1600);
    return () => clearInterval(t);
  }, []);

  const templates = [
    {
      id: "classic",
      name: "ATS Classic",
      tag: "Maximum parser compatibility",
      accent: mk.cyan,
      Preview: ClassicPreview,
    },
    {
      id: "meridian",
      name: "Meridian",
      tag: "Two-column, executive feel",
      accent: mk.purple,
      Preview: MeridianPreview,
    },
    {
      id: "monolith",
      name: "Monolith",
      tag: "Bold, brutalist, unforgettable",
      accent: mk.red,
      Preview: MonolithPreview,
    },
    {
      id: "vivant",
      name: "Vivant",
      tag: "Warm editorial, serif elegance",
      accent: mk.orange,
      Preview: VivantPreview,
    },
  ];

  const features = [
    {
      icon: "🤖",
      accent: mk.green,
      title: "AI Bullet Optimiser",
      body: 'Type casually — "I built the backend for our group project". The AI rewrites it into sharp, ATS-scoring bullets that sound like a senior engineer wrote them.',
    },
    {
      icon: "🎨",
      accent: mk.purple,
      title: "4 Premium Templates",
      body: "From brutalist Monolith to editorial Vivant. Every template is print-ready A4 HTML, rendered to pixel-perfect PDF via WeasyPrint on your Django server.",
    },
    {
      icon: "⚡",
      accent: mk.yellow,
      title: "Built for NUST Students",
      body: "Zero formal experience? Add coursework projects, freelance gigs, and hackathons. The AI frames them as professional, quantified achievements.",
    },
    {
      icon: "📱",
      accent: mk.orange,
      title: "EcoCash Unlock — $2.00",
      body: "Preview your full resume free. Pay $2 via EcoCash USSD push to strip the watermark and download your clean, recruiter-ready PDF.",
    },
    {
      icon: "🛡️",
      accent: mk.cyan,
      title: "ATS-Ready HTML Output",
      body: "Semantic templates that pass automated applicant tracking systems used by Econet, ZB Bank, OK Zimbabwe, and regional multinationals.",
    },
    {
      icon: "💾",
      accent: mk.red,
      title: "Auto-Saved Drafts",
      body: "No account needed. Every resume gets a UUID. Come back anytime with your link and your data is exactly where you left it.",
    },
  ];

  const steps = [
    "Fill Personal Info",
    "Add Education",
    "Add Experience",
    "List Projects",
    "Pick a Template",
    "Pay $2 EcoCash",
    "Download PDF 🎉",
  ];

  return (
    <div
      style={{
        background: mk.bg,
        minHeight: "100vh",
        color: mk.fg,
        fontFamily: "'DM Sans', system-ui, sans-serif",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700;900&family=JetBrains+Mono:wght@400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .blink { animation: blink 1s step-end infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .feat-card:hover { transform: translateY(-4px) !important; box-shadow: 0 20px 50px rgba(0,0,0,.45) !important; }
        .cta-btn { transition: transform .2s, box-shadow .2s; }
        .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 0 36px ${mk.green}55; }
        .ghost-btn { transition: background .2s; }
        .ghost-btn:hover { background: ${mk.bgCard} !important; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
        .float { animation: float 4.5s ease-in-out infinite; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .fu0 { animation: fadeUp .6s .0s both; }
        .fu1 { animation: fadeUp .6s .1s both; }
        .fu2 { animation: fadeUp .6s .2s both; }
        ::-webkit-scrollbar { width:6px; } ::-webkit-scrollbar-track { background:${mk.bgPanel}; }
        ::-webkit-scrollbar-thumb { background:${mk.border}; border-radius:3px; }
        a { text-decoration:none; }
      `}</style>

      {/* NAV */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: `${mk.bgPanel}ee`,
          backdropFilter: "blur(16px)",
          borderBottom: `1px solid ${mk.border}`,
          padding: "0 max(32px, 5vw)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "58px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "18px" }}>📄</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              fontSize: "14px",
              color: mk.green,
            }}
          >
            resume<span style={{ color: mk.yellow }}>.engine</span>
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>
          <a href="#features" style={{ color: mk.comment, fontSize: "13.5px" }}>
            Features
          </a>
          <a
            href="#templates"
            style={{ color: mk.comment, fontSize: "13.5px" }}
          >
            Templates
          </a>
          <a
            href="#how-it-works"
            style={{ color: mk.comment, fontSize: "13.5px" }}
          >
            How It Works
          </a>
          <button
            onClick={onGetStarted}
            className="cta-btn"
            style={{
              background: mk.green,
              color: mk.bgPanel,
              border: "none",
              borderRadius: "8px",
              padding: "8px 17px",
              fontSize: "13px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Build My Resume →
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section
        style={{
          position: "relative",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "90px max(32px,5vw) 80px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "56px",
          alignItems: "center",
        }}
      >
        {/* glows */}
        <div
          style={{
            position: "absolute",
            top: "5%",
            left: "0%",
            width: "340px",
            height: "340px",
            borderRadius: "50%",
            background: `${mk.green}0e`,
            filter: "blur(90px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "0%",
            right: "-5%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: `${mk.purple}0e`,
            filter: "blur(90px)",
            pointerEvents: "none",
          }}
        />

        {/* Left */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            className="fu0"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              background: `${mk.green}18`,
              border: `1px solid ${mk.green}44`,
              borderRadius: "20px",
              padding: "5px 14px",
              marginBottom: "22px",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: mk.green,
                display: "inline-block",
                boxShadow: `0 0 8px ${mk.green}`,
              }}
            />
            <span
              style={{
                color: mk.green,
                fontSize: "11.5px",
                fontWeight: 700,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              Built for ZW CS Students · 2026
            </span>
          </div>

          <h1
            className="fu1"
            style={{
              fontSize: "clamp(34px,4.5vw,54px)",
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: "-1.5px",
              marginBottom: "22px",
            }}
          >
            Your CV shouldn't
            <br />
            look like a{" "}
            <span
              style={{
                color: mk.green,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              Word doc.
            </span>
            <br />
            <span
              style={{ color: mk.comment, fontWeight: 400, fontSize: "0.65em" }}
            >
              It should look like you wrote it
            </span>
            <br />
            <span style={{ color: mk.yellow }}>in production.</span>
          </h1>

          <p
            className="fu2"
            style={{
              color: mk.comment,
              fontSize: "15px",
              lineHeight: 1.72,
              marginBottom: "32px",
              maxWidth: "430px",
            }}
          >
            Paste your casual project description. The AI turns it into
            ATS-grade bullets. Pick a premium template. Pay{" "}
            <strong style={{ color: mk.orange }}>$2 via EcoCash</strong> and
            download your watermark-free PDF — ready for attachment season.
          </p>

          <div
            className="fu2"
            style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
          >
            <button
              onClick={onGetStarted}
              className="cta-btn"
              style={{
                background: mk.green,
                color: mk.bgPanel,
                border: "none",
                borderRadius: "10px",
                padding: "13px 26px",
                fontSize: "14.5px",
                fontWeight: 800,
                cursor: "pointer",
                letterSpacing: "-0.2px",
              }}
            >
              Start Building — Free Preview ✦
            </button>
            <button
              className="ghost-btn"
              style={{
                background: "transparent",
                color: mk.fg,
                border: `1px solid ${mk.border}`,
                borderRadius: "10px",
                padding: "13px 22px",
                fontSize: "14.5px",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              See Templates ↓
            </button>
          </div>

          <div
            style={{
              display: "flex",
              gap: "28px",
              marginTop: "38px",
              paddingTop: "28px",
              borderTop: `1px solid ${mk.border}`,
            }}
          >
            {[
              ["4", mk.purple, "Templates"],
              ["AI", mk.green, "Bullet Writer"],
              ["$2", mk.orange, "EcoCash Unlock"],
              ["A4", mk.cyan, "PDF Export"],
            ].map(([v, c, l]) => (
              <div key={l}>
                <div
                  style={{
                    fontSize: "19px",
                    fontWeight: 900,
                    color: c,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {v}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: mk.comment,
                    marginTop: "2px",
                  }}
                >
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — animated code window */}
        <div className="float" style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              background: mk.bgPanel,
              border: `1px solid ${mk.border}`,
              borderRadius: "14px",
              overflow: "hidden",
              boxShadow: "0 40px 100px rgba(0,0,0,.6)",
            }}
          >
            {/* chrome bar */}
            <div
              style={{
                background: mk.bgCard,
                borderBottom: `1px solid ${mk.border}`,
                padding: "10px 16px",
                display: "flex",
                alignItems: "center",
                gap: "7px",
              }}
            >
              {["#FF5F57", "#FFBD2E", "#28CA41"].map((c) => (
                <span
                  key={c}
                  style={{
                    width: "11px",
                    height: "11px",
                    borderRadius: "50%",
                    background: c,
                    display: "block",
                  }}
                />
              ))}
              <span
                style={{
                  flex: 1,
                  textAlign: "center",
                  fontSize: "11px",
                  color: mk.comment,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                resume.engine/build
              </span>
            </div>
            <div style={{ padding: "22px 22px 22px" }}>
              <CodeBlock />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        style={{
          padding: "80px max(32px,5vw)",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: mk.green,
              fontSize: "11.5px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "3px",
              marginBottom: "12px",
            }}
          >
            // what it does
          </p>
          <h2
            style={{
              fontSize: "clamp(26px,3.5vw,40px)",
              fontWeight: 900,
              letterSpacing: "-1px",
              lineHeight: 1.12,
            }}
          >
            Everything a ZW student needs
            <br />
            <span style={{ color: mk.comment, fontWeight: 400 }}>
              to land their first attachment.
            </span>
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
            gap: "18px",
          }}
        >
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </section>

      {/* TEMPLATES */}
      <section
        id="templates"
        style={{
          background: mk.bgPanel,
          borderTop: `1px solid ${mk.border}`,
          borderBottom: `1px solid ${mk.border}`,
          padding: "80px max(32px,5vw)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: mk.purple,
                fontSize: "11.5px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "3px",
                marginBottom: "12px",
              }}
            >
              // templates
            </p>
            <h2
              style={{
                fontSize: "clamp(26px,3.5vw,40px)",
                fontWeight: 900,
                letterSpacing: "-1px",
              }}
            >
              Four templates.{" "}
              <span style={{ color: mk.purple }}>One that's yours.</span>
            </h2>
            <p
              style={{
                color: mk.comment,
                marginTop: "10px",
                fontSize: "14.5px",
              }}
            >
              Click to preview — all export as print-ready A4 PDFs.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
              gap: "16px",
            }}
          >
            {templates.map((t) => (
              <TemplateCard
                key={t.id}
                {...t}
                activeTemplate={activeTemplate}
                setActiveTemplate={setActiveTemplate}
              />
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        style={{
          padding: "80px max(32px,5vw)",
          maxWidth: "920px",
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: mk.cyan,
              fontSize: "11.5px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "3px",
              marginBottom: "12px",
            }}
          >
            // how it works
          </p>
          <h2
            style={{
              fontSize: "clamp(26px,3.5vw,40px)",
              fontWeight: 900,
              letterSpacing: "-1px",
            }}
          >
            Seven steps.{" "}
            <span style={{ color: mk.cyan }}>Under 10 minutes.</span>
          </h2>
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "flex-start",
            gap: "2px",
          }}
        >
          {/* track */}
          <div
            style={{
              position: "absolute",
              top: "20px",
              left: "4%",
              right: "4%",
              height: "2px",
              background: mk.border,
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "20px",
              left: "4%",
              width: `${(activeStep / 6) * 92}%`,
              height: "2px",
              background: mk.cyan,
              zIndex: 1,
              transition: "width .45s ease",
              boxShadow: `0 0 10px ${mk.cyan}`,
            }}
          />
          {steps.map((label, i) => (
            <StepDot key={i} num={i + 1} label={label} done={activeStep > i} />
          ))}
        </div>

        <p
          style={{
            textAlign: "center",
            color: mk.comment,
            fontSize: "12px",
            marginTop: "28px",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          ↑ live progress demo
        </p>
      </section>

      {/* CTA */}
      <section
        style={{
          background: mk.bgPanel,
          borderTop: `1px solid ${mk.border}`,
          padding: "80px max(32px,5vw)",
        }}
      >
        <div
          style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}
        >
          <div
            style={{
              background: mk.bgCard,
              border: `1px solid ${mk.border}`,
              borderRadius: "20px",
              padding: "52px 44px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-50px",
                right: "-50px",
                width: "220px",
                height: "220px",
                borderRadius: "50%",
                background: `${mk.orange}14`,
                filter: "blur(70px)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-50px",
                left: "-50px",
                width: "220px",
                height: "220px",
                borderRadius: "50%",
                background: `${mk.green}10`,
                filter: "blur(70px)",
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                display: "inline-block",
                background: `${mk.orange}22`,
                border: `1px solid ${mk.orange}44`,
                borderRadius: "20px",
                padding: "5px 15px",
                marginBottom: "18px",
                fontSize: "12px",
                color: mk.orange,
                fontWeight: 700,
                fontFamily: "'JetBrains Mono', monospace",
                position: "relative",
              }}
            >
              💸 One-time · No subscription · No account
            </div>

            <h2
              style={{
                fontSize: "clamp(28px,4vw,44px)",
                fontWeight: 900,
                letterSpacing: "-1.5px",
                lineHeight: 1.1,
                marginBottom: "16px",
                position: "relative",
              }}
            >
              Preview free.
              <br />
              Download for{" "}
              <span
                style={{
                  color: mk.orange,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                $2.00
              </span>
              .
            </h2>

            <p
              style={{
                color: mk.comment,
                fontSize: "14.5px",
                lineHeight: 1.7,
                marginBottom: "32px",
                position: "relative",
              }}
            >
              Build your entire resume and preview it with a watermark. When
              you're happy, send an{" "}
              <strong style={{ color: mk.fg }}>EcoCash USSD push</strong> and
              get your clean, professional PDF — no subscriptions, no hidden
              fees.
            </p>

            <div
              style={{
                display: "flex",
                gap: "8px",
                justifyContent: "center",
                marginBottom: "28px",
                flexWrap: "wrap",
                position: "relative",
              }}
            >
              {[
                "✅ Free preview",
                "✅ 4 templates",
                "✅ AI bullets",
                "✅ EcoCash payment",
                "✅ Watermark-free PDF",
              ].map((t) => (
                <span
                  key={t}
                  style={{
                    background: mk.bg,
                    border: `1px solid ${mk.border}`,
                    borderRadius: "8px",
                    padding: "6px 12px",
                    fontSize: "12.5px",
                    color: mk.fg,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            <button
              onClick={onGetStarted}
              className="cta-btn"
              style={{
                background: mk.green,
                color: mk.bgPanel,
                border: "none",
                borderRadius: "11px",
                padding: "15px 36px",
                fontSize: "15.5px",
                fontWeight: 800,
                cursor: "pointer",
                letterSpacing: "-0.3px",
                position: "relative",
                width: "100%",
                maxWidth: "360px",
              }}
            >
              Start Building — Free Preview ✦
            </button>
            <p
              style={{
                color: mk.comment,
                fontSize: "11.5px",
                marginTop: "13px",
                position: "relative",
              }}
            >
              No account required · Auto-saved to your UUID
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          borderTop: `1px solid ${mk.border}`,
          padding: "24px max(32px,5vw)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: mk.comment,
            fontSize: "12.5px",
          }}
        >
          <span style={{ color: mk.green }}>resume</span>
          <span style={{ color: mk.yellow }}>.engine</span>
          <span> — made for NUST students 🇿🇼</span>
        </span>
        <span style={{ color: mk.comment, fontSize: "12px" }}>
          Django · React · WeasyPrint · Paynow Zimbabwe
        </span>
      </footer>
    </div>
  );
}
