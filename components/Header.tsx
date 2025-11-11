"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Volume2, VolumeX } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // 오디오 요소 생성 및 자동 재생
    audioRef.current = new Audio("/Mastering_BSD jazz mvp.wav");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    // 자동 재생 시도
    const playAudio = async () => {
      try {
        await audioRef.current?.play();
        setIsPlaying(true);
      } catch (error) {
        console.log("Auto-play prevented. User interaction required.");
        setIsPlaying(false);
      }
    };

    playAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end h-16 md:h-20">
          {/* 음악 재생/일시정지 버튼만 표시 */}
          <button
            onClick={toggleMusic}
            className="p-2 rounded-full bg-white/50 backdrop-blur-sm border border-white/20 hover:bg-white/70 transition-all"
            aria-label={isPlaying ? "음악 일시정지" : "음악 재생"}
          >
            {isPlaying ? (
              <Volume2 className="w-5 h-5 text-purple-600" />
            ) : (
              <VolumeX className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
      </nav>

      {/* 네비게이션과 로그인/회원가입 버튼 숨김 - 나중에 필요할 때 주석 해제
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center space-x-2">
            <Image
              src="/bsd-symbol-color.png"
              alt="BSD Logo"
              width={40}
              height={40}
              className="w-8 h-8 md:w-10 md:h-10"
            />
            <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              BSD 바이브코딩
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-sm lg:text-base font-medium text-gray-700 hover:text-purple-600 transition-colors">
              회사소개
            </a>
            <a href="#products" className="text-sm lg:text-base font-medium text-gray-700 hover:text-purple-600 transition-colors">
              상품
            </a>
          </div>

          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="hidden sm:flex items-center space-x-3">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
                로그인
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:shadow-lg hover:scale-105 transition-all">
                회원가입
              </button>
            </div>

            <button
              onClick={toggleMusic}
              className="p-2 rounded-full bg-white/50 backdrop-blur-sm border border-white/20 hover:bg-white/70 transition-all"
              aria-label={isPlaying ? "음악 일시정지" : "음악 재생"}
            >
              {isPlaying ? (
                <Volume2 className="w-5 h-5 text-purple-600" />
              ) : (
                <VolumeX className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        <div className="md:hidden pb-3 flex justify-center space-x-6">
          <a href="#about" className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
            회사소개
          </a>
          <a href="#products" className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
            상품
          </a>
        </div>
      </nav>
      */}
    </header>
  );
}
