"use client";

export default function Lawmate() {
  return (
    <div className="flex justify-center h-screen w-full p-60 bg-white">
      <svg
        width="400"
        height="100"
        viewBox="0 0 400 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          x="12"
          y="70"
          font-family="'harper"
          font-size="60"
          fill="#454545"
        >
          L
        </text>

        <g transform="translate(55, 10)">
          <path
            d="M20 10 Q10 10 10 40 Q10 70 20 70 Q30 70 30 40 Q30 10 20 10 Z"
            fill="#7EA1C4"
          />

          <circle cx="20" cy="40" r="30" fill="#7EA1C4" />
          <circle cx="10" cy="30" r="5" fill="#FEFAB5" />
          <path
            d="M25 28 Q28 33 31 28"
            stroke="#FEFAB5"
            stroke-width="2"
            fill="none"
          />

          <path
            d="M15 44 Q20 52 25 44"
            stroke="#FEFAB5"
            stroke-width="2"
            fill="none"
          />
        </g>

        <text
          x="110"
          y="70"
          font-family="harper"
          font-size="60"
          fill="#454545"
        >
          wmate
        </text>
      </svg>
    </div>
  );
}
