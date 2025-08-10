import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { PROJECTS } from "../constants";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Projects = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    if (!mq.addEventListener) mq.addListener(update);
    return () => {
      mq.removeEventListener?.("change", update);
      if (!mq.removeEventListener) mq.removeListener(update);
    };
  }, []);

  return (
    <section className="pt-10 pb-8" id="projects">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.2 }}
        className="mb-6 text-center text-2xl md:text-3xl lg:text-4xl"
      >
        Projects
      </motion.h2>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0.95, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45 }}
            whileHover={!isMobile ? { scale: 1.03 } : {}}
            viewport={{ once: true, amount: 0.15 }}
            className="group relative overflow-hidden rounded-3xl border border-stone-800 bg-black/20 min-h-[18rem]"
            aria-labelledby={`project-${project.id}-title`}
          >
            {/* Larger, responsive fixed-height image to avoid looking reduced */}
            <motion.img
              whileHover={!isMobile ? { scale: 1.06 } : {}}
              src={project.image}
              alt={project.name}
              loading="lazy"
              className="w-full object-cover transition-transform duration-500
                         h-72 md:h-96 lg:h-[28rem]"
            />

            {/* Overlay: visible by default on mobile, hover on desktop */}
            <motion.div
              initial={{ opacity: isMobile ? 1 : 0 }}
              animate={{ opacity: isMobile ? 1 : 0 }}
              whileHover={!isMobile ? { opacity: 1 } : {}}
              transition={{ duration: 0.35 }}
              className={`absolute inset-0 flex flex-col items-center justify-center text-white z-10 
                          backdrop-blur-lg p-4 transition-opacity duration-300
                          ${isMobile ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
            >
              <h3 id={`project-${project.id}-title`} className="mb-2 text-xl md:text-lg text-center">
                {project.name}
              </h3>
              <p className="mb-6 px-4 text-sm md:text-base text-center">{project.description}</p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-black hover:bg-gray-300 text-sm"
                  aria-label={`View ${project.name} on GitHub`}
                >
                  <span className="mr-2">View on GitHub</span>
                  <FaGithub className="text-base" />
                </a>

                {project.hostedLink ? (
                  <a
                    href={project.hostedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm hover:bg-white/10 hover:backdrop-blur-sm"
                    aria-label={`View live demo of ${project.name}`}
                  >
                    <span className="mr-2">View Live</span>
                    <FaExternalLinkAlt className="text-sm" />
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm opacity-60 cursor-not-allowed"
                    aria-label={`No live demo available for ${project.name}`}
                  >
                    View Live
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;