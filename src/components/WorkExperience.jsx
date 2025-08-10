import React from "react";
import { EXPERIENCES } from "../constants";
import { motion } from "framer-motion";

const WorkExperience = () => {
  // optional debug: remove in production
  console.log("EXPERIENCES:", EXPERIENCES);

  return (
    <section id="work" className="pt-20 relative z-20">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true, amount: 0.3 }}
        className="text-center text-4xl font-semibold tracking-tighter text-white"
      >
        Work Experience
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.15 }}
        viewport={{ once: true, amount: 0.15 }}
        className="space-y-6 p-6 md:p-10 max-w-4xl mx-auto"
      >
        {EXPERIENCES && EXPERIENCES.length ? (
          EXPERIENCES.map((exp, idx) => (
            <motion.article
              key={exp.id ?? idx}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: idx * 0.08 }}
              className="rounded-xl border border-white/20 dark:bg-slate-900/60 bg-white/10 backdrop-blur-sm p-4 text-white dark:text-white shadow-lg ring-1 ring-white/5"
            >
              {/* mobile stacked; md+ side-by-side */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2 flex flex-col justify-start">
                  <h3 className="text-2xl font-semibold">{exp.title}</h3>
                  <p className="text-xl">{exp.company}</p>
                  <p className="text-sm text-stone-300">{exp.duration}</p>
                </div>

                <div className="w-full md:w-1/2 flex items-start md:items-start">
                  <p className="text-base leading-relaxed">{exp.description}</p>
                </div>
              </div>
            </motion.article>
          ))
        ) : (
          <div className="text-center text-stone-400">No experiences to show</div>
        )}
      </motion.div>
    </section>
  );
};

export default WorkExperience;