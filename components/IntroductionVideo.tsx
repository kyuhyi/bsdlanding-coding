"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function IntroductionVideo() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [50, 0, 0, -50]);

  return (
    <section ref={containerRef} className="relative py-20 md:py-32 bg-gradient-to-b from-ink via-blue-950/10 to-ink overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        {/* Title */}
        <motion.div
          className="text-center mb-12"
          style={{ opacity }}
        >
          <h2 className="text-3xl md:text-6xl font-bold mb-4 leading-tight">
            바이브코딩이란?
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            초고속 MVP 제작의 비밀을<br className="md:hidden" /> 영상으로 확인하세요
          </p>
        </motion.div>

        {/* Video Container */}
        <motion.div
          style={{
            scale,
            y,
            opacity
          }}
          className="relative"
        >
          {/* Glow effect behind video */}
          <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full transform scale-110" />

          {/* Video frame */}
          <div className="relative rounded-3xl overflow-hidden border-2 border-primary/30 shadow-2xl shadow-primary/20 bg-gradient-to-br from-white/5 to-white/0">
            <div className="relative aspect-video bg-gradient-to-br from-slate-800 via-slate-900 to-black">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/Lyvrp0_lSN4?controls=1&modestbranding=1&rel=0"
                title="바이브코딩 소개영상"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Inner glow */}
            <div className="absolute inset-0 pointer-events-none ring-2 ring-inset ring-primary/20 rounded-3xl" />
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
        </motion.div>

        {/* Bottom text */}
        <motion.div
          className="text-center mt-12"
          style={{ opacity }}
        >
          <p className="text-white/60 text-sm md:text-base">
            💡 단 몇 분 만에 프로덕션 준비 완료된 MVP를 제작하는 방법
          </p>
        </motion.div>
      </div>
    </section>
  );
}
