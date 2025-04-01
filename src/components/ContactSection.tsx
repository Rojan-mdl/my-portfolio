// src/components/ContactSection.tsx
"use client";

export default function ContactSection() {
  return (
    // Remove the old background class, keep text white
    <section id="contact" className="py-16 text-gray-100">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Contact Me</h2>
        <form className="space-y-4" action="/api/contact" method="POST">
          <div>
            <label htmlFor="name" className="block text-gray-300">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full p-2 border rounded bg-gray-800 text-gray-100 focus:outline-none focus:shadow-[0_0_10px_2px_#ffffff]"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full p-2 border rounded bg-gray-800 text-gray-100 focus:outline-none focus:shadow-[0_0_10px_2px_#ffffff]"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-300">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="mt-1 block w-full p-2 border rounded bg-gray-800 text-gray-100 focus:outline-none focus:shadow-[0_0_10px_2px_#ffffff]"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-[#450086] px-6 py-3 text-white font-semibold rounded hover:bg-[#360066] transition focus:outline-none focus:shadow-[0_0_10px_2px_#ffffff]"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
