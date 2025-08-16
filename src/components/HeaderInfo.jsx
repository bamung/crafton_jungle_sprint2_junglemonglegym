import React from "react";

function HeaderInfo({ todayString }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
      <div style={{ textAlign: "left", minWidth: "120px" }}>
        <div style={{ fontSize: "2.0rem", fontWeight: "bold", color: "#65CFC7" }}>D+32</div>
        <div style={{ fontSize: "0.98rem", marginTop: "2px" }}>{todayString}</div>
      </div>
      <div style={{ margin: "0 auto" }}>
        <div className="logo" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ fontSize: "2.2rem", fontWeight: "bold", color: "#65CFC7" }}>정글몽글짐</div>
          <span style={{ fontSize: "1.5rem", color: "#FFD680", fontWeight: "bold", marginTop: "6px" }}>오늘부터 득근↑</span>
        </div>
      </div>
      <div style={{ minWidth: "120px" }}></div>
    </div>
  );
}

export default HeaderInfo;