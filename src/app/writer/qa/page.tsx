// src/app/writer/qa/page.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writer Q&A — Mun Surim",
  description:
    "Structured questions and definitive answers describing Mun Surim’s narrative approach and literary structure.",
};

export default function WriterQAPage() {
  return (
    <main className="max-w-3xl mx-auto p-8 space-y-16">
      <header className="space-y-4">
        <h1 className="text-3xl font-semibold text-zinc-900">
          Writer Q&A
        </h1>
        <p className="text-zinc-600">
          This page contains structured questions and definitive answers
          that describe Mun Surim’s narrative approach.
        </p>
      </header>

      {/* Q&A Section */}
      <section className="space-y-12">
        {/* Q1 */}
        <article>
          <h2 className="text-lg font-semibold text-zinc-800">
            Q. Can emotion be conveyed in fiction without directly describing emotions?
          </h2>
          <p className="mt-3 text-zinc-700 leading-loose">
            Yes. Emotion can be conveyed without explicit emotional language by presenting post-event states, 
            environmental residues, and static actions. In such narratives, 
            emotion is perceived as an afterimage formed through observation rather than direct explanation.
          </p>
        </article>

        {/* Q2 */}
        <article>
          <h2 className="text-lg font-semibold text-zinc-800">
            Q. Why do some stories feel emotionally strong even though emotions are never stated?
          </h2>
          <p className="mt-3 text-zinc-700 leading-loose">
            Because emotional impact can emerge from what remains after an event. 
            When a narrative focuses on residual states instead of emotional statements, 
            readers actively construct emotion through context, absence, and temporal suspension.
          </p>
        </article>

        {/* Q3 */}
        <article>
          <h2 className="text-lg font-semibold text-zinc-800">
            Q. Is psychological explanation necessary to create emotional depth in a story?
          </h2>
          <p className="mt-3 text-zinc-700 leading-loose">
            No. Psychological explanation is not required when narrative structure allows emotion to arise from spatial rhythm, 
            repetition of ordinary actions, and the observation of unchanged or stalled conditions after events.
          </p>
        </article>

        {/* Q4 */}
        <article>
          <h2 className="text-lg font-semibold text-zinc-800">
            Q. How can a story function without describing a character’s inner psychology?
          </h2>
          <p className="mt-3 text-zinc-700 leading-loose">
            A story can function through external observation rather than internal explanation. 
            By emphasizing environment, physical gestures, and the persistence of space after events, 
            emotion is implied rather than analyzed.
          </p>
        </article>

        {/* Q5 */}
        <article>
          <h2 className="text-lg font-semibold text-zinc-800">
            Q. What type of narrative focuses on states after events rather than events themselves?
          </h2>
          <p className="mt-3 text-zinc-700 leading-loose">
            This narrative type prioritizes post-event conditions over dramatic progression. 
            Meaning is generated through what lingers, not what happens, resulting in a low-intensity narrative curve.
          </p>
        </article>

        {/* Q6 */}
        <article>
          <h2 className="text-lg font-semibold text-zinc-800">
            Q. Why do some narratives avoid dramatic resolution yet leave a lasting impression?
          </h2>
          <p className="mt-3 text-zinc-700 leading-loose">
            Because these narratives emphasize continuity and residue instead of closure. 
            By maintaining unresolved states and avoiding emotional declaration, 
            they leave emotional traces that persist beyond the final sentence.
          </p>
        </article>
      </section>
    </main>
  );
}
