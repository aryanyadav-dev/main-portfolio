"use client";

import Image from "next/image";
import { Github, Linkedin, Mail, Bot, User, QrCode, X, ArrowRight, ArrowUpRight, Music, Pause } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { FaMedium } from "react-icons/fa";
import { ExperienceItem } from "./components/ExperienceItem";
import { GithubGraph } from "./components/GithubGraph";
import { TechStack } from "./components/TechStack";
import { useState, useEffect, useMemo, useRef } from "react";
import { useTheme } from "next-themes";
import { QRCodeSVG } from "qrcode.react";
import { ThemeToggle } from "./components/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

import { PomodoroTimer } from "./components/PomodoroTimer";
import { ScrollReveal } from "./components/ScrollReveal";

import { getMarkdownContent } from "./data/content";


export default function Home() {
  type Project = {
    title: string;
    role: string;
    description: string;
    tag: string;
    ongoing?: boolean;
    link?: string;
    contributors?: string[];
    moreContributors?: number;
    contributorProfiles?: {
      name: string;
      image: string;
      linkedin: string;
    }[];
  };

  const [time, setTime] = useState<string>("");
  const [showQR, setShowQR] = useState(false);
  const [mode, setMode] = useState<"human" | "agent">("human");

  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  const markdownContent = getMarkdownContent(time);

  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [isLofiPlaying, setIsLofiPlaying] = useState(false);
  const [lofiVolume, setLofiVolume] = useState(1);
  const lofiRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (lofiRef.current) {
      lofiRef.current.volume = lofiVolume;
    }
  }, [lofiVolume]);

  useEffect(() => {
    return () => {
      if (lofiRef.current) {
        lofiRef.current.pause();
        lofiRef.current = null;
      }
    };
  }, []);

  const toggleLofi = () => {
    if (!lofiRef.current) {
      lofiRef.current = new Audio("/lofi.mp3");
      lofiRef.current.loop = true;
      lofiRef.current.volume = lofiVolume;
    }

    if (isLofiPlaying) {
      lofiRef.current.pause();
    } else {
      lofiRef.current.play().catch(e => console.error("Lofi play failed:", e));
    }
    setIsLofiPlaying(!isLofiPlaying);
  };

  const [starPositions, setStarPositions] = useState<{ top: string; left: string; duration: number; delay: number }[]>([]);

  useEffect(() => {
    setStarPositions(
      [...Array(50)].map(() => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        duration: 2 + Math.random() * 3,
        delay: Math.random() * 5,
      }))
    );
  }, []);

  const projects: Project[] = [
    {
      title: "FrameFlow - Post Production Workflow Platform",
      role: "Post Production Platform",
      description:
        "Post-production in filmmaking, video production, and content creation involves multiple stages-editing, color correction, sound design, VFX, and final delivery. FrameFlow streamlines these workflows, offering task management, collaboration tools, file tracking, and cloud integration.",
      tag: "Post Production Platform",
      link: "https://github.com/aryanyadav-dev/post-prod-workflow-manager",
      contributorProfiles: [
        {
          name: "Chinmay Sawant",
          image: "/chinmay.jpeg",
          linkedin: "https://www.linkedin.com/in/chinmay-sawant-8b3282266/"
        }
      ]
    },
    {
      title: "Homewise Vision",
      role: "AR / Vision",
      description:
        "An AR companion for home builders that overlays 3D models on blueprints, simulates finishes in real time, and generates location-based cost estimates. Users can place furniture, compare materials, and export room plans for contractors, clients, and procurement.",
      tag: "AR / Vision",
      link: "https://homewisevision.vercel.app/",
      contributorProfiles: [
        {
          name: "Chinmay Sawant",
          image: "/chinmay.jpeg",
          linkedin: "https://www.linkedin.com/in/chinmay-sawant-8b3282266/"
        },
        {
          name: "Jash Damania",
          image: "/jash.jpg",
          linkedin: "https://www.linkedin.com/in/jash-damania-a61281266/"
        },
        {
          name: "Om Awadhoot",
          image: "/om.jpeg",
          linkedin: "https://www.linkedin.com/in/om-awadhoot/"
        },
        {
          name: "Bhargav S G",
          image: "/bhargav.jpeg",
          linkedin: "https://www.linkedin.com/in/bhargavsg/"
        }
      ]
    },
    {
      title: "Aeroverse XR",
      role: "XR Platform",
      description:
        "A web-based XR platform that blends AR visuals, interactive 3D models, and collaborative classrooms to bridge aerospace theory with hands-on exploration. Supports guided lessons, live annotations, shared simulations, and exportable lesson modules for educators.",
      tag: "XR Platform",
      link: "https://aeroverse-xr.vercel.app/",
      contributorProfiles: [
        {
          name: "Chinmay Sawant",
          image: "/chinmay.jpeg",
          linkedin: "https://www.linkedin.com/in/chinmay-sawant-8b3282266/"
        },
        {
          name: "Jash Damania",
          image: "/jash.jpg",
          linkedin: "https://www.linkedin.com/in/jash-damania-a61281266/"
        },
        {
          name: "Om Awadhoot",
          image: "/om.jpeg",
          linkedin: "https://www.linkedin.com/in/om-awadhoot/"
        },
        {
          name: "Bhargav S G",
          image: "/bhargav.jpeg",
          linkedin: "https://www.linkedin.com/in/bhargavsg/"
        }
      ]
    },
    {
      title: "VAULT OS",
      role: "Security OS",
      description:
        "Enterprise-grade system for secure data purging, advanced content analysis, and system diagnostics across sensitive environments. Combines policy-driven destruction, tamper-proof audit trails, and intelligent analytics to detect anomalies before they become incidents.",
      tag: "Security OS",
      link: "https://vault-lime.vercel.app/",
      contributorProfiles: [
        {
          name: "Tanmay Shinde",
          image: "/tanmay.jpeg",
          linkedin: "https://www.linkedin.com/in/tanmay-shinde-8a13b6170/"
        },
        {
          name: "Seher Sharik",
          image: "/seher.jpeg",
          linkedin: "https://www.linkedin.com/in/sehersharik/"
        },
        {
          name: "Aaryan Koradia",
          image: "/aaryan.jpeg",
          linkedin: "https://www.linkedin.com/in/aaryan-koradia/"
        },
        {
          name: "Chinmay Sawant",
          image: "/chinmay.jpeg",
          linkedin: "https://www.linkedin.com/in/chinmay-sawant-8b3282266/"
        },
        {
          name: "Unnat Malik",
          image: "/unnat.jpeg",
          linkedin: "https://www.linkedin.com/in/unnat-malik/"
        }
      ]
    },
    {
      title: "Ideator AI",
      role: "Founder Tools",
      description:
        "AI assistant for entrepreneurs that generates startup ideas, scores viability, and builds go-to-market plans using market signals and competitive benchmarks. Produces concise briefs, positioning drafts, and validation checklists with next-step recommendations.",
      tag: "Founder Tools",
      link: "https://github.com/aryanyadav-dev/Ideator-AI"
    },
    {
      title: "ShipGuard: Deploy Check CLI",
      role: "Developer Tools",
      description:
        "CLI tool that detects deployment risks like breaking APIs, destructive migrations, and coverage gaps. Ships with Jira/Confluence reporting, policy gates, and CI-friendly outputs for release managers and platform teams.",
      tag: "Developer Tools",
      link: "https://www.npmjs.com/package/deploy-check-cli"
    },
    {
      title: "Browser Render Debugger CLI",
      role: "Performance",
      description:
        "CLI-first performance profiler for Chromium-based browsers that detects rendering bottlenecks, layout shifts, and paint regressions. Integrates cleanly with CI/CD for continuous rendering performance checks and alerts.",
      tag: "Performance",
      link: "https://www.npmjs.com/package/render-debugger"
    },
    {
      title: "SOMA",
      role: "Motion Capture Platform",
      description:
        "Enterprise-grade React Native application for real-time motion capture with 17 IMU sensors, AI-based pose processing, and proximity-based streaming. The system fuses sensor feeds into stable full-body pose data, streams sessions to nearby clients with low jitter, and supports live monitoring for training workflows. Achieves 120Hz throughput with <50ms glass-to-glass latency while maintaining reliable performance on production mobile hardware.",
      tag: "React Native + AI",
      link: "https://github.com/aryanyadav-dev/soma-mocap-apk",
      contributorProfiles: [
        {
          name: "Chinmay Sawant",
          image: "/chinmay.jpeg",
          linkedin: "https://www.linkedin.com/in/chinmay-sawant-8b3282266/"
        }
      ]
    }
  ];

  return (
    <div className={`relative flex min-h-screen flex-col items-center bg-white dark:bg-black px-3 pt-1 text-black dark:text-white selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black pb-32 sm:px-4 sm:pt-2 sm:pb-40 overflow-x-hidden transition-colors duration-300`}>
      {/* Easter Egg Effects */}
      <AnimatePresence>
        {showEasterEgg && (
          <>
            {/* Bluish Aura Edge Effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] pointer-events-none shadow-[inset_0_0_150px_rgba(29,78,216,0.5)] dark:shadow-[inset_0_0_150px_rgba(59,130,246,0.4)] transition-opacity duration-1000"
            />
            {/* Twinkling Stars Background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
            >
              {starPositions.map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute h-[2px] w-[2px] bg-blue-500 dark:bg-white rounded-full shadow-[0_0_4px_rgba(59,130,246,0.8)] dark:shadow-[0_0_3px_white]"
                  style={{
                    top: pos.top,
                    left: pos.left,
                  }}
                  animate={{
                    opacity: [0.2, 1, 0.2],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: pos.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: pos.delay,
                  }}
                />
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* Theme Toggle in Top Right */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <AnimatePresence mode="wait">
        {mode === "agent" ? (
          /* Agent Mode - Markdown View */
          <motion.main
            key="agent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex w-full max-w-2xl flex-col items-start text-left px-4 sm:px-0"
          >
            <pre
              className="w-full whitespace-pre-wrap font-mono text-sm leading-relaxed text-black dark:text-gray-300 selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black antialiased"
              style={{ fontFamily: '"Courier New", Courier, "Lucida Sans Typewriter", "Lucida Console", monospace' }}
            >
              {markdownContent}
            </pre>
          </motion.main>
        ) : (
          /* Human Mode - Original View */
          <motion.main
            key="human"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex w-full max-w-2xl flex-col items-center text-center"
          >
            {/* Profile Image - Easter Egg Trigger */}
            <button
              onClick={() => setShowEasterEgg(!showEasterEgg)}
              className="group relative -translate-y-4 mb-0 h-72 w-72 sm:h-80 sm:w-80 overflow-visible cursor-pointer transition-transform duration-500 active:scale-95"
              aria-label="Toggle Aura Mode"
            >
              <div className="relative h-full w-full overflow-hidden [mask-image:linear-gradient(to_bottom,black_90%,transparent)]">
                <Image
                  src="/me.png"
                  alt="Aryan Yadav Profile"
                  fill
                  unoptimized
                  className={`object-cover transition-transform duration-700 ${showEasterEgg ? 'scale-105' : ''}`}
                  priority
                />
              </div>

              {/* Subtle Glow on Hover */}
              <div className="absolute inset-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_20px_rgba(59,130,246,0.3)] rounded-full pointer-events-none" />
            </button>

            {/* Hero Text */}
            <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-7xl ml-6 sm:ml-8">
              Aryan Yadav
            </h1>

            {/* Phonetic Pronunciation (Aesthetic touch often found in minimal portfolios) */}
            <div className="mb-8 flex flex-wrap items-center justify-center gap-2 text-xs text-gray-400 dark:text-gray-500 sm:text-sm">
              <span>engineer - musician</span>
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <span>noun</span>
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="tabular-nums text-xs sm:text-sm">{time || "00:00:00"}</span>
                  <span className="text-[10px] uppercase tracking-wider sm:text-xs">IST</span>
                </div>

                <span className="text-gray-300 dark:text-gray-700">•</span>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-tight text-gray-400">lofi</span>
                  <button
                    onClick={toggleLofi}
                    className="flex h-5 w-5 items-center justify-center rounded-full transition-all hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-400 hover:text-black dark:hover:text-white"
                    aria-label={isLofiPlaying ? "Pause Lofi" : "Play Lofi"}
                  >
                    {isLofiPlaying ? <Pause size={10} fill="currentColor" /> : <Music size={10} />}
                  </button>
                  <AnimatePresence>
                    {isLofiPlaying && (
                      <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 40, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        className="flex h-5 items-center overflow-hidden"
                      >
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={lofiVolume}
                          onChange={(e) => setLofiVolume(parseFloat(e.target.value))}
                          className="h-[2px] w-8 cursor-pointer appearance-none rounded-full bg-gray-200 dark:bg-zinc-800 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-400 dark:[&::-webkit-slider-thumb]:bg-zinc-500 hover:[&::-webkit-slider-thumb]:bg-black dark:hover:[&::-webkit-slider-thumb]:bg-white [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:h-2 [&::-moz-range-thumb]:w-2 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gray-400 dark:[&::-moz-range-thumb]:bg-zinc-500 hover:[&::-moz-range-thumb]:bg-black dark:hover:[&::-moz-range-thumb]:bg-white transition-all"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="w-full space-y-4 text-left text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:text-lg md:text-xl">
              <p>
                a full-stack developer and <a href="https://en.wikipedia.org/wiki/Product_design" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-black dark:hover:text-white transition-colors">product builder</a> with deep experience across engineering, product strategy, and user-centric design.
              </p>
              <p>
                a <a href="https://en.wikipedia.org/wiki/Polymath" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-black dark:hover:text-white transition-colors">polymath</a> who bridges technical architecture with business outcomes to create impactful, scalable solutions.
              </p>
            </div>

            {/* Experience Section */}
            <ScrollReveal className="mt-12 mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Experience
              </h2>
              <div className="inline-block w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 dark:border-zinc-800 dark:bg-black">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="-ml-1 inline-flex w-fit items-center rounded-lg border border-gray-200 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-black dark:border-zinc-800 dark:text-white">
                      Open To
                    </div>
                    <span className="text-xs font-semibold text-black dark:text-white">
                      Remote / Hybrid
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-black dark:text-white">
                      Open to product and AI roles with ownership
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                      Looking for teams where I can shape roadmap, ship fast, and own outcomes from discovery to launch.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {["Product Manager", "Associate PM", "AI Engineer", "AI Product Engineer", "Founding PM"].map((role) => (
                      <div
                        key={role}
                        className="inline-flex w-fit rounded-lg border border-gray-200 bg-white px-2.5 py-2 dark:border-zinc-800 dark:bg-zinc-950"
                      >
                        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-600 dark:text-gray-300">
                          {role}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href="mailto:aryanayadav.works@gmail.com"
                      className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-700 transition-colors hover:text-black dark:border-zinc-800 dark:text-gray-300 dark:hover:text-white"
                    >
                      <Mail size={14} />
                      Email
                    </a>
                    <a
                      href="https://www.linkedin.com/in/-aryanyadav/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-700 transition-colors hover:text-black dark:border-zinc-800 dark:text-gray-300 dark:hover:text-white"
                    >
                      <Linkedin size={14} />
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Projects Section */}
            <div className="mb-16 w-full text-left">
              <ScrollReveal>
                <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                  Projects
                </h2>
              </ScrollReveal>
              <div className="space-y-12">
                {projects.map((project, index) => (
                  <ScrollReveal key={project.title} delay={index * 0.05}>
                    <ExperienceItem
                      key={project.title}
                      title={project.title}
                      role={project.role ?? project.tag ?? ""}
                      collapsible={true}
                      collapsedHeight="max-h-24"
                      titleClassName="text-lg"
                    >
                      <div className="space-y-4">
                        <p>{project.description}</p>

                        <div className="flex w-full max-w-[350px] items-center justify-between gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm transition-all duration-300 hover:border-gray-200 dark:border-zinc-900 dark:bg-zinc-950/70 dark:hover:border-zinc-800 group-data-[collapsed=true]:hidden">
                          <div className="min-w-0">
                            <div className="truncate text-sm font-semibold text-black dark:text-white">
                              {project.title}
                            </div>
                            <div className="mt-1 flex items-center gap-2 text-[11px] text-gray-400 dark:text-gray-500">
                              <span className="truncate">{project.role.replace(" · Ongoing", "")}</span>
                              {project.ongoing ? (
                                <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                                  <span className="relative flex h-1 w-1">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                                    <span className="relative inline-flex h-1 w-1 rounded-full bg-emerald-500" />
                                  </span>
                                  Ongoing
                                </span>
                              ) : null}
                            </div>
                          </div>
                          {project.link ? (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex shrink-0 items-center gap-1 rounded-full border border-gray-200 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-700 transition-colors hover:text-black dark:border-zinc-800 dark:text-gray-300 dark:hover:text-white"
                              aria-label={`View ${project.title}`}
                            >
                              View
                              <ArrowUpRight size={10} />
                            </a>
                          ) : (
                            <button
                              type="button"
                              className="inline-flex shrink-0 items-center gap-1 rounded-full border border-gray-200 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500 transition-colors hover:text-black dark:border-zinc-800 dark:text-gray-500 dark:hover:text-white"
                              aria-label={`View ${project.title}`}
                            >
                              View
                              <ArrowUpRight size={10} />
                            </button>
                          )}
                        </div>

                        {project.contributorProfiles?.length ? (
                          <div className="group-data-[collapsed=true]:hidden">
                            <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                              Other contributors
                            </div>
                            <div className="mt-2 flex -space-x-2.5">
                              {project.contributorProfiles.map((contributor) => (
                                <a
                                  key={`${project.title}-contrib-${contributor.name}`}
                                  href={contributor.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={contributor.name}
                                  className="relative block h-10 w-10 overflow-hidden rounded-full border-2 border-white shadow-sm dark:border-black"
                                >
                                  <Image
                                    src={contributor.image}
                                    alt={contributor.name}
                                    fill
                                    sizes="40px"
                                    className="object-cover"
                                  />
                                </a>
                              ))}
                            </div>
                          </div>
                        ) : project.contributors?.length ? (
                          <div className="group-data-[collapsed=true]:hidden">
                            <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                              Other contributors
                            </div>
                            <div className="mt-2 flex -space-x-2.5">
                              {project.contributors.map((initials, index) => (
                                <div
                                  key={`${project.title}-contrib-${initials}-${index}`}
                                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gray-100 text-xs font-semibold text-gray-600 shadow-sm dark:border-black dark:bg-zinc-900 dark:text-gray-300"
                                >
                                  {initials}
                                </div>
                              ))}
                              {project.moreContributors ? (
                                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gray-200 text-xs font-semibold text-gray-600 shadow-sm dark:border-black dark:bg-zinc-800 dark:text-gray-300">
                                  +{project.moreContributors}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </ExperienceItem>
                  </ScrollReveal>
                ))}
              </div>
            </div>


            {/* In Between These Experiences Section */}
            <ScrollReveal className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                In Between These Experiences
              </h2>
              <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8">
                <ExperienceItem
                  title="The Product Building Journey"
                  role=""
                  collapsible={true}
                >
                  <div className="space-y-4">
                    <p>I&apos;ve always approached building from a product lens first: what is the unique proposition, which pain is urgent enough to solve, and can this grow from a feature into a real business. That mindset made me obsess less over just shipping code and more over building something with clear market pull.</p>

                    <p>Hackathons played a huge role in shaping how I build products under pressure. Building <span className="font-medium">AeroVerse XR</span> was especially demanding because it required integrating AI workflows with an AR/VR stack on the Unity game engine while keeping the product usable and performant. Through programs like Smart India Hackathon, I also iterated aggressively on ideas such as <span className="font-medium">VAULT OS</span>, which strengthened my ability to validate a proposition quickly, prioritize what matters, and convert complex concepts into practical product decisions.</p>

                    <p>That phase also taught me a hard lesson: technical depth alone doesn&apos;t create a product. A product needs positioning, distribution, repeat usage, and a strong reason to exist in a crowded market.</p>

                    <p>During this journey, I came across <span className="font-medium">Y Combinator Startup School</span> and started exploring startup culture more seriously. Its clarity around user-first iteration, tight feedback loops, and ruthless focus on solving one painful problem influenced how I evaluate and prioritize ideas.</p>

                    <p>From there, I began structuring my builds with product discipline: defining core hypotheses, validating with real users, measuring what moves retention, and iterating weekly with clear goals. That shift changed how I work, from building interesting things to building outcomes.</p>

                    <p>Towards the end of <span className="font-medium">2025</span>, I transitioned into building internal developer tooling, especially CLI-first workflows. Tools like <span className="font-medium">ShipGuard</span> and <span className="font-medium">Browser Render Debugger</span> came out of real operational pain and were designed for immediate utility inside engineering teams.</p>

                    <p className="font-medium text-black">Today, my product journey is a balance of startup curiosity and execution rigor: find a sharp problem, craft a unique wedge, and scale it into something that users rely on.</p>
                  </div>
                </ExperienceItem>
              </div>
            </ScrollReveal>


            {/* Education Section */}
            <ScrollReveal className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Education
              </h2>
              <div className="space-y-12">
                <ExperienceItem
                  title="Thakur College of Engineering and Technology"
                  role="Computer Engineering"
                >
                  <p>2023 - Surviving</p>
                </ExperienceItem>
              </div>
            </ScrollReveal>

            {/* Contributions Section */}
            <ScrollReveal className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                GitHub Contributions
              </h2>
              <GithubGraph />
            </ScrollReveal>

            {/* Research Publications Section */}
            <ScrollReveal className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Research Publications
              </h2>
              <div className="space-y-12">
                <ExperienceItem
                  title="Unified Computational Framework for Multi-Modal Human Motion Capture and Processing"
                  role=""
                  collapsible={true}
                  collapsedHeight="max-h-40"
                >
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-400 dark:text-gray-500 font-medium">
                        MulticonW 2026
                      </p>
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                        <p className="text-gray-600 dark:text-gray-400">Authors: Aryan Yadav; Chinmay Sawant; Abhinav Singh</p>
                        <a
                          href=""
                          className="inline-flex items-center text-xs font-medium text-black dark:text-white underline underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          View Publication
                        </a>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500 font-bold">Abstract</p>
                      <p className="text-gray-600 dark:text-gray-400">The rapid growth of motion-driven systems in entertainment, biomechanics, robotics, and HCI demands scalable, unified human motion intelligence beyond lab settings. We propose an end-to-end architecture integrating multimodal motion capture (IMUs, vision, hybrids), neural representation learning, real-time style transfer, and cross-platform deployment. It separates motion structure from style for controlled generation, skeletal transfers, and real-time adjustments—ensuring temporal consistency, high resolution, and biomechanical realism. The framework emphasizes responsible AI via curated, consented datasets and transparent training aligned with governance standards.</p>
                    </div>
                  </div>
                </ExperienceItem>
                <ExperienceItem
                  title="Real Time Aerospace Simulation in Spatial Computing"
                  role=""
                  collapsible={true}
                  collapsedHeight="max-h-40"
                >
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                        <p className="text-gray-600 dark:text-gray-400">Authors: Aryan Yadav; Chinmay Sawant; Om Awadhoot</p>
                        <a
                          href=""
                          className="inline-flex items-center text-xs font-medium text-black dark:text-white underline underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          View Publication
                        </a>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500 font-bold">Abstract</p>
                      <p className="text-gray-600 dark:text-gray-400">This paper presents an AI-enhanced, multi-user augmented reality (AR) training system for aerospace applications. The system integrates ORB-SLAM2 for real-time localization, Unity 3D and AR Foundation for simulation, and Gemini AI for intelligent troubleshooting. Monocular RGB-based tracking enables shared virtual object placement, ensuring spatial consistency across users, while a central server synchronizes avatars and interactions in real time. Deep learning-based depth estimation improves occlusion handling, and physics simulations enhance realism. With GPU acceleration and Firebase-based cloud networking, the system delivers immersive, efficient, and collaborative avionics training. The proposed framework demonstrates a scalable approach to next-generation aerospace training environments.</p>
                    </div>
                  </div>
                </ExperienceItem>
              </div>
            </ScrollReveal>

            {/* Tech Stack Section */}
            <ScrollReveal className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Tech Stack
              </h2>
              <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
                I&apos;m a generalist at heart who can build with anything, but here&apos;s the core stack I&apos;ve spent the most time with:
              </p>
              <TechStack />
            </ScrollReveal>

            {/* Resume Section */}
            <ScrollReveal className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Resume
              </h2>
              <div className="flex flex-col gap-4">
                <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
                  Check out my detailed resume to see my full work history, skills, and accomplishments.
                </p>
                <a
                  href="https://drive.google.com/file/d/19EY3hf6_gP_oCNI26Wy1m2sJfOWIMe-_/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 w-fit px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors font-medium text-xs uppercase tracking-wider"
                >
                  View Resume
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </ScrollReveal>

            {/* Videos Section */}
            <ScrollReveal className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Explainer Videos
              </h2>
              <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
                I kinda built a Claude Code for Jira and Confluence here&apos;s a video about it...
              </p>
              <div className="group aspect-video w-full overflow-hidden rounded-xl border border-gray-100 dark:border-gray-900 bg-gray-50 dark:bg-gray-950 shadow-sm transition-all hover:shadow-md duration-500">
                <iframe
                  src="https://www.youtube.com/embed/xhio4FN8gds"
                  title="Claude Code for Jira and Confluence"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="h-full w-full grayscale transition duration-500 ease-out group-hover:grayscale-0 group-hover:saturate-125"
                />
              </div>
            </ScrollReveal>

            {/* Writings & Blogs Section */}
            <ScrollReveal className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Writings & Blogs
              </h2>
              <p className="w-full text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                I host my thoughts on{" "}
                <a
                  href="https://medium.com/@aryanyadavblogs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-black dark:text-white underline underline-offset-4 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
                >
                  Medium
                </a>{" "}
                rather than building a custom site. Instead of overengineering, I sidestep reinventing the wheel to channel my energy into blending sharp takes on AI systems, product strategy, and technical architecture with bold dives into filmmaking craft, music composition, and production.
              </p>
            </ScrollReveal>

            {/* Library Section */}
            <ScrollReveal className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Library
              </h2>

              {/* Casual Reads Subsection */}
              <div className="mb-4">
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-600">
                  Casual Reads
                </h3>
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                  {[
                    { title: "Hooked: How to Build Habit-Forming Products", author: "Nir Eyal" },
                    { title: "The Lean Startup", author: "Eric Ries" },
                    { title: "Zero to One", author: "Peter Thiel" },
                    { title: "The Almanack of Naval Ravikant", author: "Eric Jorgenson" },
                    { title: "Deep Work", author: "Cal Newport" },
                    { title: "Limitless", author: "Jim Kwik" }
                  ].map((book) => (
                    <div key={book.title} className="group flex flex-col gap-1 transition-all">
                      <span className="text-sm font-medium text-black dark:text-white group-hover:underline underline-offset-4 decoration-gray-200 dark:decoration-gray-800 transition-all">
                        {book.title}
                      </span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        {book.author}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Note */}
              <p className="mt-6 text-xs italic text-gray-400 dark:text-gray-500">
                *and many more, these are just one of my best reads
              </p>
            </ScrollReveal>

            {/* Thing about me Section */}
            <ScrollReveal className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Thing about me
              </h2>
              <div className="space-y-6">
                <p className="w-full text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                  Beyond engineering and build systems, I find balance in the tactile and the thoughtful. Whether it&apos;s exploring the nuances of complex architectures or spending time in the real world, my approach to life is driven by curiosity and a desire to understand how things work at their core.
                </p>

                <p className="w-full text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                  I believe that the best products are built by people who have a diverse range of interests. It&apos;s the unique combination of technical depth and human perspective that allows us to create technology that actually resonates.
                </p>
              </div>
            </ScrollReveal>

            {/* Get in Touch Section */}
            <ScrollReveal className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400">
                Get in Touch
              </h2>
              <div className="space-y-4">
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Connect with me on{" "}
                  <a
                    href="https://www.linkedin.com/in/-aryanyadav/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black dark:text-white underline underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    LinkedIn
                  </a>{" "}
                  or{" "} shoot an {" "}
                  <a
                    href="mailto:aryanayadav.works@gmail.com"
                    className="text-black dark:text-white underline underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    email
                  </a>
                </p>
              </div>
            </ScrollReveal>

            {/* Pomodoro Timer Section */}
            <PomodoroTimer />



          </motion.main>
        )}
      </AnimatePresence>

      {/* Glass Island Navbar */}
      <nav className="fixed bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-gray-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/80 px-4 py-3 shadow-sm backdrop-blur-md transition-all hover:bg-white/90 dark:hover:bg-zinc-900 sm:gap-6 sm:px-6">
        {/* Mode Toggle Switch */}
        <div className="flex items-center">
          <button
            onClick={() => setMode(mode === "human" ? "agent" : "human")}
            className="group relative flex h-7 w-12 cursor-pointer rounded-full bg-gray-200 dark:bg-zinc-700 p-1 transition-colors duration-200 ease-in-out hover:bg-gray-300 dark:hover:bg-zinc-600 focus:outline-none"
            role="switch"
            aria-checked={mode === "agent"}
            title={`Switch to ${mode === "human" ? "agent" : "human"} mode`}
          >
            <div
              className={`flex h-5 w-5 transform items-center justify-center rounded-full bg-white dark:bg-white shadow-sm transition duration-200 ease-in-out ${mode === "agent" ? "translate-x-5" : "translate-x-0"
                }`}
            >
              {mode === "human" ? (
                <User className="h-3 w-3 text-black" />
              ) : (
                <Bot className="h-3 w-3 text-black" />
              )}
            </div>
          </button>
        </div>
        <button
          onClick={() => setShowQR(true)}
          className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110"
          aria-label="Show QR Code"
        >
          <QrCode className="h-5 w-5" />
        </button>
        <div className="h-6 w-px bg-gray-200 dark:bg-zinc-700" />
        <a
          href="https://github.com/aryanyadav-dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110"
        >
          <Github className="h-5 w-5" />
        </a>
        <a
          href="https://www.linkedin.com/in/-aryanyadav/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110"
        >
          <Linkedin className="h-5 w-5" />
        </a>
        <a
          href="https://x.com/aryanyadav0110"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110"
        >
          <FaXTwitter className="h-5 w-5" />
        </a>
        <a
          href="https://medium.com/@aryanyadavblogs"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110"
        >
          <FaMedium className="h-5 w-5" />
        </a>
        <a
          href="mailto:aryanayadav.works@gmail.com"
          className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110"
        >
          <Mail className="h-5 w-5" />
        </a>
      </nav>

      {/* QR Code Modal */}
      {
        showQR && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/20 dark:bg-white/5 backdrop-blur-sm"
            onClick={() => setShowQR(false)}
          >
            <div
              className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowQR(false)}
                className="absolute -right-3 -top-3 rounded-full bg-black dark:bg-white p-2 text-white dark:text-black transition-transform hover:scale-110"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="rounded-lg bg-white p-2">
                <QRCodeSVG
                  value="https://aryanyadav-dev.vercel.app/"
                  size={200}
                  level="H"
                  includeMargin={false}
                />
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
}
