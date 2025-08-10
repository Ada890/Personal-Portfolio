import React, { memo, useEffect, useState } from "react";
import { BIO } from "../constants";

const PREVIEW_LENGTH = 120;

const Bio = () => {
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpenIndex(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // lock body scroll when modal is open
  useEffect(() => {
    if (openIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [openIndex]);

  if (!BIO || !Array.isArray(BIO) || BIO.length === 0) {
    return (
      <section id="bio" className="mx-auto w-full max-w-4xl px-4 py-12">
        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-semibold text-white">
          Bio
        </h2>
        <p className="mt-6 text-center text-base md:text-lg text-white/70">
          (No bio available)
        </p>
      </section>
    );
  }

  return (
    <section id="bio" className="mx-auto w-full max-w-6xl px-4 py-12">
      <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-semibold text-white">
        Bio
      </h2>

      <div className="mt-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {BIO.map((text, idx) => {
          const preview =
            text.length > PREVIEW_LENGTH
              ? text.slice(0, PREVIEW_LENGTH) + "…"
              : text;
          return (
            <article
              key={idx}
              className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm p-5 shadow-md hover:shadow-lg transition-shadow duration-150"
            >
              <p className="text-sm md:text-base lg:text-lg leading-relaxed text-white/90 mb-4">
                {preview}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-white/60">Part {idx + 1}</span>
                <button
                  onClick={() => setOpenIndex(idx)}
                  className="text-xs font-medium underline-offset-2 hover:underline text-white/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 rounded"
                  aria-haspopup="dialog"
                  aria-expanded={openIndex === idx}
                >
                  Read full
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Modal */}
      {openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Bio item ${openIndex + 1}`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* blurred translucent backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpenIndex(null)}
            aria-hidden="true"
          />

          {/* modal panel: semi-transparent + extra blur */}
          <div className="relative z-10 max-h-[85vh] w-full max-w-2xl overflow-auto rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 p-6 shadow-xl">
            <header className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-semibold text-white">
                Bio — Part {openIndex + 1}
              </h3>

              {/* close button: accessible cross icon */}
              <button
                onClick={() => setOpenIndex(null)}
                className="ml-4 inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/6 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white/90"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </header>

            <div className="mt-4">
              <p className="whitespace-pre-wrap text-base leading-relaxed text-white">
                {BIO[openIndex]}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default memo(Bio);