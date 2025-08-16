import React from 'react';

export default function LoginModal({ onClose }) {
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0,0,0,0.4)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    }}>
      <div style={{
        background: "#fff",
        borderRadius: "22px",
        width: "350px",
        padding: "34px 38px 28px",
        boxShadow: "0 6px 22px rgba(0,0,0,0.13)",
        textAlign: "center"
      }}>
        <h2 style={{
          color: "#65CFC7",
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "10px",
          letterSpacing: "-1px"
        }}>정글몽글짐</h2>
        <div style={{color:"#444", marginBottom:"12px", fontWeight:"500", fontSize:"1.15rem"}}>로그인!</div>
        <input
          placeholder="ID"
          style={{
            width: "100%",
            marginBottom: "13px",
            padding: "12px 18px",
            borderRadius: "12px",
            border: "1.5px solid #b3c0e4",
            fontSize: "1.04rem",
            boxSizing: "border-box",
          }}
        />
        <input
          type="password"
          placeholder="PW"
          style={{
            width: "100%",
            marginBottom: "6px",
            padding: "12px 18px",
            borderRadius: "12px",
            border: "1.5px solid #b3c0e4",
            fontSize: "1.04rem",
            boxSizing: "border-box"
          }}
        />
        <div style={{
          textAlign: "right",
          marginBottom: "22px",
          marginTop: "2px"
        }}>
          <span style={{color:"#65CFC7", fontSize:"0.97rem", cursor:"pointer"}}>
            PW 찾기
          </span>
        </div>
        <button
          style={{
            width: "100%",
            padding: "12px",
            background: "#65CFC7",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1.08rem",
            border: "none",
            borderRadius: "14px",
            marginBottom: "8px",
            cursor: "pointer"
          }}
          onClick={onClose}
        >
          로그인
        </button>
        <button
          style={{
            width: "100%",
            padding: "12px",
            background: "#FFD680",
            color: "#434343",
            fontWeight: "bold",
            fontSize: "1.08rem",
            border: "none",
            borderRadius: "14px",
            cursor: "pointer"
          }}
        >
          몽글짐 회원등록
        </button>
      </div>
    </div>
  );
}
