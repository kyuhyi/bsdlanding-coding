"use client";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

const PILLARS = [
  {
    k: "아이디어",
    title: "초안 작성과 테스트",
    d: "빠른 시장검증을 위한 초안 작성 테스트, 실시간 피드백을 통한 빠른 개선.",
  },
  {
    k: "초고속 MVP",
    title: "초안 반영 및 측정",
    d: "경쟁자 보다 빠른 속도와 테스트로 경쟁우위를 확보하세요",
  },
  {
    k: "고도화",
    title: "초안 고도화",
    d: "UI, 디자인, 기능 등에 반영하고 고도화하세요.",
  },
  {
    k: "프로덕션 준비",
    title: "프로덕션 준비",
    d: "손쉽게 프로덕션 환경에 배포하고 모니터링하세요.",
  },
];

interface PillarCardProps {
  pillar: typeof PILLARS[0];
  index: number;
  scrollYProgress: MotionValue<number>;
}

function PillarCard({ pillar, index, scrollYProgress }: PillarCardProps) {
  const start = index * 0.2;
  const end = start + 0.3;

  const y = useTransform(scrollYProgress, [start, end], [100, 0]);
  const opacity = useTransform(scrollYProgress, [start, start + 0.15, 0.9], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [start, end], [0.9, 1]);

  return (
    <motion.div
      style={{ y, opacity, scale }}
      className="p-8 rounded-3xl bg-white/5 ring-1 ring-white/10 backdrop-blur-sm hover:bg-white/[0.07] transition-colors"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center ring-1 ring-primary/30">
          <span className="text-primary font-bold text-sm">{index + 1}</span>
        </div>
        <h3 className="text-3xl font-bold">{pillar.k}</h3>
      </div>
      <p className="text-lg text-primary/90 font-medium mb-2">{pillar.title}</p>
      <p className="text-white/70 leading-relaxed">{pillar.d}</p>
    </motion.div>
  );
}

export default function PillarsSticky() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  return (
    <section ref={containerRef} id="pillars" className="relative h-[400vh]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="mx-auto max-w-7xl w-full px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {PILLARS.map((p, i) => (
              <PillarCard key={p.k} pillar={p} index={i} scrollYProgress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
