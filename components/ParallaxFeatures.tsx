"use client";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    num: "01",
    title: "더 빠른 출시",
    description: "몇 주가 아닌 몇 시간 만에 아이디어를 프로덕션으로 전환하세요. 우리 플랫폼이 복잡성을 처리합니다.",
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    num: "02",
    title: "정확성 유지",
    description: "실시간 평가 및 모니터링으로 AI 모델이 최고의 성능을 발휘하도록 유지합니다.",
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    num: "03",
    title: "완전한 제어",
    description: "학습부터 배포까지 AI 파이프라인에 대한 완전한 가시성과 제어를 제공합니다.",
    color: "from-orange-500/20 to-red-500/20"
  },
  {
    num: "04",
    title: "손쉬운 확장",
    description: "엔터프라이즈 규모를 위해 구축되었습니다. 수백만 건의 요청을 손쉽게 처리하세요.",
    color: "from-green-500/20 to-emerald-500/20"
  }
];

interface FeatureCardProps {
  feature: typeof features[0];
  index: number;
  scrollYProgress: MotionValue<number>;
}

function FeatureCard({ feature, index, scrollYProgress }: FeatureCardProps) {
  const isEven = index % 2 === 0;
  const cardY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [isEven ? 100 : 150, 0, isEven ? -50 : -100]
  );
  const cardRotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [isEven ? -2 : 2, 0, isEven ? 1 : -1]
  );
  const cardOpacity = useTransform(
    scrollYProgress,
    [0, 0.2 + index * 0.1, 0.8, 1],
    [0, 1, 1, 0.8]
  );

  return (
    <motion.div
      className="relative group"
      style={{
        y: cardY,
        rotate: cardRotate,
        opacity: cardOpacity
      }}
    >
      {/* Card glow effect */}
      <div className={`absolute -inset-1 bg-gradient-to-br ${feature.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Card content */}
      <div className="relative p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
        {/* Number badge */}
        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center ring-1 ring-primary/30 mb-6">
          <span className="text-primary font-bold text-lg">{feature.num}</span>
        </div>

        <h3 className="text-2xl font-bold mb-4">
          {feature.title}
        </h3>

        <p className="text-white/70 leading-relaxed">
          {feature.description}
        </p>

        {/* Hover indicator */}
        <div className="mt-6 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-sm font-medium">자세히 알아보기</span>
          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>

        {/* Decorative corner accents */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-primary/10 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </motion.div>
  );
}

export default function ParallaxFeatures() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Background animations
  const bgY1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const bgScale1 = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const bgScale2 = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  // Header animations
  const headerY = useTransform(scrollYProgress, [0, 0.3], [50, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.7]);

  // CTA animations
  const ctaY = useTransform(scrollYProgress, [0.5, 0.8], [50, 0]);
  const ctaOpacity = useTransform(scrollYProgress, [0.5, 0.7, 0.9, 1], [0, 1, 1, 0.7]);

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden bg-ink">
      {/* Animated background layers */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          y: bgY1,
          scale: bgScale1
        }}
      >
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </motion.div>

      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          y: bgY2,
          scale: bgScale2
        }}
      >
        <div className="absolute top-40 right-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-20 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          style={{
            y: headerY,
            opacity: headerOpacity
          }}
        >
          <h2 className="text-3xl md:text-6xl font-bold mb-6 leading-tight">
            가장 빠른 방법으로<br className="md:hidden" /> 초고속 MVP 제작
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            몇 주가 아닌 몇 분만에 배포합니다.
          </p>
        </motion.div>

        {/* Feature cards with staggered parallax */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} scrollYProgress={scrollYProgress} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-20 text-center"
          style={{
            y: ctaY,
            opacity: ctaOpacity
          }}
        >
          <a
            href="#start"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-primary/90 text-ink font-semibold text-lg hover:bg-primary hover:scale-105 transition-all shadow-lg shadow-primary/20"
          >
            지금 시작하기
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Gradient overlays */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-ink to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ink to-transparent pointer-events-none" />
    </section>
  );
}
