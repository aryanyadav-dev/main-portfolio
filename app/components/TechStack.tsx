"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
    {
        name: "Languages",
        skills: [
            { name: "Python", slug: "python" },
            { name: "JavaScript", slug: "javascript" },
            { name: "TypeScript", slug: "typescript" },
        ]
    },
    {
        name: "Frontend",
        skills: [
            { name: "HTML5", slug: "html5" },
            { name: "CSS3", slug: "css" },
            { name: "React", slug: "react" },
            { name: "Next.js", slug: "nextdotjs" },
            { name: "Tailwind CSS", slug: "tailwindcss" },
            { name: "Shadcn UI", slug: "shadcnui" },
            { name: "Framer Motion", slug: "framer" },
        ]
    },
    {
        name: "Backend & DB",
        skills: [
            { name: "Node.js", slug: "nodedotjs" },
            { name: "Nest JS", slug: "nestjs" },
            { name: "MySQL", slug: "mysql" },
            { name: "MongoDB Atlas", slug: "mongodb" },
            { name: "Redis", slug: "redis" },
            { name: "FireBase", slug: "firebase" },
        ]
    },
    {
        name: "Infra & Tools",
        skills: [
            { name: "Git", slug: "git" },
            { name: "GitHub", slug: "github" },
            { name: "Postman", slug: "postman" },
            { name: "AWS", slug: "amazonaws", src: "/logos/aws.svg" },
            { name: "Linux", slug: "linux" },
        ]
    },
    {
        name: "AI & ML",
        skills: [
            { name: "Hugging Face", slug: "huggingface" },
            { name: "PyTorch", slug: "pytorch" },
            { name: "Pandas", slug: "pandas" },
            { name: "OpenCV", slug: "opencv" },
            { name: "scikit-learn", slug: "scikitlearn" },
            { name: "TensorFlow", slug: "tensorflow" },
        ]
    }
];

const marqueeSkills = categories.flatMap(c => c.skills);

const iconUrl = (slug: string, color?: string) =>
    color ? `https://cdn.simpleicons.org/${slug}/${color}` : `https://cdn.simpleicons.org/${slug}`;

const iconSrc = (src?: string, slug?: string, color?: string) => {
    if (src) return src;
    if (!slug) return "";
    return iconUrl(slug, color);
};

const iconClass = (hasColor?: boolean, variant: "marquee" | "grid" = "marquee") => {
    const base = variant === "marquee" ? "opacity-80 hover:opacity-100" : "opacity-50 group-hover:opacity-100";

    if (hasColor) {
        return `h-full w-full object-contain ${base} transition-all duration-300`;
    }

    const filter =
        variant === "marquee"
            ? "brightness-0 hover:brightness-100 dark:brightness-0 dark:invert dark:hover:invert-0 dark:hover:brightness-100"
            : "brightness-0 group-hover:brightness-100 dark:brightness-0 dark:invert dark:group-hover:invert-0 dark:group-hover:brightness-100";

    return `h-full w-full object-contain ${base} transition-all duration-300 ${filter}`;
};

export function TechStack() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="w-full space-y-4">
            <div className="flex justify-end">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-black dark:hover:text-white transition-all duration-300"
                >
                    {isExpanded ? "Show Less" : "View Full Stack"}
                    {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                </button>
            </div>

            <AnimatePresence mode="wait">
                {!isExpanded ? (
                    <motion.div
                        key="marquee"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
                    >
                        <div className="flex w-max animate-infinite-scroll">
                            <div className="flex gap-12 py-4 pr-12">
                                {marqueeSkills.map((tech, index) => (
                                    <div key={index} className="flex flex-col items-center justify-center gap-2">
                                        <div className="h-10 w-10 transition-all duration-300">
                                            <img
                                                src={iconSrc(tech.src, tech.slug, tech.color)}
                                                alt={tech.name}
                                                className={iconClass(!!tech.color, "marquee")}
                                                loading="lazy"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-12 py-4 pr-12">
                                {marqueeSkills.map((tech, index) => (
                                    <div key={index + marqueeSkills.length} className="flex flex-col items-center justify-center gap-2">
                                        <div className="h-10 w-10 transition-all duration-300">
                                            <img
                                                src={iconSrc(tech.src, tech.slug, tech.color)}
                                                alt={tech.name}
                                                className={iconClass(!!tech.color, "marquee")}
                                                loading="lazy"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="grid"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                        className="overflow-hidden"
                    >
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 pt-4">
                            {categories.map((category) => (
                                <div key={category.name} className="space-y-4">
                                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-zinc-800 pb-2">
                                        {category.name}
                                    </h3>
                                    <div className="grid grid-cols-1 gap-2">
                                        {category.skills.map((skill) => (
                                            <div
                                                key={skill.name}
                                                className="group flex items-center gap-3 rounded-lg border border-transparent p-2 transition-all hover:border-gray-100 dark:hover:border-zinc-800 hover:bg-gray-50/50 dark:hover:bg-zinc-900/50"
                                            >
                                                <div className="h-5 w-5 shrink-0 transition-all duration-300">
                                                    <img
                                                        src={iconSrc(skill.src, skill.slug, skill.color)}
                                                        alt={skill.name}
                                                        className={iconClass(!!skill.color, "grid")}
                                                        loading="lazy"
                                                    />
                                                </div>
                                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                                                    {skill.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
