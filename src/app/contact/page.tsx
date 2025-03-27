"use client"; // because we'll have an interactive form (optional)

import { FormEvent, useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Submitting...");

    // Example using a simple form submission approach:
    const formData = new FormData(e.currentTarget);
    // If using an external service like Formspree, you'd fetch to their endpoint
    // For a Next.js server route, you'd do fetch("/api/contact", { method: "POST", body: JSON.stringify(...) })

    // For now, we just simulate a success:
    setTimeout(() => {
      setStatus("Message sent! I'll get back to you soon.");
      e.currentTarget.reset();
    }, 1000);
  };

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6">Contact Me</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <div>
          <label htmlFor="name" className="block text-gray-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            className="mt-1 block w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 block w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="mt-1 block w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
        >
          Send Message
        </button>
      </form>
      {status && <p className="mt-4 text-green-600">{status}</p>}
    </section>
  );
}
