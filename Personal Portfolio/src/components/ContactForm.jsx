import emailjs from "@emailjs/browser";
import { useState } from "react";
import { FiSend } from "react-icons/fi";
import { toast, Toaster } from "react-hot-toast"; 
import contactImage from '../assets/contact.png'; 
import { motion } from "framer-motion";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({}); 
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.message) errors.message = "Message is required";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setIsSending(true);

      emailjs
        .send(
          "SERVER ID",
          "TEMPLATE ID",
          formData,
          "Public Key/User ID"
        )
        .then((response) => {
          toast.success("Message sent successfully");
          setFormData({ name: "", email: "", message: "" });
        })
        .catch((error) => {
          console.error("FAILED...", error);
          toast.error("Failed to send message.");
          toast("Please try again!", {
            icon: "❗",
          });
        })
        .finally(() => {
          setIsSending(false);
        });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 lg:w-3/4" id="contact">
      <Toaster />
      <h2 className="my-8 text-center text-4xl font-semibold tracking-tighter text-gray-400">
        Let's Connect
      </h2>
      <div className="flex flex-col lg:flex-row items-center justify-between w-full">
        {/* Image appears above the form on mobile view and smaller on PC */}
        <img 
          src={contactImage} 
          alt="Contact" 
          className="mb-4 lg:mb-0 lg:w-1/3 w-3/4 h-auto object-contain"
        />
        <div className="w-full lg:w-2/3">
          <motion.form 
          initial= {{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          onSubmit={handleSubmit} className="bg-gray-900 bg-opacity-60 rounded-lg shadow-md p-8">
            <div className="mb-4 flex space-x-4">
              <div className="lg:w-1/2">
                <input type="text" 
                  id="name"
                  name="name"
                  value={formData.name}
                  placeholder="Name: Dino@rmy"
                  onChange={handleChange}
                  className="mb-4 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-3 py-3 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
                {errors.name && (
                    <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-sm text-rose-800">{errors.name}</motion.p>
                )}
              </div>
              <div className="lg:w-1/2">
                <input type="email" 
                  id="email"
                  name="email"
                  value={formData.email}
                  placeholder="Email: abc@xyz.py"
                  onChange={handleChange}
                  className="mb-4 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-3 py-3 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
                {errors.email && (
                    <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-sm text-rose-800">{errors.email}</motion.p>
                )}
              </div>
            </div>
            <div className="mb-4">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  placeholder="Message: you're hired 😁"
                  onChange={handleChange}
                  className="mb-4 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-3 py-3 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                  rows={6}
                />
                {errors.message && (
                    <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-sm text-rose-800">{errors.message}</motion.p>
                )}
            </div>
            <button 
              type="submit" 
              className={`mb-8 w-full rounded-lg border border-gray-300 bg-blue-600 text-white px-4 py-2 text-sm font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 ${isSending ? "cursor-not-allowed opacity-50" : ""}`} 
              disabled={isSending}
            >
              <div className="flex items-center justify-center gap-2">
                {isSending ? "Sending..." : "Send"}
                <FiSend />
              </div>
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;


