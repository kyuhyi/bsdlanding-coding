import "./globals.css";
import SmoothScroller from "@/components/SmoothScroller";
import Header from "@/components/Header";

export const metadata = {
  title: "BSD 바이브코딩 - AI로 코드 없이 MVP 제작",
  description: "AI를 활용해 코드 없이 빠르게 MVP를 제작하는 혁신적인 개발 방법. 1인 사업가와 비전공자도 몇 분 만에 실제 작동하는 웹사이트와 앱을 만들 수 있습니다.",
  icons: {
    icon: "/bsd-symbol-color.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <SmoothScroller>{children}</SmoothScroller>
      </body>
    </html>
  );
}
