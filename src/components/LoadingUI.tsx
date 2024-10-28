import React from "react";

const LoadingUI = () => {
  return (
    <div
      style={{ clipPath: "ellipse(50% 100% at 50% 100%)" }}
      className=" absolute top-0 left-0 w-full h-48 grid place-content-center bg-gray-200 bg-opacity-50 keyframes-accordion-down z-50 clip-path rotate-180"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width={80}>
        <radialGradient
          id="a12"
          cx=".66"
          fx=".66"
          cy=".3125"
          fy=".3125"
          gradientTransform="scale(1.5)"
        >
          <stop offset="0" stop-color="#07AD09"></stop>
          <stop offset=".3" stop-color="#07AD09" stop-opacity=".9"></stop>
          <stop offset=".6" stop-color="#07AD09" stop-opacity=".6"></stop>
          <stop offset=".8" stop-color="#07AD09" stop-opacity=".3"></stop>
          <stop offset="1" stop-color="#07AD09" stop-opacity="0"></stop>
        </radialGradient>
        <circle
          transform-origin="center"
          fill="none"
          stroke="url(#a12)"
          stroke-width="15"
          stroke-linecap="round"
          strokeDasharray="200 1000"
          strokeDashoffset="0"
          cx="100"
          cy="100"
          r="70"
        >
          <animateTransform
            type="rotate"
            attributeName="transform"
            calcMode="spline"
            dur="1.5"
            values="360;0"
            keyTimes="0;1"
            keySplines="0 0 1 1"
            repeatCount="indefinite"
          ></animateTransform>
        </circle>
        <circle
          transform-origin="center"
          fill="none"
          opacity=".2"
          stroke="#07AD09"
          stroke-width="15"
          stroke-linecap="round"
          cx="100"
          cy="100"
          r="70"
        ></circle>
      </svg>
    </div>
  );
};

export default LoadingUI;
