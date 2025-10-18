import { cn } from "@/lib/utils";

interface TikTokLoadingProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function TikTokLoading({ className, size = "md" }: TikTokLoadingProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <div className={cn("flex items-center justify-center", className)} data-testid="loading-animation">
      <div className={cn("relative", sizeClasses[size])}>
        <svg 
          viewBox="0 0 48 48" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="animate-spin"
        >
          <defs>
            <filter id="glow-loading">
              <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <path 
            d="M34.3 8.7c0-.4.3-.7.7-.7s.7.3.7.7c0 2.6 1 5 2.8 6.8 1.8 1.8 4.2 2.8 6.8 2.8.4 0 .7.3.7.7s-.3.7-.7.7c-3 0-5.7-1.2-7.7-3.1v11.9c0 6.3-5.1 11.4-11.4 11.4S14.8 34.8 14.8 28.5s5.1-11.4 11.4-11.4c.4 0 .7.3.7.7s-.3.7-.7.7c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10V8.7h7.1z" 
            fill="#25F4EE"
            strokeWidth="0.5"
            stroke="#25F4EE"
            filter="url(#glow-loading)"
            opacity="0.8"
          />
          
          <path 
            d="M34.3 8.7c0-.4.3-.7.7-.7s.7.3.7.7c0 2.6 1 5 2.8 6.8 1.8 1.8 4.2 2.8 6.8 2.8.4 0 .7.3.7.7s-.3.7-.7.7c-3 0-5.7-1.2-7.7-3.1v11.9c0 6.3-5.1 11.4-11.4 11.4S14.8 34.8 14.8 28.5s5.1-11.4 11.4-11.4c.4 0 .7.3.7.7s-.3.7-.7.7c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10V8.7h7.1z" 
            fill="#FE2C55" 
            transform="translate(-2, 2)"
            strokeWidth="0.5"
            stroke="#FE2C55"
            filter="url(#glow-loading)"
            opacity="0.8"
          />
          
          <path 
            d="M34.3 8.7c0-.4.3-.7.7-.7s.7.3.7.7c0 2.6 1 5 2.8 6.8 1.8 1.8 4.2 2.8 6.8 2.8.4 0 .7.3.7.7s-.3.7-.7.7c-3 0-5.7-1.2-7.7-3.1v11.9c0 6.3-5.1 11.4-11.4 11.4S14.8 34.8 14.8 28.5s5.1-11.4 11.4-11.4c.4 0 .7.3.7.7s-.3.7-.7.7c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10V8.7h7.1z" 
            fill="#FFF"
            strokeWidth="0.8"
            stroke="#FFF"
          />
        </svg>
      </div>
    </div>
  );
}
