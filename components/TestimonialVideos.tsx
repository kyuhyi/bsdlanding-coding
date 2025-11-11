"use client";
import { useState } from "react";

const videos = [
  {
    id: "hgEd6tOP4LA",
    type: "youtube",
    title: "수강후기 인터뷰 1",
    thumbnail: "https://img.youtube.com/vi/hgEd6tOP4LA/maxresdefault.jpg"
  },
  {
    id: "T06LemZX_1U",
    type: "youtube",
    title: "수강후기 인터뷰 2",
    thumbnail: "https://img.youtube.com/vi/T06LemZX_1U/maxresdefault.jpg"
  },
  {
    id: "ZEzIHoyxeaY",
    type: "youtube",
    title: "수강후기 인터뷰 3",
    thumbnail: "https://img.youtube.com/vi/ZEzIHoyxeaY/maxresdefault.jpg"
  },
  {
    id: "-nRZPrtcI9w",
    type: "youtube",
    title: "수강후기 인터뷰 4",
    thumbnail: "https://img.youtube.com/vi/-nRZPrtcI9w/maxresdefault.jpg"
  }
];

export default function TestimonialVideos() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-20 md:py-32 relative bg-ink">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">수강후기 인터뷰</h2>
          <p className="text-lg md:text-xl text-white/70">
            실제 수강생들의 생생한 후기를 확인하세요
          </p>
        </div>

        {/* Main Video Player */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-primary/30 shadow-2xl shadow-primary/20 bg-gradient-to-br from-white/5 to-white/0 mb-6">
          <div className="relative aspect-video bg-gradient-to-br from-slate-800 via-slate-900 to-black">
            {videos[activeIndex].type === "wistia" ? (
              <iframe
                className="w-full h-full"
                src={`https://fast.wistia.net/embed/iframe/${videos[activeIndex].id}?videoFoam=true`}
                title={videos[activeIndex].title}
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            ) : (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videos[activeIndex].id}?controls=1&modestbranding=1&rel=0`}
                title={videos[activeIndex].title}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {videos.map((video, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`relative overflow-hidden rounded-xl transition-all group ${
                activeIndex === index
                  ? "ring-2 ring-primary shadow-lg shadow-primary/30"
                  : "ring-1 ring-white/10 hover:ring-primary/50"
              }`}
            >
              <div className="relative aspect-video">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                {activeIndex !== index && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg
                        className="w-5 h-5 text-ink ml-0.5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
                {activeIndex === index && (
                  <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                    <div className="text-primary font-bold text-sm">재생중</div>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
