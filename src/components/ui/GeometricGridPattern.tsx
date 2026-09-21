import { SVGProps } from "react";

export function GeometricGridPattern({
  className = "w-36 h-36",
  ...props
}: SVGProps<SVGSVGElement>) {
  // Grid parameters matching the exact reference geometry:
  // Cell size U = 48, corner radius R = 16, straight segment S = 16
  // Total grid: 4 x 4 = 192 x 192
  // Color palette from reference:
  // - Pure White: #FFFFFF (center highlight squircle at cell 1,1)
  // - Soft Warm Taupe: #B2A89F (3 interconnected diagonal dumbbells)
  // - Rich Dark Espresso: #4D3F33 (interconnected diagonal chains & squircle)

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 192 192"
      fill="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* --- DARK ESPRESSO BROWN ELEMENTS --- */}
      {/* Brown Dumbbell 1: (1,0) -> (2,1) */}
      <path
        d="M 64 0 h 16 a 16 16 0 0 1 16 16 v 16 a 16 16 0 0 0 16 16 h 16 a 16 16 0 0 1 16 16 v 16 a 16 16 0 0 1 -16 16 h -16 a 16 16 0 0 1 -16 -16 v -16 a 16 16 0 0 0 -16 -16 h -16 a 16 16 0 0 1 -16 -16 v -16 a 16 16 0 0 1 16 -16 Z"
        fill="#4D3F33"
      />

      {/* Brown Chain 2 (triple): (0,1) -> (1,2) -> (2,3) */}
      <path
        d="M 16 48 h 16 a 16 16 0 0 1 16 16 v 16 a 16 16 0 0 0 16 16 h 16 a 16 16 0 0 1 16 16 v 16 a 16 16 0 0 0 16 16 h 16 a 16 16 0 0 1 16 16 v 16 a 16 16 0 0 1 -16 16 h -16 a 16 16 0 0 1 -16 -16 v -16 a 16 16 0 0 0 -16 -16 h -16 a 16 16 0 0 1 -16 -16 v -16 a 16 16 0 0 0 -16 -16 h -16 a 16 16 0 0 1 -16 -16 v -16 a 16 16 0 0 1 16 -16 Z"
        fill="#4D3F33"
      />

      {/* Brown Single Squircle at (0,3) */}
      <path
        d="M 16 144 h 16 a 16 16 0 0 1 16 16 v 16 a 16 16 0 0 1 -16 16 h -16 a 16 16 0 0 1 -16 -16 v -16 a 16 16 0 0 1 16 -16 Z"
        fill="#4D3F33"
      />

      {/* --- WARM TAUPE INTERCONNECTED DUMBBELLS --- */}
      {/* Taupe Dumbbell 1: (2,0) -> (3,1) */}
      <path
        d="M 112 0 h 16 a 16 16 0 0 1 16 16 v 16 a 16 16 0 0 0 16 16 h 16 a 16 16 0 0 1 16 16 v 16 a 16 16 0 0 1 -16 16 h -16 a 16 16 0 0 1 -16 -16 v -16 a 16 16 0 0 0 -16 -16 h -16 a 16 16 0 0 1 -16 -16 v -16 a 16 16 0 0 1 16 -16 Z"
        fill="#B2A89F"
      />

      {/* Taupe Dumbbell 2: (0,2) -> (1,3) */}
      <path
        d="M 16 96 h 16 a 16 16 0 0 1 16 16 v 16 a 16 16 0 0 0 16 16 h 16 a 16 16 0 0 1 16 16 v 16 a 16 16 0 0 1 -16 16 h -16 a 16 16 0 0 1 -16 -16 v -16 a 16 16 0 0 0 -16 -16 h -16 a 16 16 0 0 1 -16 -16 v -16 a 16 16 0 0 1 16 -16 Z"
        fill="#B2A89F"
      />

      {/* Taupe Dumbbell 3: (2,2) -> (3,3) */}
      <path
        d="M 112 96 h 16 a 16 16 0 0 1 16 16 v 16 a 16 16 0 0 0 16 16 h 16 a 16 16 0 0 1 16 16 v 16 a 16 16 0 0 1 -16 16 h -16 a 16 16 0 0 1 -16 -16 v -16 a 16 16 0 0 0 -16 -16 h -16 a 16 16 0 0 1 -16 -16 v -16 a 16 16 0 0 1 16 -16 Z"
        fill="#B2A89F"
      />

      {/* --- PURE WHITE HIGHLIGHT SQUIRCLE AT (1,1) --- */}
      <path
        d="M 64 48 h 16 a 16 16 0 0 1 16 16 v 16 a 16 16 0 0 1 -16 16 h -16 a 16 16 0 0 1 -16 -16 v -16 a 16 16 0 0 1 16 -16 Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}
