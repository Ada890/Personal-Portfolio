import { FaGithub } from "react-icons/fa";
import { PROJECTS } from "../constants";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Projects = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect if screen width is less than 768px (mobile)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile(); // Run on initial render
    window.addEventListener("resize", checkMobile); // Listen for window resize

    return () => {
      window.removeEventListener("resize", checkMobile); // Cleanup on component unmount
    };
  }, []);

  return (
    <section className="pt-10 pb-8" id="projects">
      <motion.h2
        initial={{ opacity: 1, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-6 text-center text-2xl md:text-3xl lg:text-4xl"
      >
        Projects
      </motion.h2>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project) => (
          <motion.div
            initial={{ opacity: 1, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={!isMobile ? { scale: 1.05 } : {}} // Disable hover scaling on mobile
            key={project.id}
            className="group relative overflow-hidden rounded-3xl"
          >
            <motion.img
              whileHover={!isMobile ? { scale: 1.1 } : {}} // Disable image zoom on mobile
              src={project.image}
              alt={project.name}
              className="h-full w-full object-cover transition-transform duration-500"
            />

            <motion.div
              initial={{ opacity: isMobile ? 1 : 0 }} // Visible on mobile by default
              animate={{ opacity: isMobile ? 1 : 0 }} // Keep it visible on mobile
              whileHover={!isMobile ? { opacity: 1 } : {}} // Hover effect on desktop only
              transition={{ duration: 0.5 }}
              className={`absolute inset-0 flex flex-col items-center justify-center 
                         text-white backdrop-blur-lg z-10 transition-opacity duration-500 
                         ${isMobile ? 'opacity-100' : 'group-hover:opacity-100'}`}
            >
              <h3 className="mb-2 text-xl md:text-lg">{project.name}</h3>
              <p className="mb-6 px-4 text-sm md:text-base">{project.description}</p>
              <a
                href={project.githubLink}
                target="blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white px-4 py-2 text-black hover:bg-gray-300 text-sm"
              >
                <div className="flex items-center">
                  <span>View on GitHub</span>
                  <FaGithub className="ml-2 text-xl" />
                </div>
              </a>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
