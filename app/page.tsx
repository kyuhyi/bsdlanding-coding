import HeroLake from "@/components/HeroLake";
import VideoReveal from "@/components/VideoReveal";
import IntroductionVideo from "@/components/IntroductionVideo";
import ParallaxFeatures from "@/components/ParallaxFeatures";
import PillarsSticky from "@/components/PillarsSticky";
import ValueTriplet from "@/components/ValueTriplet";
import MarqueeClients from "@/components/MarqueeClients";
import TestimonialVideos from "@/components/TestimonialVideos";
import VRTourPreview from "@/components/VRTourPreview";
import FooterMinimal from "@/components/FooterMinimal";
import AIChatbot from "@/components/AIChatbot";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BSD 초고속 MVP',
  description: '1인 사업가를 위한 바이브 코딩 교육. 몇 주가 아닌 몇 분만에 MVP를 제작하고 빠른 시장검증과 테스트를 경험하세요.',
  keywords: ['바이브코딩', 'MVP', '초고속 개발', '1인 사업가', 'AI 빌더', '시장검증', 'BSD', '프로덕션 배포'],
  authors: [{ name: 'BSD' }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://bsdlanding-coding.vercel.app',
    title: 'BSD 바이브코딩 전문 교육센터 | 초고속 MVP 제작',
    description: '1인 사업가를 위한 바이브 코딩 교육. 몇 주가 아닌 몇 분만에 MVP를 제작하고 빠른 시장검증과 테스트를 경험하세요.',
    siteName: 'BSD 바이브코딩',
    images: [
      {
        url: '/3.png',
        width: 1200,
        height: 630,
        alt: 'BSD 바이브코딩 전문 교육센터',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BSD 바이브코딩 전문 교육센터 | 초고속 MVP 제작',
    description: '1인 사업가를 위한 바이브 코딩 교육. 몇 주가 아닌 몇 분만에 MVP를 제작하고 빠른 시장검증과 테스트를 경험하세요.',
    images: ['/3.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return (
    <main className="scroll-smooth">
      <HeroLake />
      <IntroductionVideo />
      <VideoReveal />
      <ParallaxFeatures />
      <PillarsSticky />
      <TestimonialVideos />
      <ValueTriplet />
      <MarqueeClients />
      <VRTourPreview />
      <section id="start" className="py-20 md:py-32 text-center relative bg-gradient-to-b from-ink via-blue-950/20 to-ink">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">AI 제품 출시할<br className="md:hidden" /> 준비가 되셨나요?</h2>
          <p className="text-lg md:text-xl text-white/70 mb-10">
            자신 있게 바이브코딩 교육을<br className="md:hidden" /> 제공하는 BSD와 함께 하세요
          </p>
          <div className="flex gap-3 md:gap-4 justify-center flex-wrap">
            <a
              className="inline-flex items-center gap-2 rounded-xl bg-primary/90 text-ink px-6 md:px-8 py-3 md:py-4 font-semibold text-base md:text-lg hover:bg-primary hover:scale-105 transition-all shadow-lg shadow-primary/20"
              href="https://bsd-3.kit.com/littly"
              target="_blank"
              rel="noopener noreferrer"
            >
              비밀특강 신청하기
            </a>
            <a
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-6 md:px-8 py-3 md:py-4 ring-1 ring-white/20 hover:bg-white/15 hover:scale-105 transition-all text-base md:text-lg backdrop-blur-sm"
              href="https://open.kakao.com/o/sW7ZC0sh"
              target="_blank"
              rel="noopener noreferrer"
            >
              1:1 상담문의
            </a>
          </div>
        </div>
      </section>
      <FooterMinimal />
      <AIChatbot />
    </main>
  );
}
