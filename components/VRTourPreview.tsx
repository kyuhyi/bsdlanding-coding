"use client";
import { useState } from "react";
import Link from "next/link";

export default function VRTourPreview() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-20 md:py-32 relative bg-gradient-to-b from-ink via-blue-950/20 to-ink">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">360° VR 투어</h2>
          <p className="text-lg md:text-xl text-white/70">
            실제 교육 공간을 가상으로 체험해보세요
          </p>
        </div>

        {/* VR Tour Preview */}
        <div className="max-w-4xl mx-auto">
          <div
            className="relative w-full overflow-hidden rounded-3xl transition-all group ring-2 ring-primary/30 hover:ring-primary shadow-2xl shadow-primary/20 bg-gradient-to-br from-white/5 to-white/0 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <div className="relative aspect-video">
              {/* Live VR Tour Preview */}
              <iframe
                src="https://vrcontinue.com/VR/goo2sson2/goo2sson2.html"
                className="w-full h-full pointer-events-none"
                title="360° VR Tour Preview"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/90 flex items-center justify-center scale-100 group-hover:scale-110 transition-transform">
                    <svg
                      className="w-10 h-10 text-ink"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-white">전체화면으로 보기</h3>
                  <p className="text-white/90">클릭하여 VR 투어 시작</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-white/50">
              💡 마우스 드래그 또는 터치로 360도 회전하며 둘러보실 수 있습니다
            </p>
          </div>
        </div>
      </div>

      {/* VR Tour Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full h-full max-w-7xl max-h-[90vh] bg-slate-900 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm flex items-center justify-center transition-colors group"
              aria-label="Close VR Tour"
            >
              <svg
                className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* VR Tour iframe */}
            <iframe
              src="https://vrcontinue.com/VR/goo2sson2/goo2sson2.html"
              className="w-full h-full"
              title="360° VR Tour"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
