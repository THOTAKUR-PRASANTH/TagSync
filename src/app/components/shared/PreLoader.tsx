import React from "react";

const PreLoader = () => {
  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: scale(1.05); }
            100% { opacity: 1; transform: scale(1); }
          }

          @keyframes shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }

          @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
          }

          .loader-text {
            font-family: 'Poppins', sans-serif;
            font-size: 2rem;
            font-weight: 700;
            background: linear-gradient(90deg, #ff6ec4, #7873f5, #4ade80);
            background-size: 200%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shimmer 2s infinite linear;
          }

          .dot {
            width: 8px;
            height: 8px;
            margin-left: 4px;
            background-color: white;
            border-radius: 50%;
            display: inline-block;
            animation: bounce 1.4s infinite ease-in-out both;
          }
        `}
      </style>

      <div
        className="fixed top-0 left-0 h-screen w-screen flex flex-col items-center justify-center z-[999999]"
        style={{
          animation: "fadeIn 0.6s ease-out",
          backgroundColor: "transparent", // transparent background
        }}
      >
        <div className="loader-text">TagSync</div>

        {/* Dots equal to length of 'TagSync' */}
        <div className="flex mt-4">
          {"TagSync".split("").map((_, i) => (
            <span
              key={i}
              className="dot"
              style={{ animationDelay: `${i * 0.15}s` }}
            ></span>
          ))}
        </div>
      </div>
    </>
  );
};

export default PreLoader;
