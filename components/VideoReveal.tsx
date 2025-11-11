"use client";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

const features = [
  { num: "01", title: "초고속", desc: "몇 초 만에 배포" },
  { num: "02", title: "엔터프라이즈 준비", desc: "SOC 2 준수" },
  { num: "03", title: "완전한 가시성", desc: "모든 것을 모니터링" }
];

interface FeatureItemProps {
  feature: typeof features[0];
  index: number;
  scrollYProgress: MotionValue<number>;
}

function FeatureItem({ feature, scrollYProgress }: FeatureItemProps) {
  const y = useTransform(scrollYProgress, [0.4, 0.5], [30, 0]);

  return (
    <motion.div
      className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
      style={{ y }}
    >
      <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center ring-1 ring-primary/30 mb-3 mx-auto">
        <span className="text-primary font-bold text-lg">{feature.num}</span>
      </div>
      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
      <p className="text-sm text-white/60">{feature.desc}</p>
    </motion.div>
  );
}

export default function VideoReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Video container animations
  const videoScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.7, 1.05, 1.05, 0.95]);
  const videoY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.7]);
  const videoRotateX = useTransform(scrollYProgress, [0, 0.3, 0.7], [25, 0, -5]);

  // Background layers
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.15, 1.3]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7], [0, 0.6, 0.3]);

  // Glow effect
  const glowOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7], [0, 0.8, 1, 0.6]);
  const glowScale = useTransform(scrollYProgress, [0, 0.3, 0.7], [0.8, 1.2, 1]);

  // Text animations
  const textY = useTransform(scrollYProgress, [0, 0.3, 0.7], [30, 0, -30]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.1, 0.6, 0.8], [0.8, 1, 1, 0]);

  // Particles opacity
  const particlesOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6], [0, 0.5, 0]);

  // Features opacity
  const featuresOpacity = useTransform(scrollYProgress, [0.4, 0.5, 0.7], [0, 1, 0.8]);

  return (
    <section ref={containerRef} className="relative h-[200vh] bg-ink">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-blue-950/30 via-purple-950/20 to-ink"
          style={{
            scale: bgScale,
            opacity: bgOpacity
          }}
        />

        {/* Radial glow behind video */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            opacity: glowOpacity,
            scale: glowScale
          }}
        >
          <div className="w-[800px] h-[450px] bg-primary/30 blur-[120px] rounded-full" />
        </motion.div>

        <div className="relative z-10 w-full max-w-6xl px-6">
          {/* Title above video */}
          <motion.div
            className="text-center mb-12"
            style={{
              y: textY,
              opacity: textOpacity
            }}
          >
            <h2 className="text-3xl md:text-6xl font-bold mb-4 leading-tight px-4">
              <span className="block md:inline">실제 작동 모습을</span><br className="hidden md:inline" /> 확인하세요
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto px-4">
              단 몇 분 만에 초고속 MVP를<br className="md:hidden" /> 제작하는 방법을 확인하세요!
            </p>
          </motion.div>

          {/* Video container with 3D transform */}
          <motion.div
            className="relative"
            style={{
              scale: videoScale,
              y: videoY,
              opacity: videoOpacity,
              rotateX: videoRotateX,
              transformPerspective: 1200,
              transformStyle: "preserve-3d"
            }}
          >
            {/* Video frame with glass effect */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl backdrop-blur-sm bg-gradient-to-br from-white/5 to-white/0">
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700" />

              {/* YouTube embed with autoplay */}
              <div className="relative aspect-video bg-gradient-to-br from-slate-800 via-slate-900 to-black">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/3AFrSU14SnM?autoplay=1&mute=1&loop=1&playlist=3AFrSU14SnM&controls=1&modestbranding=1&rel=0"
                  title="Product Demo Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Inner glow */}
              <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-2xl" />
            </div>

            {/* Floating particles around video */}
            <motion.div
              className="absolute -inset-4 opacity-50 pointer-events-none"
              style={{
                opacity: particlesOpacity
              }}
            >
              <div className="absolute top-0 left-10 w-2 h-2 bg-primary rounded-full blur-sm animate-pulse" />
              <div className="absolute top-20 right-10 w-3 h-3 bg-blue-400 rounded-full blur-sm animate-pulse delay-100" />
              <div className="absolute bottom-20 left-20 w-2 h-2 bg-purple-400 rounded-full blur-sm animate-pulse delay-200" />
              <div className="absolute bottom-10 right-20 w-3 h-3 bg-primary rounded-full blur-sm animate-pulse delay-300" />
            </motion.div>
          </motion.div>

          {/* Features below video */}
          <motion.div
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
            style={{
              opacity: featuresOpacity
            }}
          >
            {features.map((feature, i) => (
              <FeatureItem key={i} feature={feature} index={i} scrollYProgress={scrollYProgress} />
            ))}
          </motion.div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ink to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
