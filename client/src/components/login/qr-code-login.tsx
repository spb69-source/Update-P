import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Card } from "@/components/ui/card";
import { Smartphone } from "lucide-react";

export function QRCodeLogin() {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const loginUrl = `${window.location.origin}/qr-auth/${Date.now()}`;
        const url = await QRCode.toDataURL(loginUrl, {
          width: 200,
          margin: 1,
          color: {
            dark: "#000000",
            light: "#FFFFFF",
          },
        });
        setQrCodeUrl(url);
      } catch (err) {
        console.error("Error generating QR code:", err);
      }
    };

    generateQRCode();
  }, []);

  return (
    <div className="space-y-6">
      <Card className="p-8 flex items-center justify-center bg-card border-card-border">
        {qrCodeUrl ? (
          <img
            src={qrCodeUrl}
            alt="Login QR Code"
            className="w-[200px] h-[200px]"
            data-testid="img-qr-code"
          />
        ) : (
          <div className="w-[200px] h-[200px] bg-muted animate-pulse rounded-md" />
        )}
      </Card>

      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <div className="mt-1 p-2 rounded-full bg-primary/10">
            <Smartphone className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 space-y-1">
            <h3 className="font-semibold text-sm" data-testid="heading-step-1">1. Open TikTok on your mobile device</h3>
            <p className="text-sm text-muted-foreground" data-testid="text-step-1">
              Launch the TikTok app on your phone
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="mt-1 p-2 rounded-full bg-primary/10">
            <svg
              className="w-5 h-5 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
              />
            </svg>
          </div>
          <div className="flex-1 space-y-1">
            <h3 className="font-semibold text-sm" data-testid="heading-step-2">2. Tap the QR code icon</h3>
            <p className="text-sm text-muted-foreground" data-testid="text-step-2">
              Find the QR scanner in your profile settings
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="mt-1 p-2 rounded-full bg-primary/10">
            <svg
              className="w-5 h-5 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="flex-1 space-y-1">
            <h3 className="font-semibold text-sm" data-testid="heading-step-3">3. Scan this code to log in</h3>
            <p className="text-sm text-muted-foreground" data-testid="text-step-3">
              Point your camera at the QR code above
            </p>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-border">
        <p className="text-xs text-center text-muted-foreground" data-testid="text-qr-note">
          Make sure you're using the latest version of the TikTok app
        </p>
      </div>
    </div>
  );
}
