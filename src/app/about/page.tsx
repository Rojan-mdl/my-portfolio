export default function AboutPage() {
    return (
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">About Me</h2>
        <p>
          I’m Marius Øvrebø – a Junior Fullstack Developer with a background in
          interactive design, 3D art, and project management.
        </p>
        <h3 className="text-2xl font-semibold">Skills</h3>
        <ul className="list-disc pl-5">
          <li>Frontend: React, Next.js, Tailwind CSS</li>
          <li>Backend: Node.js, Express, MongoDB</li>
          <li>3D &amp; Design: Blender, Adobe XD, Figma</li>
        </ul>
        <h3 className="text-2xl font-semibold">Experience &amp; Education</h3>
        <p>
          I have worked as a Project Manager/Designer at SATS, a Freelance 3D Artist for Unity Arena
          and PlayStation, and hold a Bachelor’s degree in Interactive Design.
        </p>
        <a
          href="/resume.pdf"
          className="inline-block bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 transition"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download Resume
        </a>
      </section>
    );
  }
  