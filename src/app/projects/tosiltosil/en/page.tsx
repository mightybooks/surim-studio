import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "TosilTosil Project – Expanding Care Energy for Abandoned Rabbits",
  description:
    "A care-energy expansion project by Surim Studio, based on the book 'I held a chubby bunny in my arms'. Exploring the issue of abandoned rabbits through stories.",
  openGraph: {
    title: "TosilTosil Project – Expanding Care Energy for Abandoned Rabbits",
    description:
      "A campaign project that expands care energy and raises awareness of abandoned rabbits.",
    images: ["/covers/tosiltosil_hero.webp"],
  },
};

export default function TosiltosilProjectPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 space-y-16">
      {/* Hero */}
      <section className="relative w-full h-[360px] md:h-[420px] rounded-3xl overflow-hidden shadow">
        <Image
          src="/covers/tosiltosil_hero.webp"
          alt="Expanding care energy to help abandoned rabbits"
          fill
          className="object-cover brightness-[0.85]"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-3xl md:text-5xl font-semibold mb-3">
            Expanding Care Energy<br />for Abandoned Rabbits
          </h1>
          <p className="text-sm md:text-base text-zinc-200">
            A campaign project based on <em>I held a chubby bunny in my arms</em>
          </p>
        </div>
      </section>

      {/* Project Overview */}
      <section className="text-zinc-700 leading-loose space-y-12">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-900">
            1. The Author, Sian
          </h2>
          <p>
            <strong>The TosilTosil Project</strong> began with one person’s
            record. Sian is not a professional activist nor a public figure.
            She is an ordinary woman who has recently gotten married, and yet
            her home is shared with more than nine small lives. All of them were
            once abandoned, or born to abandoned rabbits.
          </p>
          <p>
            <em>I held a chubby bunny in my arms</em> documents over a decade of her
            experience rescuing abandoned rabbits, connecting them to adoption,
            and witnessing how people she met along the way formed new bonds
            with rabbits of their own. Rather than a report on animal rescue
            work, it is a record of care sustained at a human scale.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-900">
            2. The Reality of Abandoned Rabbits
          </h2>
          <p>
            How many rabbits are abandoned each year to drive one individual to
            commit so much time to this issue? Current estimates suggest that at
            least 300 rabbits are abandoned annually, and the number continues
            to rise.
          </p>
          <p>
            Rabbits are classified as companion exotic animals, which makes them
            difficult to accommodate in standard animal shelters. As a result,
            the responsibility for rescue, care, and adoption often falls
            entirely on individuals.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-900">
            3. A Society Under Pressure
          </h2>
          <p>
            The increase in abandoned animals cannot be explained solely by
            individual irresponsibility. Economic burdens are growing, and
            social resilience is weakening. The correlation between slowing
            economic growth and rising abandonment rates shows that this is not
            a problem that can be solved through personal morality alone.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-900">
            4. We All Carry Care Energy
          </h2>
          <p>
            This does not mean we should give up or turn away. Each of us carries
            a certain amount of <em>care energy</em>. Some may become rescuers,
            others adopters, and others simply remain attentive and empathetic.
          </p>
          <p>
            What matters is not perfect action, but the ability to remain
            responsive rather than indifferent.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-900">
            5. What the TosilTosil Project Does
          </h2>
          <p>
            The TosilTosil Project exists to help people recognize, expand, and
            connect their care energy. Books, campaigns, and digital interactive
            content are merely tools for raising awareness about abandoned
            animals.
          </p>
          <p>
            Not everyone can directly take another life into their care. But
            everyone can show that they are someone who responds warmly to this
            issue. This project records those responses and carries them
            forward.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="flex flex-col md:flex-row gap-4 justify-center text-center">
        <Link
          href="/library/tosilbook"
          target="_blank"
          className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700"
        >
          View the Book
        </Link>
        <Link
          href="/projects/tosiltosil-archive"
          className="px-6 py-3 rounded-xl bg-emerald-50 text-emerald-700 font-medium border border-emerald-600 hover:bg-emerald-100"
        >
          View the Archive
        </Link>
        <Link
          href="/projects/tosiltosil/en/tosil-care"
          className="px-6 py-3 rounded-xl bg-emerald-50 text-emerald-700 font-medium border border-emerald-600 hover:bg-emerald-100"
        >
          About the App
        </Link>
      </section>

      {/* Footer */}
      <footer className="text-center text-xs text-zinc-400">
        © 2025 Surim Studio. All rights reserved.
      </footer>
    </main>
  );
}
