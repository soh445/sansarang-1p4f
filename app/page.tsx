"use client"

import { useState } from "react"

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    people: 1,
    message: ""
  })

  const onChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const onSubmit = () => {
    alert("예약이 접수되었습니다 🙌")
    console.log(form)
  }

  return (
    <main style={{ fontFamily: "sans-serif", background: "white" }}>
      
      {/* HERO */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "80px 24px" }}>
        <h1 style={{ fontSize: 48, fontWeight: 700 }}>
          산사랑 예약 시스템
        </h1>
        <p style={{ color: "#666", marginTop: 12 }}>
          간편하게 예약하고, 자동으로 관리하세요
        </p>

        {/* FORM CARD */}
        <div style={{
          marginTop: 40,
          padding: 24,
          borderRadius: 16,
          background: "#f7f7f7"
        }}>

          {/* 이름 */}
          <input
            name="name"
            placeholder="이름"
            onChange={onChange}
            style={inputStyle}
          />

          {/* 전화번호 */}
          <input
            name="phone"
            placeholder="전화번호"
            onChange={onChange}
            style={inputStyle}
          />

          {/* 날짜 */}
          <input
            name="date"
            type="date"
            onChange={onChange}
            style={inputStyle}
          />

          {/* 인원 */}
          <input
            name="people"
            type="number"
            min={1}
            placeholder="인원"
            onChange={onChange}
            style={inputStyle}
          />

          {/* 요청사항 */}
          <textarea
            name="message"
            placeholder="요청사항 (선택)"
            onChange={onChange}
            style={{ ...inputStyle, height: 100 }}
          />

          {/* 버튼 */}
          <button
            onClick={onSubmit}
            style={{
              marginTop: 20,
              width: "100%",
              padding: 14,
              borderRadius: 12,
              background: "black",
              color: "white",
              fontSize: 16,
              cursor: "pointer"
            }}
          >
            예약하기
          </button>

        </div>
      </div>
    </main>
  )
}

const inputStyle = {
  width: "100%",
  padding: 14,
  marginBottom: 12,
  borderRadius: 10,
  border: "1px solid #ddd",
  fontSize: 14
}