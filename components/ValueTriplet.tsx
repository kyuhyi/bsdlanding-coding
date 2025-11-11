const ITEMS = [
  {
    num: "01",
    t: "초고속",
    d: "몇 주가 아닌 몇 분만에 배포합니다. 빠른 반복 주기로 아이디어에서 프로덕션까지 신속하게 이동하세요.",
  },
  {
    num: "02",
    t: "엔터프라이즈 준비",
    d: "SOC 2 준수 보안, 역할 기반 액세스 제어, 감사 로그 및 규정 준수 워크플로를 갖춘 엔터프라이즈급 보안.",
  },
  {
    num: "03",
    t: "완전한 가시성",
    d: "모든 것을 모니터링합니다. 실시간 비용 추적, 성능 모니터링 및 사용량 분석으로 수백만 건의 API 호출을 처리하세요.",
  },
];

export default function ValueTriplet() {
  return (
    <section className="py-20 md:py-32 relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16 px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">프로덕션을 위해<br className="md:hidden" /> 구축됨</h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            자신감을 가지고 AI 제품을<br className="md:hidden" /> 출시하는 데 필요한 모든 것
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {ITEMS.map(({ num, t, d }) => (
            <div
              key={t}
              className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-8 hover:bg-white/[0.07] transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center ring-1 ring-primary/30 mb-6 group-hover:scale-110 transition-transform">
                <span className="text-primary font-bold text-xl">{num}</span>
              </div>
              <h4 className="text-2xl font-bold mb-3">{t}</h4>
              <p className="text-white/70 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
