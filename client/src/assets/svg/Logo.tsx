export default function Logo() {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-auto h-auto"
    >
      {/* Rotated square */}
      <rect
        x="100"
        y="30"
        width="100"
        height="100"
        transform="rotate(45 100 100)"
        stroke="rgb(45, 212, 191)"
        strokeWidth="4"
        fill="none"
      />

      {/* Text */}
      <text
        x="100"
        y="110"
        textAnchor="middle"
        fontSize="32"
        fontWeight="600"
        fill="rgb(55, 65, 81)"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        EazyDev
      </text>
    </svg>
  );
}
