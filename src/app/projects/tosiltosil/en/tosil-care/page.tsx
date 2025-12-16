import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "TosilTosil Project – Care Energy Self-Reflection App",
  description:
    "A digital participation app that helps you reflect on your care energy and share the result by choice.",
  openGraph: {
    title: "TosilTosil Project – Care Energy Self-Reflection App",
    description:
      "Measure, reflect on, and share your care energy as part of the TosilTosil Project.",
    images: ["/covers/tosiltosil_care_hero.webp"],
  },
};

export default function TosiltosilCarePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 space-y-16">
      {/* Hero */}
      <section className="relative w-full h-[360px] md:h-[420px] rounded-3xl overflow-hidden shadow">
        <Image
          src="/covers/tosiltosil_care_hero.webp"
          alt="Care Energy Self-Reflection Application"
          fill
          className="object-cover brightness-[0.85]"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-3xl md:text-5xl font-semibold mb-3">
            Reflect on Your Care Energy<br />and Share It with Others
          </h1>
          <p className="text-sm md:text-base text-zinc-200">
            A campaign app from <em>I Held a Chubby Rabbit</em>
          </p>
        </div>
      </section>

      {/* App Overview */}
      <section className="text-zinc-700 leading-loose space-y-12">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-900">
            1. What This App Does
          </h2>
          <p>
            The <strong>Care Energy Self-Reflection App</strong> is a digital
            participation experience designed to help users pause and reflect
            on their own sense of care through a short series of questions.
            The result is not a score or rank, but a narrative that shows how
            you currently respond to care.
          </p>
          <p>
            This app is not meant to judge, evaluate, or categorize anyone.
            Its purpose is self-awareness and recognition of one’s own sensibility.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-900">
            2. Why Use “Measurement”
          </h2>
          <p>
            Care is not something that can be easily quantified.
            Still, this project chose the idea of “measurement” not to assess
            people, but to create a moment of <em>recognition</em>.
          </p>
          <p>
            While answering the questions, users often encounter feelings they
            may have unconsciously ignored. This app was designed to offer
            that brief pause.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-900">
            3. How the Results Are Used
          </h2>
          <p>
            Results may be saved as a personal record if the user chooses,
            and some responses are anonymously archived.
            This is not to display individual results, but to show that
            diverse forms of care energy truly exist.
          </p>
          <p>
            Even without saving or sharing, the app experience is complete.
            All decisions about recording and sharing are left entirely to the user.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-900">
            4. The Role of This App in the Project
          </h2>
          <p>
            Within the TosilTosil Project, this app serves as an <em>entry point</em>
            for participation. If the book tells the story and the archive preserves
            records, this app is the path through which users step into the story themselves.
          </p>
          <p>
            Care energy is not proven by action alone.
            Being responsive, aware, and unwilling to turn away
            is also a form of care that this project values.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="flex flex-col md:flex-row gap-4 justify-center text-center">
        <Link
          href="/library/tosilbook"
          className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700"
        >
          View the Book
        </Link>
        <Link
        href="https://dolbom-mu.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 rounded-xl bg-emerald-50 text-emerald-700 font-medium border border-emerald-600 hover:bg-emerald-100"
        >
        Use the App
        </Link>
        <Link
          href="/projects/tosiltosil-archive"
          className="px-6 py-3 rounded-xl bg-emerald-50 text-emerald-700 font-medium border border-emerald-600 hover:bg-emerald-100"
        >
          View the Archive
        </Link>
      </section>

      {/* Footer */}
      <footer className="text-center text-xs text-zinc-400">
        © 2025 Surim Studio. All rights reserved.
      </footer>
    </main>
  );
}
