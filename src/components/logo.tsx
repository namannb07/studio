import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      className={cn("w-32 h-32", className)}
    >
      <defs>
        <style>
          {`
            .chef-hat { fill: #FDF1D8; }
            .hat-band { fill: #FDF1D8; stroke: #E6A23C; stroke-width: 2px; }
            .cook-text { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 40px; fill: #FDF1D8; }
            .it-up-text { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 40px; fill: #FDF1D8; }
            .smile { fill: none; stroke: #FDF1D8; stroke-width: 5px; stroke-linecap: round; }
          `}
        </style>
      </defs>
      
      {/* Background shape */}
      <path d="M40,75 C20,100 20,160 40,180 L160,180 C180,160 180,100 160,75 L140,75 C120,60 80,60 60,75 Z" fill="#E6A23C" />
      <path d="M40,75 C20,100 20,160 40,180 L160,180 C180,160 180,100 160,75 L140,75 C120,60 80,60 60,75 Z" fillOpacity="0.5" stroke="#FDF1D8" strokeWidth="3" />

      {/* Chef Hat */}
      <path className="chef-hat" d="M60 55 C 30 55, 30 25, 60 25 C 60 10, 80 10, 85 20 C 90 10, 110 10, 115 20 C 120 10, 140 10, 140 25 C 170 25, 170 55, 140 55 Z" />
      <rect x="55" y="45" width="90" height="15" className="hat-band" rx="5" />

      {/* Text */}
      <text x="50" y="110" className="cook-text">Cook</text>
      <text x="48" y="160" className="it-up-text">It</text>
      <text x="122" y="160" className="it-up-text">p</text>
      
      {/* "U" as a smile and utensil */}
      <path d="M85,120 C85,160 115,160 115,120" stroke="#FDF1D8" strokeWidth="15" fill="none" />
       <path d="M92 145 A 8 8 0 0 1 108 145" className="smile" />

    </svg>
  )
}
