import { cn } from "@/lib/utils";
import logoImage from "@assets/download__2_-removebg-preview_1760797820738.png";

interface TikTokLogoProps {
  className?: string;
}

export function TikTokLogo({ className }: TikTokLogoProps) {
  return (
    <a 
      href="https://www.tiktok.com" 
      className={cn("flex items-center justify-center cursor-pointer transition-transform hover:scale-105", className)}
      data-testid="link-tiktok-logo"
    >
      <img 
        src={logoImage} 
        alt="TikTok" 
        className="w-20 h-20 drop-shadow-lg"
        data-testid="img-tiktok-logo"
      />
    </a>
  );
}
