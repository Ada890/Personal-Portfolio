import { HERO } from "../constants";
import DP from "../assets/DP.jpg";
import { FiDownload } from "react-icons/fi";
import { motion } from "framer-motion";
import { useTypewriter } from "react-simple-typewriter";

const Hero = () => {
  const words = [HERO.greet];
  const [text] = useTypewriter({
    words,
    loop: true,        
    typeSpeed: 80,
    deleteSpeed: 50,
    delaySpeed: 1500,
  });

  // Reserve width equal to longest word to prevent layout shift when text becomes empty
  const maxLen = words.reduce((max, w) => Math.max(max, w.length), 0) || 10;
  const minWidth = `${maxLen}ch`;

  return (
    <section className="flex min-h-screen flex-wrap items-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="w-full md:w-1/2"
      >
        <h2 className="my-8 p-2 text-4xl font-bold md:text-5xl lg:text-[7rem]">
          {HERO.name}
        </h2>

        {/* Static emoji + typed text (with reserved width to avoid layout shift) */}
        <p className="p-2 text-3xl tracking-tighter lg:text-4xl flex items-center">
          {/* static emoji */}
          <span className="mr-3 text-3xl" aria-hidden>
            👋
          </span>

          {/* typed text in an inline-block with reserved width */}
          <span
            className="inline-block whitespace-pre text-current"
            style={{ minWidth }}
            aria-live="polite"
          >
            {text}
            {/* simple blinking cursor */}
            <span className="inline-block ml-2 h-6 w-[2px] bg-current align-middle animate-pulse" />
          </span>
        </p>

        <p className="mb-8 p-2 text-xl">{HERO.description}</p>

        <a
          href={HERO.resumelink}
          className="inline-flex items-center bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 text-white font-bold py-2 px-4 rounded-lg mb-4"
        >
          <FiDownload className="mr-2" />
          Download Resume
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="w-full md:w-1/2 lg:p-8 p-4"
      >
        <div className="flex justify-center">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            src={DP}
            width={550}
            height={550}
            alt="Profile"
            className="rounded-3xl"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;