import "./home.css";

const features = [
  ["자연 공간 소개", "산장, 캠핑장 정보를 한곳에서 살펴보세요."],
  ["간편한 운영", "관리자 없이도 공간을 소개하고 운영할 수 있습니다."],
  ["예약 연결", "필요할 때만 예약 기능을 연결합니다."],
] as const;

export default function Home() {
  return (
    <main className="home">
      <section className="hero" aria-label="소개">
        <div className="hero__sticky">
          <p className="hero__eyebrow">산사랑</p>
          <h1 className="hero__title">
            자연과 사람을
            <br />
            더 가깝게 연결합니다
          </h1>
          <p className="hero__lead">
            산사랑은 산장, 캠핑장, 자연 공간을 쉽게 소개하고 관리하는
            플랫폼입니다.
          </p>
          <a className="hero__cta" href="#explore">
            둘러보기
          </a>
          <span className="hero__scroll-hint" aria-hidden="true">
            스크롤
          </span>
        </div>
      </section>

      <section className="statement" aria-label="비전">
        <div className="statement__pin">
          <p className="statement__text">
            스크롤할수록
            <br />
            이야기가 펼쳐집니다
          </p>
        </div>
      </section>

      <section className="features" id="explore" aria-labelledby="features-heading">
        <h2 id="features-heading" className="features__heading">
          이렇게 돕습니다
        </h2>
        <p className="features__sub">
          드래그하며 내려보면 카드가 순서대로 나타납니다.
        </p>
        <ul className="features__grid">
          {features.map(([title, desc]) => (
            <li key={title} className="feature-card">
              <h3 className="feature-card__title">{title}</h3>
              <p className="feature-card__desc">{desc}</p>
            </li>
          ))}
        </ul>
      </section>

      <footer className="home-footer">© 2026 산사랑</footer>
    </main>
  );
}
