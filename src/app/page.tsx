export default function HomePage() {
  return (
    <section className="flex flex-col items-center text-center py-20">
      <h1 className="text-5xl font-bold mb-4">Hi, I'm Marius Øvrebø</h1>
      <p className="text-xl mb-8">
        I build modern web applications and craft immersive designs & 3D experiences.
      </p>
      <div className="space-x-4">
        <a
          href="/developer"
          className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Developer
        </a>
        <a
          href="/design"
          className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Design
        </a>
        <a
          href="/threeD"
          className="px-6 py-3 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
        >
          3D
        </a>
      </div>

      <div className="mt-8">
        <a
          href="/resume.pdf"
          className="underline text-blue-600 hover:text-blue-800"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download Resume
        </a>
      </div>
    </section>
  );
}
// Note: This is the main page of the portfolio.
// It introduces the portfolio owner, Marius Øvrebø, and provides links to different sections of the portfolio.
// The page is styled using Tailwind CSS for a modern and clean look.
// The page includes a title, a brief description, and buttons to navigate to the developer, design, and 3D sections.
// It also includes a link to download the resume as a PDF.
// The layout is responsive and will adapt to different screen sizes.