import { cn } from "@/lib/utils";

interface TikTokLoadingProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function TikTokLoading({ className, size = "md" }: TikTokLoadingProps) {
  const sizeConfig = {
    sm: { container: "w-12 h-8", circle: "w-2.5 h-2.5" },
    md: { container: "w-16 h-10", circle: "w-3.5 h-3.5" },
    lg: { container: "w-20 h-12", circle: "w-4 h-4" },
  };

  const config = sizeConfig[size];

  return (
    <div 
      className={cn("flex items-center justify-center", className)} 
      data-testid="loading-animation"
    >
      <div className={cn("relative flex items-center justify-center gap-1", config.container)}>
        <div 
          className={cn(
            "rounded-full bg-[#25F4EE] absolute animate-tiktok-left",
            config.circle
          )}
          style={{
            boxShadow: "0 0 8px rgba(37, 244, 238, 0.6)"
          }}
        />
        <div 
          className={cn(
            "rounded-full bg-[#FE2C55] absolute animate-tiktok-right",
            config.circle
          )}
          style={{
            boxShadow: "0 0 8px rgba(254, 44, 85, 0.6)"
          }}
        />
      </div>
    </div>
  );
}
