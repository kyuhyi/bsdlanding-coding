export default function FooterMinimal() {
  return (
    <footer className="py-16 border-t border-white/10 bg-ink">
      <div className="mx-auto max-w-7xl px-6">
        {/* Social Icons */}
        <div className="flex justify-center gap-6 mb-8">
          <a
            href="https://www.youtube.com/@%ED%8D%BC%EB%84%90%EB%9D%B5"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            aria-label="YouTube"
          >
            <svg className="w-5 h-5 text-white/70" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
          <a
            href="https://www.instagram.com/bsd_funneldding"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            aria-label="Instagram"
          >
            <svg className="w-5 h-5 text-white/70" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a
            href="https://blog.naver.com/dk24gh"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            aria-label="Naver Blog"
          >
            <svg className="w-5 h-5 text-white/70" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.273 12.845L7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845z"/>
            </svg>
          </a>
          <a
            href="https://cafe.naver.com/atomy5"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            aria-label="Naver Cafe"
          >
            <svg className="w-5 h-5 text-white/70" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm-1 5v3H8v2h3v3h2v-3h3v-2h-3V7h-2z"/>
            </svg>
          </a>
          <a
            href="https://www.facebook.com/bsdfunneldding"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            aria-label="Facebook"
          >
            <svg className="w-5 h-5 text-white/70" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
        </div>

        {/* Links */}
        <div className="flex justify-center gap-8 mb-8 text-sm flex-wrap">
          <a href="https://litt.ly/bsd_class" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition">HOME</a>
          <a href="https://litt.ly/bsd_class" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition">BSD 프로그램</a>
          <a href="https://litt.ly/bsd_class" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition">BSD 강의</a>
          <a href="#" className="text-white/70 hover:text-white transition">이용약관</a>
          <a href="#" className="text-white/70 hover:text-white transition">개인정보처리방침</a>
        </div>

        {/* Company Info */}
        <div className="text-center text-white/60 text-sm space-y-2 mb-6">
          <p className="text-white/80 font-semibold mb-3">브랜드 네임 : BSD 비즈니스 시스템 디벨롭먼트</p>
          <p>상호 : 구이와쏘니 | 대표자 : 박규희 | 닉네임 : 퍼널띵</p>
          <p>소재지 : 경기도 화성시 병점동 887-2 골든스퀘어 2차 1201호</p>
          <p>사업자 등록번호 : 451-35-00705 | 통신판매신고번호 : 제2023-화성동부-1075호</p>
          <p>HP: 010-8284-9258 | 개인정보관리책임자 : 박규희</p>
          <p>문의 : <a href="mailto:info@bsdclasses.com" className="hover:text-white transition">info@bsdclasses.com</a></p>
        </div>

        {/* Copyright */}
        <div className="text-center text-white/50 text-xs pt-6 border-t border-white/10">
          <p>Copyright ⓒ {new Date().getFullYear()} BSD 퍼널띵의 바이브코딩 바이브시스템 All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
