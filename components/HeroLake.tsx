"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useParallaxMouse } from "@/lib/useParallaxMouse";
import { useRef } from "react";

export default function HeroLake() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Enhanced 3D parallax effects
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const titleScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.95, 0.85]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.4, 0.7], [1, 0.8, 0]);

  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [1, 0.6, 0]);

  const buttonsY = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const buttonsOpacity = useTransform(scrollYProgress, [0, 0.25, 0.5], [1, 0.4, 0]);

  // Sequential image transitions - 여백 없이 멀어지는 효과 (1→2→3)
  // Image 1: 0 - 0.33 scroll (크기 1.1 → 1.0, 모바일 최적화)
  const img1Scale = useTransform(scrollYProgress, [0, 0.33], [1.1, 1.0]);
  const img1Opacity = useTransform(scrollYProgress, [0, 0.28, 0.33], [1, 0.5, 0]);

  // Image 2: 0.3 - 0.66 scroll (크기 1.1 → 1.0, 모바일 최적화)
  const img2Scale = useTransform(scrollYProgress, [0.3, 0.33, 0.66], [1.1, 1.1, 1.0]);
  const img2Opacity = useTransform(scrollYProgress, [0.3, 0.33, 0.61, 0.66], [0, 1, 0.5, 0]);

  // Image 3: 0.63 - 1.0 scroll (크기 1.1 → 1.0, 모바일 최적화)
  const img3Scale = useTransform(scrollYProgress, [0.63, 0.66, 1], [1.1, 1.1, 1.0]);
  const img3Opacity = useTransform(scrollYProgress, [0.63, 0.66, 1], [0, 1, 0.6]);

  // Mist layers
  const mistY1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const mistY2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const mistOpacity = useTransform(scrollYProgress, [0, 0.6], [0.15, 0]);

  const mp = useParallaxMouse(32);

  return (
    <section ref={containerRef} className="relative h-[300vh] overflow-clip">
      {/* Company Logo - Fixed Top Left */}
      <div className="fixed top-4 left-4 md:top-8 md:left-8 z-50">
        <Image
          src="/bsd-white.png"
          alt="Company Logo"
          width={120}
          height={40}
          className="object-contain md:w-[150px] md:h-[50px]"
          priority
        />
      </div>

      {/* Image Layer 1 */}
      <motion.div
        className="fixed inset-0"
        style={{
          scale: img1Scale,
          opacity: img1Opacity,
        }}
      >
        <Image
          src="/1.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70 pointer-events-none" />
      </motion.div>

      {/* Image Layer 2 */}
      <motion.div
        className="fixed inset-0"
        style={{
          scale: img2Scale,
          opacity: img2Opacity,
        }}
      >
        <Image
          src="/2.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70 pointer-events-none" />
      </motion.div>

      {/* Image Layer 3 */}
      <motion.div
        className="fixed inset-0"
        style={{
          scale: img3Scale,
          opacity: img3Opacity,
        }}
      >
        <Image
          src="/3.png"
          alt=""
          fill
          priority
          className="object-contain md:object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70 pointer-events-none" />
      </motion.div>

      {/* Floating mist layer 1 */}
      <motion.div
        className="absolute inset-0 mix-blend-screen pointer-events-none"
        style={{
          y: mistY1,
          x: mp.x,
          opacity: mistOpacity,
          background: "radial-gradient(circle at 30% 40%, rgba(139, 208, 255, 0.2) 0%, transparent 60%)",
        }}
      />

      {/* Floating mist layer 2 */}
      <motion.div
        className="absolute inset-0 mix-blend-screen pointer-events-none"
        style={{
          y: mistY2,
          x: typeof mp.x === 'number' ? -mp.x * 0.5 : mp.x,
          opacity: mistOpacity,
          background: "radial-gradient(circle at 70% 60%, rgba(99, 179, 237, 0.15) 0%, transparent 70%)",
        }}
      />

      {/* Second image badge - appears with image 2 */}
      <motion.div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 px-4 w-full max-w-2xl"
        style={{
          opacity: img2Opacity,
        }}
      >
        <div className="inline-flex items-center justify-center px-4 md:px-8 py-3 md:py-4 rounded-2xl bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 ring-2 ring-primary/50 backdrop-blur-sm animate-pulse-fast shadow-2xl shadow-primary/40 w-full">
          <div className="text-center">
            <p className="text-sm md:text-xl font-bold text-primary leading-relaxed">
              코드 한 줄 몰라도<br className="md:hidden" /> 모든 수강생 분들이<br className="md:hidden" /> 성공하고<br className="md:hidden" /> 결과물을 만들었습니다!<br />
              이제 당신 차례 입니다.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Content with 3D depth */}
      <div className="relative z-10 h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.div
          style={{
            y: titleY,
            scale: titleScale,
            opacity: titleOpacity,
          }}
        >
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-extrabold tracking-tight max-w-6xl leading-tight">
            바이브 코딩으로<br className="md:hidden" /> 초고속 MVP 제작
          </h1>
        </motion.div>

        <motion.p
          className="mt-6 md:mt-8 max-w-2xl text-lg md:text-2xl text-white/80 px-4"
          style={{
            y: subtitleY,
            opacity: subtitleOpacity
          }}
        >
          1인 사업가에게 필요한 건<br className="md:hidden" /> 빠른 시장검증과 테스트!!
        </motion.p>

        <motion.div
          className="mt-4 md:mt-6 px-4"
          style={{
            y: subtitleY,
            opacity: subtitleOpacity
          }}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 ring-2 ring-primary/50 backdrop-blur-sm animate-pulse-fast shadow-lg shadow-primary/30">
            <p className="text-sm md:text-base font-bold text-primary">
              지금 보고 계시는 이 랜딩페이지도 30분만에 AI로 제작되었습니다.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="mt-8 md:mt-12 flex gap-3 md:gap-4 flex-wrap justify-center px-4"
          style={{
            y: buttonsY,
            opacity: buttonsOpacity
          }}
        >
          <a
            className="rounded-xl bg-white/10 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg ring-1 ring-white/20 hover:bg-white/15 hover:scale-105 transition-all backdrop-blur-sm"
            href="https://bsd-3.kit.com/littly"
            target="_blank"
            rel="noopener noreferrer"
          >
            비밀특강 신청하기
          </a>
          <a
            className="rounded-xl bg-primary/90 text-ink px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold hover:bg-primary hover:scale-105 transition-all"
            href="https://open.kakao.com/o/sW7ZC0sh"
            target="_blank"
            rel="noopener noreferrer"
          >
            1:1 상담문의
          </a>
        </motion.div>
      </div>

      {/* Ambient particles */}
      <div className="pointer-events-none absolute inset-0 opacity-[.06]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E\")",
        }}
      />

      {/* Depth gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/50 pointer-events-none"
        style={{
          opacity: scrollYProgress
        }}
      />
    </section>
  );
}
