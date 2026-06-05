export default function VerifiedBadge({ size = 18, onClick }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      onClick={onClick}
      style={onClick ? { cursor: 'pointer' } : undefined}
    >
      <path
        d="M10 1L12.39 3.26L15.61 3.29L15.64 6.51L17.91 8.9L15.64 11.29L15.61 14.51L12.39 14.54L10 16.8L7.61 14.54L4.39 14.51L4.36 11.29L2.09 8.9L4.36 6.51L4.39 3.29L7.61 3.26L10 1Z"
        fill="#7C3AED"
      />
      <path
        d="M6.5 10L8.5 12L13.5 7"
        stroke="white"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
