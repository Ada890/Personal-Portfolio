import React from "react";
import logo from "../assets/logo2.png";
import { SOCIAL_MEDIA_LINKS } from "../constants";

const Footer = () => {
  return (
    <div className="mb-8 mt-20 px-4"> {/* same outer wrapper you had */}
      <div className="max-w-6xl mx-auto"> {/* keeps layout centered on wide screens */}
        <div className="flex items-center justify-center">
          <img
            src={logo}
            alt="logo"
            className="my-8 w-40 sm:w-48 md:w-56 lg:w-64 object-contain"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6"> {/* slightly tighter gap */}
          {SOCIAL_MEDIA_LINKS.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label ?? link.name ?? `Social link ${index + 1}`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-xl sm:text-2xl hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
            >
              {link.icon}
            </a>
          ))}
        </div>

        <p className="mt-6 text-center text-sm tracking-wide text-gray-400">
          &copy; {new Date().getFullYear()} Dino@rmy. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;