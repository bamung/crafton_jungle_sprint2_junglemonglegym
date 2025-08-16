import React, { useState } from 'react';
import LoginModal from './LoginModal';

function MainPage() {
  const [showLogin, setShowLogin] = useState(true);

  const handleIconClick = (feature) => {
    alert(`"${feature}" 기능은 추후 연결됩니다!`);
  };
  const handlePartClick = (part) => {
    alert(`"${part}" 부위를 선택하셨습니다.`);
  };
  
  return (
    <div style={{
      maxWidth: "1000px",
      margin: "0 auto",
      padding: "28px 10px 10px 10px",
      textAlign: "center"
    }}>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {/* 상단 정보 그대로 */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        
        {/* 왼쪽 날짜 영역: 왼쪽 정렬 */}
        <div style={{ textAlign: "left", minWidth: "120px" }}>
            <div style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#65CFC7" }}>D+32</div>
            <div style={{ fontSize: "0.98rem", marginTop: "2px" }}>2025년 8월 15일</div>
        </div>
    </div>
    <div>
        {/* 로고 영역: 가로 중앙 정렬(부모가 flex이므로 margin auto로 중앙 배치) */}
        <div style={{ margin: "0 auto" }}>
            <div className="logo" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ fontSize: "2.2rem", fontWeight: "bold", color: "#65CFC7" }}>정글몽글짐</div>
            <span style={{ fontSize: "1.5rem", color: "#FFD680", fontWeight: "bold", marginTop: "6px" }}>오늘부터 득근↑</span>
            </div>
        </div>
    </div>


      <div style={{ display: "flex", justifyContent: "space-between", margin: "30px 0 22px" }}>
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "20px"}}>
          <div
            style={{width:"60px", height:"60px", background:"#24c474ff", borderRadius:"14px", boxShadow:"0 2px 8px #efd", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer"}}
            onClick={() => handleIconClick("득근캘린더")}
          >
            {/* 득근캘린더 이미지 안내 */}
          </div>
          <div
            style={{width:"60px", height:"60px", background:"#FFD680", borderRadius:"14px", boxShadow:"0 2px 8px #efd", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer"}}
            onClick={() => handleIconClick("몽글이 뱃지")}
          >
            {/* 몽글이 뱃지 이미지 안내 */}
          </div>
        </div>
      <div style={{ position: "relative", display: "inline-block" }}>
        <img
          src="/monggle.png"
          alt="몽글이 캐릭터"
          style={{
            width: "500px",
            borderRadius: "35px",
            boxShadow: "0 4px 16px #FCE4B2",
            background: "#FFF9F3"
          }}
        />

        {/* 어깨 */}
        <button
        onClick={() => handlePartClick('어깨')}
        style={{
            position: "absolute",
            top: "47%", left: "10%",
            display: "flex", alignItems: "center",
            background: "transparent",
            border: "none",
            padding: 0, margin: 0,
            cursor: "pointer",
            outline: "none"
        }}
        aria-label="어깨"
        tabIndex={0}
        >
        <span style={{
            marginBottom: "20px",
            color: "#e74c3c", fontWeight: "bold",
            fontSize: "1rem", marginLeft: "4px"
        }}>어깨</span>               
        <div style={{
            marginLeft: "3px",
            marginBottom: "10px",
            width: "15px", height: "3px", transform: "rotate(25deg)", 
            background: "#e74c3c"
        }}></div>
        <div
            style={{
            width: "36px", height: "25px",
            borderRadius: "50%",
            background: "transparent",
            border: "3px solid #e74c3c",
            marginLeft: "-2px",
            zIndex: 2
            }}
        />
        </button>

        {/* 등 */}
        <button
        onClick={() => handlePartClick('등')}
        style={{
            position: "absolute",
            top: "20%", left: "48%",
            display: "flex", alignItems: "center",
            flexDirection: "column",
            background: "transparent",
            border: "none",
            padding: 0, margin: 0,
            cursor: "pointer",
            outline:"none"
        }}
        aria-label="등"
        tabIndex={0}
        >
        <span style={{
            marginBottom: "-6px",
            marginRight: "7px",
            color: "#e74c3c", fontWeight: "bold",
            fontSize: "1rem"
        }}>등</span>               
        <div style={{
            marginLeft: "5px",
            marginTop: "10px",
            width: "15px", height: "3px", transform: "rotate(70deg)", 
            background: "#e74c3c"
        }}></div>

        </button>


        {/* 가슴 */}
        <button
        onClick={() => handlePartClick('가슴')}
        style={{
            position: "absolute",
            top: "51%", left: "46%",
            display: "flex", alignItems: "center",
            background: "transparent",
            border: "none",
            padding: 0, margin: 0,
            cursor: "pointer",
            outline: "none"
        }}
        aria-label="가슴"
        tabIndex={0}
        >
        <div
            style={{
            width: "36px", height: "26px",
            borderRadius: "50%",
            background: "transparent",
            border: "3px solid #e74c3c",
            marginRight: "-2px",
            zIndex: 2
            }}
        />
        <div style={{
            marginRight: "2px",
            marginBottom: "10px",
            width: "25px", height: "3px", transform: "rotate(160deg)", 
            background: "#e74c3c"
        }}></div>
        <span style={{
            marginBottom: "20px",
            color: "#e74c3c", fontWeight: "bold",
            fontSize: "1rem", marginLeft: "4px"
        }}>가슴</span>
        </button>

        {/* 팔 */}
        <button
        onClick={() => handlePartClick('팔')}
        style={{
            position: "absolute",
            top: "56%", left: "65%",
            display: "flex", alignItems: "center",
            background: "transparent",
            border: "none",
            padding: 0, margin: 0,
            cursor: "pointer",
            outline: "none"
        }}
        aria-label="팔"
        tabIndex={0}
        >
        <div
            style={{
            width: "36px", height: "26px",
            borderRadius: "50%",
            background: "transparent",
            border: "3px solid #e74c3c",
            marginRight: "-2px",
            zIndex: 2
            }}
        />
        <div style={{
            marginRight: "2px",
            marginTop: "10px",
            width: "18px", height: "3px", transform: "rotate(200deg)", 
            background: "#e74c3c"
        }}></div>
        <span style={{
            marginTop: "20px",
            color: "#e74c3c", fontWeight: "bold",
            fontSize: "1rem", marginLeft: "2px"
        }}>팔</span>
        </button>


        {/* 하체 */}
        <button
        onClick={() => handlePartClick('하체')}
        style={{
            position: "absolute",
            top: "65%", left: "35%",
            display: "flex", alignItems: "center",
            flexDirection: "column",
            background: "transparent",
            border: "none",
            padding: 0, margin: 0,
            cursor: "pointer",
            outline: "none"
        }}
        aria-label="하체"
        tabIndex={0}
        >
        <div
            style={{
            width: "36px", height: "26px",
            borderRadius: "50%",
            background: "transparent",
            border: "3px solid #e74c3c",
            marginBottom: "5px",
            zIndex: 2
            }}
        />
        <div style={{
            marginLeft: "8px",
            width: "15px", height: "3px", transform: "rotate(70deg)", 
            background: "#e74c3c"
        }}></div>
        <span style={{
            marginTop: "8px",
            color: "#e74c3c", fontWeight: "bold",
            fontSize: "1rem", marginLeft: "15px"
        }}>하체</span>
        </button>

    </div>


        <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap: "20px"}}>
            <div
                style={{width:"60px", height:"60px", background:"#B3C0E4", borderRadius:"14px", boxShadow:"0 2px 8px #efd", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer"}}
                onClick={() => handleIconClick("일기")}
            >
            {/* 일기 이미지 안내 */}
            </div>
            <div
                style={{width:"60px", height:"60px", background:"#65CFC7", borderRadius:"14px", boxShadow:"0 2px 8px #efd", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer"}}
                onClick={() => handleIconClick("스트레칭")}
            >
            {/* 스트레칭 이미지 안내 */}
            </div>
            <button
            onClick={() => handleIconClick('체중계')}
            style={{width:"60px", height:"60px", background:"#b6ebd5ff", borderRadius:"14px", boxShadow:"0 2px 8px #efd", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer"}}
            aria-label="하체"
            tabIndex={0}
            >
            </button>
            <div style={{ fontSize: "0.8rem", color: "#666", marginTop: "-15px", textAlign: "center" }}>
            목표까지 7kg!
            </div>

        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-around", margin:"24px 0" }}>
        <div
          style={{width:"120px", height:"70px", background:"#FFF8E7", borderRadius:"22px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", boxShadow:"0 2px 10px #ecd", cursor:"pointer"}}
          onClick={() => handleIconClick("오늘은 살살")}
        >
          <span style={{fontWeight:"bold",fontSize:"1.03rem"}}>오늘은 살살!</span>
          {/* 덤벨, 헬린이 이미지 안내 */}
        </div>
        <div
          style={{width:"120px", height:"70px", background:"#FFD680", borderRadius:"22px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", boxShadow:"0 2px 10px #ecd", cursor:"pointer"}}
          onClick={() => handleIconClick("오늘은 적당히")}
        >
          <span style={{fontWeight:"bold",fontSize:"1.03rem"}}>오늘은 적당히!!</span>
          {/* 헬청년 덤벨 이미지 안내 */}
        </div>
        <div
          style={{width:"120px", height:"70px", background:"#B3C0E4", borderRadius:"22px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", boxShadow:"0 2px 10px #ecd", cursor:"pointer"}}
          onClick={() => handleIconClick("오늘은 빡세게")}
        >
          <span style={{fontWeight:"bold",fontSize:"1.03rem"}}>오늘은 빡세게!!!</span>
          {/* 헬 난이도 최고 이미지 안내 */}
        </div>
        <div
          style={{width:"120px", height:"70px", background:"#65CFC7", borderRadius:"22px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", boxShadow:"0 2px 10px #ecd", cursor:"pointer"}}
          onClick={() => handleIconClick("나만의 운동")}
        >
          <span style={{fontWeight:"bold",fontSize:"1.03rem"}}>나만의 운동</span>
          {/* 나만의 운동 이미지 안내 */}
        </div>
      </div>


    </div>
  );
}

export default MainPage;
