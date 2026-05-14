export default function Home() {
  return (
    <main style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: 40, fontWeight: "bold" }}>
        산사랑연수원
      </h1>

      <p style={{ marginTop: 20, fontSize: 18 }}>
        자연 속에서 배우고 쉬는 힐링 공간입니다.
      </p>

      <button style={{
        marginTop: 30,
        padding: "12px 20px",
        background: "black",
        color: "white",
        borderRadius: 8
      }}>
        예약 문의
      </button>
    </main>
  );
}