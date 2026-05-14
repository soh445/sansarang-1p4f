export default function Home() {
  return (
    <main style={{ fontFamily: "sans-serif" }}>
      
      {/* HERO */}
      <section style={{
        padding: "140px 24px",
        maxWidth: 1000,
        margin: "0 auto"
      }}>
        <h1 style={{
          fontSize: 56,
          fontWeight: 700,
          lineHeight: 1.2
        }}>
          자연과 사람을<br />더 가깝게 연결합니다
        </h1>

        <p style={{
          marginTop: 20,
          fontSize: 18,
          color: "#666"
        }}>
          산사랑은 산장, 캠핑장, 자연 공간을 쉽게 소개하고 관리하는 플랫폼입니다.
        </p>

        <button style={{
          marginTop: 40,
          padding: "14px 24px",
          borderRadius: 12,
          background: "black",
          color: "white",
          fontSize: 16
        }}>
          둘러보기
        </button>
      </section>

      {/* FEATURES */}
      <section style={{
        maxWidth: 1000,
        margin: "0 auto",
        padding: "0 24px 120px"
      }}>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20
        }}>
          
          {[
            ["자연 공간 소개", "산장, 캠핑장 정보 제공"],
            ["간편한 운영", "관리자 없이도 운영 가능"],
            ["예약 연결", "필요할 때만 예약 기능"]
          ].map(([title, desc]) => (
            <div key={title} style={{
              padding: 24,
              borderRadius: 16,
              background: "#f7f7f7"
            }}>
              <h3>{title}</h3>
              <p style={{ color: "#666", fontSize: 14 }}>
                {desc}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: 60,
        textAlign: "center",
        color: "#999"
      }}>
        © 2026 산사랑
      </footer>

    </main>
  )
}