"use client";

import { useEffect, useRef, useState } from "react";
import Gallery from "./components/Gallery";
import "./home.css";

const features = [
  ["둘러보기", "연수원 정보를 한곳에서 살펴보세요."],
  ["유튜브 채널", "유튜브 채널에서 산사랑의 모습을 영상으로 만나보세요."],
  ["카카오 채널 예약문의",  "카카오 채널로 예약 문의를 남겨보세요."],
] as const;

const heroImages = [
  "/photos/KakaoTalk_20260517_114334564.jpg",
  "/photos/KakaoTalk_20260517_114400800.jpg",
  "/photos/KakaoTalk_20260517_114514523.jpg",
  "/photos/KakaoTalk_20260517_114557666.jpg",
  "/photos/KakaoTalk_20260517_114631659.jpg",
];

const placeInfo = {
  name: "산사랑(팔공아트홀)",
  category: "자연 관광지",
  address: "대구 군위군 부계면 한티로 1722",
  description: "네이버 지도에서 검색한 팔공산 산사랑 정보입니다.",
  naverUrl:
    "https://map.naver.com/p/search/%ED%8C%94%EA%B3%B5%EC%82%B0%20%EC%82%B0%EC%82%AC%EB%9E%91/place/15567648?placePath=/home?bk_query=%ED%8C%94%EA%B3%B5%EC%82%B0%20%EC%82%B0%EC%82%AC%EB%9E%91&entry=pll&from=map&fromNxList=true&fromPanelNum=2&timestamp=202605171512&locale=ko&svcName=map_pcv5&searchText=%ED%8C%94%EA%B3%B5%EC%82%B0%20%EC%82%B0%EC%82%AC%EB%9E%91&placeSearchOption=bk_query%3D%25ED%258C%2594%25EA%25B3%25B5%25EC%2582%25B0%2520%25EC%2582%25B0%25EC%2582%25AC%25EB%259E%2591%26entry%3Dpll%26fromNxList%3Dtrue%26originalQuery%3D%25ED%258C%2594%25EA%25B3%25B5%25EC%2582%25B0%2520%25EC%2582%25B0%25EC%2582%25AC%25EB%259E%2591%26x%3D126.956100%26y%3D37.554600&searchType=place&c=15.00,0,0,0,dh",
};

const kakaoChannelUrl = "http://pf.kakao.com/_aQFsX";
const kakaoChatUrl = "http://pf.kakao.com/_aQFsX/chat";
const youtubeChannelUrl = "https://www.youtube.com/@%ED%8C%94%EA%B3%B5%EC%95%84%ED%8A%B8%ED%99%80%EA%B0%80%EC%88%98%EA%B9%80%EB%AF%B8%EC%95%A0";

const youtubeVideoId = "vVZrsK9QkMA";

const galleryImages = Array.from({ length: 10 }, (_, index) =>
  heroImages[index % heroImages.length]
);

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [slideOpacities, setSlideOpacities] = useState<number[]>(
    heroImages.map((_, index) => (index === 0 ? 1 : 0))
  );

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    let frame = 0;

    const updateBackground = () => {
      const heroTop = hero.offsetTop;
      const totalScroll = Math.max(hero.offsetHeight - window.innerHeight, 1);
      const progress = clamp((window.scrollY - heroTop) / totalScroll, 0, 1);
      const slideProgress = progress * (heroImages.length - 1);

      setSlideOpacities(
        heroImages.map((_, index) => {
          const distance = Math.abs(slideProgress - index);
          return distance >= 1 ? 0 : 1 - distance;
        })
      );
    };

    const onScroll = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateBackground);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateBackground();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // delegated click fallback: handle clicks on elements with [data-open-gallery]
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest && (target.closest("[data-open-gallery]") as HTMLElement)) {
        setGalleryOpen(true);
      }
    };

    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <main className="home">
      <Gallery
        images={galleryImages}
        visibleCount={5}
        open={galleryOpen}
        onClose={() => setGalleryOpen(false)}
      />

      <section className="hero" aria-label="소개" ref={heroRef}>
        {heroImages.map((src, index) => (
          <div
            key={src}
            className="hero__slide"
            aria-hidden="true"
            style={{ opacity: slideOpacities[index] }}
          >
            <img src={src} alt={`히어로 사진 ${index + 1}`} />
          </div>
        ))}

        <div className="hero__sticky">
          <div className="hero__overlay">
            <p className="statement__text">
              스크롤할수록
              <br />
              이야기가 펼쳐집니다
            </p>
          </div>
        </div>
      </section>

      <section className="video-embed" aria-labelledby="video-embed-heading">
        <div className="video-embed__inner">
          <h2 id="video-embed-heading" className="video-embed__heading">
            자연 공간 소개 영상
          </h2>
          <div className="video-embed__frame">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeVideoId}`}
              title="팔공산 산사랑 소개 영상"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="features" id="explore" aria-labelledby="features-heading">
        <h2 id="features-heading" className="features__heading">
          안내
        </h2>
        <p className="features__sub">
          드래그하며 내려보면 카드가 순서대로 나타납니다.
        </p>
        <ul className="features__grid">

          {features.map(([title, desc]) => (
            <li key={title} className="feature-card">
              {title === "둘러보기" ? (
                <button
                  type="button"
                  className="feature-card__btn"
                  data-open-gallery
                  onClick={() => setGalleryOpen(true)}
                >
                  <h3 className="feature-card__title">{title}</h3>
                  <p className="feature-card__desc">{desc}</p>
                </button>
              ) : title === "카카오 채널 예약문의" ? (
                <div className="feature-card__actions">
                  <a
                    className="feature-card__link"
                    href={kakaoChannelUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    카카오 채널 바로가기
                  </a>
                  <a
                    className="feature-card__link feature-card__link--primary"
                    href={kakaoChatUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    카카오 채팅 바로가기
                  </a>
                </div>
              ) : title === "유튜브 채널" ? (
                <div className="feature-card__actions">
                  <a
                    className="feature-card__link feature-card__link--primary"
                    href={youtubeChannelUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    유튜브 바로가기
                  </a>
                  <p className="feature-card__desc">{desc}</p>
                </div>
              ) : (
                <>
                  <h3 className="feature-card__title">{title}</h3>
                  <p className="feature-card__desc">{desc}</p>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="place-info" aria-labelledby="place-info-heading">
        <div className="place-info__content">
          <h2 id="place-info-heading" className="place-info__heading">
            장소 정보
          </h2>
          <p className="place-info__description">{placeInfo.description}</p>
          <dl className="place-info__list">
            <div className="place-info__row">
              <dt className="place-info__label">장소명</dt>
              <dd className="place-info__value">{placeInfo.name}</dd>
            </div>
            <div className="place-info__row">
              <dt className="place-info__label">카테고리</dt>
              <dd className="place-info__value">{placeInfo.category}</dd>
            </div>
            <div className="place-info__row">
              <dt className="place-info__label">주소</dt>
              <dd className="place-info__value">{placeInfo.address}</dd>
            </div>
          </dl>
          <a
            className="place-info__link"
            href={placeInfo.naverUrl}
            target="_blank"
            rel="noreferrer"
          >
            네이버 지도에서 보기
          </a>
        </div>
      </section>
      <footer className="home-footer">
      산사랑(팔공아트홀)대표 김미애
      <br/>010-6524-0036
      <br/>054-383-3747
      <br/>가수김미애 사랑의꽃
      </footer> 
    </main>
  );
}
