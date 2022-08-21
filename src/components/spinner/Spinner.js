const Spinner = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.0"
      width="128px"
      height="128px"
      style={{
        margin: "0 auto",
        background: "none",
        display: "block",

      }}
    >
      <rect x="0" y="0" width="100%" height="100%" fill="#FFFFFF" />
      <g>
        <path
          d="M71 39.2V.4a63.6 63.6 0 0 1 33.96 14.57L77.68 42.24a25.53 25.53 0 0 0-6.7-3.03z"
          fill="#000000"
        />
        <path
          d="M71 39.2V.4a63.6 63.6 0 0 1 33.96 14.57L77.68 42.24a25.53 25.53 0 0 0-6.7-3.03z"
          fill="#e1e1e1"
          transform="rotate(45 64 64)"
        />
        <path
          d="M71 39.2V.4a63.6 63.6 0 0 1 33.96 14.57L77.68 42.24a25.53 25.53 0 0 0-6.7-3.03z"
          fill="#e1e1e1"
          transform="rotate(90 64 64)"
        />
        <path
          d="M71 39.2V.4a63.6 63.6 0 0 1 33.96 14.57L77.68 42.24a25.53 25.53 0 0 0-6.7-3.03z"
          fill="#e1e1e1"
          transform="rotate(135 64 64)"
        />
        <path
          d="M71 39.2V.4a63.6 63.6 0 0 1 33.96 14.57L77.68 42.24a25.53 25.53 0 0 0-6.7-3.03z"
          fill="#bebebe"
          transform="rotate(180 64 64)"
        />
        <path
          d="M71 39.2V.4a63.6 63.6 0 0 1 33.96 14.57L77.68 42.24a25.53 25.53 0 0 0-6.7-3.03z"
          fill="#979797"
          transform="rotate(225 64 64)"
        />
        <path
          d="M71 39.2V.4a63.6 63.6 0 0 1 33.96 14.57L77.68 42.24a25.53 25.53 0 0 0-6.7-3.03z"
          fill="#6e6e6e"
          transform="rotate(270 64 64)"
        />
        <path
          d="M71 39.2V.4a63.6 63.6 0 0 1 33.96 14.57L77.68 42.24a25.53 25.53 0 0 0-6.7-3.03z"
          fill="#3c3c3c"
          transform="rotate(315 64 64)"
        />
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 64 64;45 64 64;90 64 64;135 64 64;180 64 64;225 64 64;270 64 64;315 64 64"
          calcMode="discrete"
          dur="720ms"
          repeatCount="indefinite"
        ></animateTransform>
      </g>
      <g>
        <circle fill="#000000" cx="63.66" cy="63.16" r="12" />
        <animate
          attributeName="opacity"
          dur="720ms"
          begin="0s"
          repeatCount="indefinite"
          keyTimes="0;0.5;1"
          values="1;0;1"
        />
      </g>
    </svg>
  );
};
export default Spinner;
