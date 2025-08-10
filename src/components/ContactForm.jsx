import React, { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { FiSend } from "react-icons/fi";
import { toast, Toaster } from "react-hot-toast";
import contactImage from "../assets/contact.png";
import { motion } from "framer-motion";

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "", website: "" }); // website = honeypot
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const formRef = useRef(null);
  const firstErrorRef = useRef(null);

  // env keys (set these in .env, never commit)
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  useEffect(() => {
    if (Object.keys(errors).length && firstErrorRef.current) {
      firstErrorRef.current.focus();
    }
  }, [errors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // clear corresponding error on change for better UX
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    // honeypot must be empty
    if (formData.website && formData.website.trim() !== "") newErrors.website = "Spam detected";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      toast.error("Email service not configured. Set env variables.");
      return;
    }

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSending(true);
    setSuccess(false);

    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      toast.success("Message sent successfully");
      setFormData({ name: "", email: "", message: "", website: "" });
      setSuccess(true);
      // optional: return focus back to form
      if (formRef.current) formRef.current.querySelector("input[name=name]").focus();
    } catch (err) {
      console.error("Email send failed:", err);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 lg:w-3/4 mx-auto" id="contact">
      <Toaster />
      <h2 className="my-8 text-center text-4xl font-semibold tracking-tighter text-gray-100">Let's Connect</h2>

      <div className="flex flex-col lg:flex-row items-center gap-8 w-full">
        <img
          src={contactImage}
          alt="Contact illustration"
          className="w-3/4 lg:w-1/3 h-auto object-contain"
          aria-hidden="true"
        />

        <div className="w-full lg:w-2/3">
          <motion.form
            ref={formRef}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-gradient-to-r from-slate-900/70 to-slate-800/50 backdrop-blur-md rounded-xl shadow-lg p-6 md:p-8"
            noValidate
            aria-live="polite"
          >
            {/* hidden honeypot to reduce bot spam */}
            <input
              name="website"
              value={formData.website}
              onChange={handleChange}
              type="text"
              className="hidden"
              tabIndex="-1"
              autoComplete="off"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  ref={errors.name ? firstErrorRef : null}
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name: Dino@rmy"
                  className={`w-full rounded-lg border px-3 py-3 text-sm bg-transparent placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                    errors.name ? "border-rose-500 ring-rose-200" : "border-gray-700"
                  }`}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "err-name" : undefined}
                />
                {errors.name && (
                  <motion.p id="err-name" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1 text-sm text-rose-300">
                    {errors.name}
                  </motion.p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  ref={!errors.name && errors.email ? firstErrorRef : null}
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email: cpp@js.py"
                  className={`w-full rounded-lg border px-3 py-3 text-sm bg-transparent placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                    errors.email ? "border-rose-500 ring-rose-200" : "border-gray-700"
                  }`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "err-email" : undefined}
                />
                {errors.email && (
                  <motion.p id="err-email" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1 text-sm text-rose-300">
                    {errors.email}
                  </motion.p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                ref={!errors.name && !errors.email && errors.message ? firstErrorRef : null}
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message: you're hired 😁"
                rows={6}
                className={`w-full rounded-lg border px-3 py-3 text-sm bg-transparent placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                  errors.message ? "border-rose-500 ring-rose-200" : "border-gray-700"
                }`}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "err-message" : undefined}
              />
              {errors.message && (
                <motion.p id="err-message" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1 text-sm text-rose-300">
                  {errors.message}
                </motion.p>
              )}
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className={`w-full inline-flex items-center justify-center gap-3 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-transform ${
                  isSending ? "bg-blue-500/80 cursor-not-allowed opacity-80" : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={isSending}
                aria-disabled={isSending}
              >
                {isSending ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.25"></circle>
                      <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send <FiSend />
                  </>
                )}
              </button>
            </div>

            {/* screen-reader friendly live region */}
            <div aria-live="polite" className="sr-only">
              {success ? "Message sent successfully" : ""}
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;