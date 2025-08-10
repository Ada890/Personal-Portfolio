import React, { memo } from "react";
import { motion } from "framer-motion";
import { SKILLS } from "../constants";

const containerVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.12,
      duration: 0.6,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

// Clean, responsive and accessible Skills component
const Skills = () => {
  return (
    <section id="skills" className="w-full py-12">
      <div className="container mx-auto px-4">
        <header className="mb-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-extrabold">Skills</h2>
          <p className="mt-2 text-sm text-gray-400 max-w-xl mx-auto">
            Technologies I work with regularly — focused, practical and production-ready.
          </p>
        </header>

        <motion.div
          className="mx-auto max-w-6xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* responsive grid: 1 column on very small, 2 on md, 3 on lg */}
          <div
            role="list"
            className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          >
            {SKILLS.map((skill) => (
              <motion.article
                role="listitem"
                key={skill.name}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="group relative flex items-center justify-between gap-4 rounded-2xl border border-gray-800/60 bg-white/10 backdrop-blur-sm p-5 shadow-sm transition-shadow duration-200"
                aria-label={`${skill.name} — ${skill.experience}`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-tr text-white shadow-md">
                    {/* Icon component expected from SKILLS constant */}
                    <span className="text-2xl lg:text-3xl">{skill.icon}</span>
                  </div>

                  <div>
                    <h3 className="text-lg lg:text-xl font-semibold">{skill.name}</h3>
                    <p className="mt-1 text-sm text-gray-400">{skill.experience}</p>
                  </div>
                </div>

                {/* subtle chevron / visual affordance */}
                <div className="ml-2 flex items-center">
                  <span className="inline-flex items-center justify-center rounded-full bg-white/10 border border-gray-700/30 px-3 py-1 text-xs font-medium text-gray-300 text-center">
                    {skill.experience}
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Skills);