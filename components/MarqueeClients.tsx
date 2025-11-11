"use client";

export default function MarqueeClients() {
  const aiBuilders = [
    "Cursor",
    "Bolt.new",
    "Lovable",
    "v0",
    "Replit",
    "Claude Code",
    "GitHub Copilot",
    "Codeium",
    "Tabnine",
    "Amazon CodeWhisperer",
    "Gemini Code",
    "ChatGPT",
    "Windsurf",
    "Vercel AI SDK",
    "LangChain",
    "Anthropic",
    "OpenAI",
    "Perplexity",
    "Midjourney",
    "Stable Diffusion"
  ];
  const doubled = [...aiBuilders, ...aiBuilders];

  return (
    <section className="py-16 border-t border-white/10">
      <div className="text-center mb-8">
        <p className="text-sm text-white/80 uppercase tracking-wider">바이브코더들이 사용하는 AI 빌더들</p>
      </div>
      <div className="overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {doubled.map((n, i) => (
            <span key={i} className="mx-12 text-xl text-white/70 font-medium">
              {n}
            </span>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        @media (max-width: 768px) {
          .animate-marquee {
            animation: marquee 15s linear infinite;
          }
        }
      `}</style>
    </section>
  );
}
