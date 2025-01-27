"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  }>({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = () => {
    const { name, email, subject, message } = formData;
    const newErrors: {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
    } = {};

    if (!name) newErrors.name = "Name is required.";
    if (!email || !isValidEmail(email))
      newErrors.email = "Valid email is required.";
    if (!subject) newErrors.subject = "Subject is required.";
    if (!message) newErrors.message = "Message is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSuccessMessage("Your message has been sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setErrors({});
  };

  return (
    <div className="grid sm:grid-cols-2 items-start gap-16 p-4 mx-auto max-w-4xl bg-white font-[sans-serif] py-10">
      {/* Left Section */}
      <div>
        <h1 className="text-gray-800 text-3xl font-extrabold">Let is Talk</h1>
        <p className="text-sm text-gray-500 mt-4">
          Have a big idea or project in mind Reach out, and we did love to hear
          about it.
        </p>

        {/* Contact Info */}
        <div className="mt-12">
          <h2 className="text-gray-800 text-base font-bold">Email</h2>
          <ul className="mt-4">
            <li className="flex items-center">
              <div className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center">
                <i className="fas fa-envelope text-blue-600"></i>
              </div>
              <a
                href="mailto:kshahmeer@gmail.com"
                className="text-[#007bff] text-sm ml-4"
              >
                <strong>kshahmeer@gmail.com</strong>
              </a>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <ul className="flex mt-6 space-x-4">
          <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center">
            <a
              href="https://www.facebook.com/kshahmeer10/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f text-blue-600"></i>
            </a>
          </li>
          <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center">
            <a
              href="https://www.linkedin.com/in/shahmeer-khan-96b1a42b4/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin-in text-blue-700"></i>
            </a>
          </li>
          <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center">
            <a
              href="https://github.com/shashmeerkhan/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github text-gray-800"></i>
            </a>
          </li>
        </ul>
      </div>

      {/* Form Section */}
      <form className="ml-auto space-y-4 w-full">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className={`w-full rounded-md py-3 px-4 bg-gray-100 text-gray-800 text-sm outline-blue-500 ${
            errors.name && "border-red-500"
          }`}
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className={`w-full rounded-md py-3 px-4 bg-gray-100 text-gray-800 text-sm outline-blue-500 ${
            errors.email && "border-red-500"
          }`}
        />
        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Subject"
          className={`w-full rounded-md py-3 px-4 bg-gray-100 text-gray-800 text-sm outline-blue-500 ${
            errors.subject && "border-red-500"
          }`}
        />
        {errors.subject && (
          <p className="text-red-500 text-xs">{errors.subject}</p>
        )}

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Message"
          className={`w-full rounded-md px-4 bg-gray-100 text-gray-800 text-sm pt-3 outline-blue-500 ${
            errors.message && "border-red-500"
          }`}
        />
        {errors.message && (
          <p className="text-red-500 text-xs">{errors.message}</p>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          className="text-white bg-gradient-to-r from-blue-400 to-purple-500 hover:bg-blue-600 rounded-md text-sm px-4 py-3 w-full mt-6"
        >
          Send
        </button>
        {successMessage && (
          <p className="text-green-500 text-sm mt-4">{successMessage}</p>
        )}
      </form>
    </div>
  );
}
