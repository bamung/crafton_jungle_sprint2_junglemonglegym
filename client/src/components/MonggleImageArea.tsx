export type BodyPart = '어깨' | '등' | '가슴' | '팔' | '하체';

type MonggleImageAreaProps = {
  handlePartClick: (part: BodyPart) => void;
};

function MonggleImageArea({ handlePartClick }: MonggleImageAreaProps){
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        minHeight: "480px",
        background: "transparent",
        zIndex: 10
      }}
    >
      <img
        src="/monggle_cha.png"
        alt="몽글이 캐릭터"
        style={{
          width: "550px",
          maxWidth: "70vw",
          height: "auto",
          display: "block",
          margin: "0 auto",
          background: "transparent",
          borderRadius: "35px",
          zIndex: 10,
          position: "relative"
        }}
      />
      {/* 어깨 */}
      <button
        onClick={() => handlePartClick('어깨')}
        style={{
          position: "absolute", top: "47%", left: "10%",
          display: "flex", alignItems: "center",
          background: "transparent", border: "none",
          padding: 0, margin: 0, cursor: "pointer", outline: "none"
        }}
        aria-label="어깨"
        tabIndex={0}
      >
        <span style={{
          marginBottom: "20px", color: "#e74c3c", fontWeight: "bold",
          fontSize: "1rem", marginLeft: "4px"
        }}>어깨</span>
        <div style={{
          marginLeft: "3px", marginBottom: "10px", width: "15px", height: "3px",
          transform: "rotate(25deg)", background: "#e74c3c"
        }}></div>
        <div style={{
          width: "36px", height: "25px", borderRadius: "50%",
          background: "transparent", border: "3px solid #e74c3c",
          marginLeft: "-2px", zIndex: 2
        }}/>
      </button>
      {/* 등 */}
      <button
        onClick={() => handlePartClick('등')}
        style={{
          position: "absolute", top: "20%", left: "48%",
          display: "flex", alignItems: "center", flexDirection: "column",
          background: "transparent", border: "none", padding: 0, margin: 0,
          cursor: "pointer", outline: "none"
        }}
        aria-label="등"
        tabIndex={0}
      >
        <span style={{
          marginBottom: "-6px", marginRight: "7px", color: "#e74c3c",
          fontWeight: "bold", fontSize: "1rem"
        }}>등</span>
        <div style={{
          marginLeft: "5px", marginTop: "10px", width: "15px", height: "3px",
          transform: "rotate(70deg)", background: "#e74c3c"
        }}></div>
      </button>
      {/* 가슴 */}
      <button
        onClick={() => handlePartClick('가슴')}
        style={{
          position: "absolute", top: "51%", left: "46%",
          display: "flex", alignItems: "center", background: "transparent",
          border: "none", padding: 0, margin: 0, cursor: "pointer", outline: "none"
        }}
        aria-label="가슴"
        tabIndex={0}
      >
        <div style={{
          width: "36px", height: "26px", borderRadius: "50%",
          background: "transparent", border: "3px solid #e74c3c",
          marginRight: "-2px", zIndex: 2
        }}/>
        <div style={{
          marginRight: "2px", marginBottom: "10px", width: "25px", height: "3px",
          transform: "rotate(160deg)", background: "#e74c3c"
        }}></div>
        <span style={{
          marginBottom: "20px", color: "#e74c3c", fontWeight: "bold",
          fontSize: "1rem", marginLeft: "4px"
        }}>가슴</span>
      </button>
      {/* 팔 */}
      <button
        onClick={() => handlePartClick('팔')}
        style={{
          position: "absolute", top: "56%", left: "65%",
          display: "flex", alignItems: "center", background: "transparent", border: "none",
          padding: 0, margin: 0, cursor: "pointer", outline: "none"
        }}
        aria-label="팔"
        tabIndex={0}
      >
        <div style={{
          width: "36px", height: "26px", borderRadius: "50%",
          background: "transparent", border: "3px solid #e74c3c",
          marginRight: "-2px", zIndex: 2
        }}/>
        <div style={{
          marginRight: "2px", marginTop: "10px", width: "18px", height: "3px",
          transform: "rotate(200deg)", background: "#e74c3c"
        }}></div>
        <span style={{
          marginTop: "20px", color: "#e74c3c", fontWeight: "bold",
          fontSize: "1rem", marginLeft: "2px"
        }}>팔</span>
      </button>
      {/* 하체 */}
      <button
        onClick={() => handlePartClick('하체')}
        style={{
          position: "absolute", top: "65%", left: "35%",
          display: "flex", alignItems: "center", flexDirection: "column",
          background: "transparent", border: "none", padding: 0, margin: 0,
          cursor: "pointer", outline: "none"
        }}
        aria-label="하체"
        tabIndex={0}
      >
        <div style={{
          width: "36px", height: "26px", borderRadius: "50%",
          background: "transparent", border: "3px solid #e74c3c",
          marginBottom: "5px", zIndex: 2
        }}/>
        <div style={{
          marginLeft: "8px", width: "15px", height: "3px",
          transform: "rotate(70deg)", background: "#e74c3c"
        }}></div>
        <span style={{
          marginTop: "8px", color: "#e74c3c", fontWeight: "bold",
          fontSize: "1rem", marginLeft: "15px"
        }}>하체</span>
      </button>
    </div>
  );
}

export default MonggleImageArea;
