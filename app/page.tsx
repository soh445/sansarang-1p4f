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

const facilities = [
  {
    title: "연회장 & 행사 공간",
    description: "넓고 쾌적한 연회장과 행사 공간으로 돌잔치, 회갑연, 동창회, 야외 예식을 모두 지원합니다.",
  },
  {
    title: "주차 & 접근성",
    description: "팔공산 터널 옆 위치로 접근성이 뛰어나며, 대형 버스도 들어올 수 있는 넉넉한 주차 공간을 제공합니다.",
  },
  {
    title: "객실 & 휴식",
    description: "편안한 객실과 휴식 공간으로 자연의 소리를 들으며 여유롭게 머무를 수 있습니다.",
  },
];

const testimonials = [
  {
    quote: "친절한 서비스와 아름다운 풍경 덕분에 정말 만족스러운 연수가 되었습니다.",
    author: "기업 연수 담당자",
  },
  {
    quote: "아이들과 함께한 돌잔치가 무척 기억에 남습니다. 내부도 깨끗하고 편안했어요.",
    author: "가족 손님",
  },
  {
    quote: "카카오 채널 상담도 빠르고, 예약부터 안내까지 모두 매끄럽게 진행되었습니다.",
    author: "단체 예약 고객",
  },
];

const faqs = [
  {
    question: "연수원 예약은 어떻게 하나요?",
    answer: "카카오 채널 또는 채팅으로 예약 문의를 남겨주시면 빠르게 안내드립니다.",
  },
  {
    question: "주차는 무료인가요?",
    answer: "네, 고객님을 위한 무료 주차 공간이 준비되어 있습니다.",
  },
  {
    question: "단체 행사도 가능한가요?",
    answer: "돌잔치, 회갑연, 동창회, 야외 예식 등 다양한 단체 행사에 맞춰 준비해드립니다.",
  },
];

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
            <h1 className="hero__title">산사랑 연수원에 오신 것을 환영합니다.</h1>
            <p className="hero__lead">
              자연과 함께하는 편안한 연수, 돌잔치, 회갑연, 야외 예식까지 모두 가능한
              팔공산 산사랑의 특별한 공간입니다.
            </p>
            <div className="hero__actions">
              <a
                className="hero__button hero__button--primary"
                href={kakaoChatUrl}
                target="_blank"
                rel="noreferrer"
              >
                채팅으로 예약 문의
              </a>
              <a
                className="hero__button hero__button--secondary"
                href={youtubeChannelUrl}
                target="_blank"
                rel="noreferrer"
              >
                유튜브 채널 보기
              </a>
            </div>
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
          아름다운 팔공산의 경치를 느끼시면서 소중한 분들과의 모임을 가질 수 있는 산사랑입니다.
          저희 연회장은 수려한 풍경과 편리한 교통(팔공산 터널 옆)으로 다양한 행사를 지원합니다.
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
                    채널 URL
                  </a>
                  <a
                    className="feature-card__link feature-card__link--primary"
                    href={kakaoChatUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    채팅 URL
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

      <section className="home-facilities" aria-labelledby="facilities-heading">
        <div className="section-header">
          <h2 id="facilities-heading">시설 안내</h2>
          <p>행사형 연수, 가족 모임, 단체 예약까지 모두 만족시키는 공간입니다.</p>
        </div>
        <div className="facility-grid">
          {facilities.map(({ title, description }) => (
            <article key={title} className="facility-card">
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="testimonials" aria-labelledby="testimonials-heading">
        <div className="section-header">
          <h2 id="testimonials-heading">고객 후기</h2>
          <p>산사랑을 다녀간 고객님들이 남긴 생생한 후기입니다.</p>
        </div>
        <div className="testimonial-grid">
          {testimonials.map(({ quote, author }) => (
            <figure key={author} className="testimonial-card">
              <blockquote>“{quote}”</blockquote>
              <figcaption>{author}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="faq" aria-labelledby="faq-heading">
        <div className="section-header">
          <h2 id="faq-heading">자주 묻는 질문</h2>
          <p>예약 전 궁금한 내용을 빠르게 확인하세요.</p>
        </div>
        <div className="faq-grid">
          {faqs.map(({ question, answer }) => (
            <div key={question} className="faq-card">
              <h3>{question}</h3>
              <p>{answer}</p>
            </div>
          ))}
        </div>
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
