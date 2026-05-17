import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { HeroBars } from "@/components/site/HeroBars";
import { FeaturedTicker } from "@/components/site/FeaturedTicker";
import { CategoryCard } from "@/components/site/CategoryCard";
import { MagneticButton } from "@/components/site/MagneticButton";
import { CATEGORIES } from "@/lib/catalog";
import { useEffect, useState } from "react";
import { ArrowRight, Code2, Eye, Cpu } from "lucide-react";

export const Route = createFileRoute("/")({ component: Home });

const COMPLEXITIES = ["O(1)", "O(log n)", "O(n)", "O(n log n)", "O(n²)", "O(2ⁿ)"];

function Home() {
  const [cIdx, setCIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCIdx(i => (i + 1) % COMPLEXITIES.length), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <HeroBars />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent/10 blur-[120px] animate-[glow-drift_12s_ease-in-out_infinite]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-24 sm:py-32 lg:py-40">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/5 font-mono text-xs text-accent">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            live algorithm engine — v0.1
          </motion.div>

          <h1 className="mt-6 font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9]">
            {["Visualize.", "Understand.", "Master."].map((w, i) => (
              <motion.span key={w} initial={{ opacity: 0, y: 40, clipPath: "inset(100% 0 0 0)" }}
                animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0 0)" }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="block">
                {i === 2 ? <span className="text-accent">{w}</span> : w}
              </motion.span>
            ))}
          </h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="mt-8 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            SYNTAXIS turns every classic algorithm into a kinetic, step-through experience.
            Watch it. Scrub it. Or paste your own code — we&apos;ll detect the pattern and run it for you.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
            className="mt-10 flex flex-wrap gap-3 items-center">
            <Link to="/categories">
              <MagneticButton className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 rounded-md bg-accent text-accent-foreground font-mono text-sm font-semibold mint-glow">
                Explore algorithms <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </Link>
            <Link to="/lab" className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-border font-mono text-sm hover:border-accent/50 hover:text-accent transition-colors">
              <Code2 className="w-4 h-4" /> Open the Lab
            </Link>
            <div className="ml-2 font-mono text-xs text-muted-foreground hidden sm:flex items-center gap-2">
              currently visualizing
              <span className="text-accent inline-block w-16">{COMPLEXITIES[cIdx]}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <FeaturedTicker />

      {/* WHY */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-24">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Eye, t: "Watch it run", d: "Every step. Every comparison. Every swap, rendered at the speed you control." },
            { icon: Code2, t: "Paste your code", d: "Drop any implementation in the Lab — AI detects the algorithm and visualizes it for you." },
            { icon: Cpu, t: "Built for builders", d: "Designed for engineers who need intuition, not just textbook diagrams." },
          ].map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl border border-border bg-card">
              <f.icon className="w-6 h-6 text-accent" />
              <h3 className="mt-4 font-display text-xl font-bold">{f.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-24">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <div className="font-mono text-xs text-accent">// 01 — categories</div>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl font-black tracking-tight">Computational domains</h2>
          </div>
          <Link to="/categories" className="font-mono text-sm text-muted-foreground hover:text-accent flex items-center gap-1">
            see all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {CATEGORIES.map((c, i) => (
            <motion.div key={c.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.05 }}>
              <CategoryCard category={c} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* MISSION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-24">
        <div className="relative rounded-2xl border border-border bg-card p-8 sm:p-16 overflow-hidden">
          <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-accent/10 blur-[100px]" />
          <div className="relative max-w-3xl">
            <div className="font-mono text-xs text-accent">// mission</div>
            <h2 className="mt-3 font-display text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Code isn&apos;t static.<br />Neither should learning be.
            </h2>
            <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
              Most algorithm content is a wall of text and one frozen diagram. SYNTAXIS treats every algorithm as a story in time —
              with pointers, frames, and inflection points you can replay until it clicks.
            </p>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 font-mono text-sm text-accent">
              read more <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
