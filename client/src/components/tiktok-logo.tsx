import { cn } from "@/lib/utils";
import logoImage from "@assets/stock_images/tiktok_logo_official_9b0030a0.jpg";

interface TikTokLogoProps {
  className?: string;
}

export function TikTokLogo({ className }: TikTokLogoProps) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <img 
        src={logoImage} 
        alt="TikTok" 
        className="h-10 w-auto object-contain"
        data-testid="img-tiktok-logo"
      />
    </div>
  );
}
