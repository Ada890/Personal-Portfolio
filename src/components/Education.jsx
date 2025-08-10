import React from "react";
import { EDUCATION } from "../constants";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Education = () => {
  return (
    <section id="education" className="py-12 px-4">
      <motion.h2
        initial={{ opacity: 0, y: -18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
        className="mb-8 text-center text-3xl md:text-4xl font-bold text-white"
      >
        Education
      </motion.h2>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {EDUCATION.map((edu, idx) => (
          <motion.article
            key={edu.id ?? idx}
            variants={item}
            className="rounded-2xl border border-white/10 bg-gradient-to-r from-slate-900/60 to-slate-800/40 backdrop-blur-sm p-6 shadow-lg hover:shadow-2xl transition-shadow duration-200"
            role="article"
            aria-labelledby={`edu-${idx}-title`}
          >
            <div className="flex flex-col h-full">
              <h3
                id={`edu-${idx}-title`}
                className="text-lg md:text-xl font-semibold text-white"
              >
                {edu.degree}
              </h3>

              <p className="mt-1 text-sm md:text-base font-medium text-slate-200">
                {edu.institution}
              </p>

              <time className="mt-2 text-sm text-stone-300">{edu.duration}</time>

              <p className="mt-4 text-sm md:text-base text-slate-100 leading-relaxed">
                {edu.description}
              </p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};

export default React.memo(Education);