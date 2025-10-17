import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SiGoogle, SiFacebook, SiApple, SiTwitter } from "react-icons/si";
import { User, Mail, Smartphone, QrCode, X } from "lucide-react";
import { PhoneLoginForm } from "@/components/login/phone-login-form";
import { EmailLoginForm } from "@/components/login/email-login-form";
import { UsernameLoginForm } from "@/components/login/username-login-form";
import { QRCodeLogin } from "@/components/login/qr-code-login";
import { TikTokLogo } from "@/components/tiktok-logo";

type LoginMethod = "select" | "phone" | "email" | "username" | "qr";

export default function LoginPage() {
  const [method, setMethod] = useState<LoginMethod>("select");

  const handleBack = () => {
    setMethod("select");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-[380px] space-y-6">
        <div className="text-center space-y-3">
          <TikTokLogo className="mx-auto" />
          <h1 className="text-3xl font-bold text-foreground" data-testid="heading-login">
            {method === "qr" ? "Log in with QR code" : "Log in to TikTok"}
          </h1>
          {method === "select" && (
            <p className="text-sm text-muted-foreground" data-testid="text-description">
              Manage your account, check notifications, comment on videos, and more.
            </p>
          )}
        </div>

        <div className="space-y-4">
          {method === "select" && (
            <>
              <Button
                variant="outline"
                className="w-full h-12 justify-start gap-3 text-base font-medium hover-elevate active-elevate-2"
                onClick={() => setMethod("qr")}
                data-testid="button-qr-login"
              >
                <QrCode className="w-5 h-5" />
                Use QR code
              </Button>

              <Button
                variant="outline"
                className="w-full h-12 justify-start gap-3 text-base font-medium hover-elevate active-elevate-2"
                onClick={() => setMethod("phone")}
                data-testid="button-select-phone-email-username"
              >
                <Smartphone className="w-5 h-5" />
                Use phone / email / username
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground" data-testid="text-or-continue-with">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="h-12 gap-2 hover-elevate active-elevate-2"
                  data-testid="button-google-login"
                >
                  <SiGoogle className="w-5 h-5" />
                  <span className="text-sm font-medium">Google</span>
                </Button>

                <Button
                  variant="outline"
                  className="h-12 gap-2 hover-elevate active-elevate-2"
                  data-testid="button-facebook-login"
                >
                  <SiFacebook className="w-5 h-5 text-[#1877F2]" />
                  <span className="text-sm font-medium">Facebook</span>
                </Button>

                <Button
                  variant="outline"
                  className="h-12 gap-2 hover-elevate active-elevate-2"
                  data-testid="button-apple-login"
                >
                  <SiApple className="w-5 h-5" />
                  <span className="text-sm font-medium">Apple</span>
                </Button>

                <Button
                  variant="outline"
                  className="h-12 gap-2 hover-elevate active-elevate-2"
                  data-testid="button-twitter-login"
                >
                  <SiTwitter className="w-5 h-5 text-[#1DA1F2]" />
                  <span className="text-sm font-medium">Twitter</span>
                </Button>
              </div>
            </>
          )}

          {method === "phone" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBack}
                  data-testid="button-back-phone"
                  className="hover-elevate active-elevate-2"
                >
                  <X className="w-5 h-5" />
                </Button>
                <h2 className="text-xl font-semibold" data-testid="heading-login-phone">Log in</h2>
              </div>

              <div className="flex gap-2 p-1 bg-muted rounded-md">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 data-[active=true]:bg-background hover-elevate active-elevate-2"
                  data-active={method === "phone"}
                  onClick={() => setMethod("phone")}
                  data-testid="tab-phone-from-phone"
                >
                  <Smartphone className="w-4 h-4 mr-2" />
                  Phone
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 data-[active=true]:bg-background hover-elevate active-elevate-2"
                  data-active={false}
                  onClick={() => setMethod("email")}
                  data-testid="tab-email-from-phone"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 data-[active=true]:bg-background hover-elevate active-elevate-2"
                  data-active={false}
                  onClick={() => setMethod("username")}
                  data-testid="tab-username-from-phone"
                >
                  <User className="w-4 h-4 mr-2" />
                  Username
                </Button>
              </div>

              <PhoneLoginForm />
            </div>
          )}

          {method === "email" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBack}
                  data-testid="button-back-email"
                  className="hover-elevate active-elevate-2"
                >
                  <X className="w-5 h-5" />
                </Button>
                <h2 className="text-xl font-semibold" data-testid="heading-login-email">Log in</h2>
              </div>

              <div className="flex gap-2 p-1 bg-muted rounded-md">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 data-[active=true]:bg-background hover-elevate active-elevate-2"
                  data-active={false}
                  onClick={() => setMethod("phone")}
                  data-testid="tab-phone-from-email"
                >
                  <Smartphone className="w-4 h-4 mr-2" />
                  Phone
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 data-[active=true]:bg-background hover-elevate active-elevate-2"
                  data-active={method === "email"}
                  onClick={() => setMethod("email")}
                  data-testid="tab-email-from-email"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 data-[active=true]:bg-background hover-elevate active-elevate-2"
                  data-active={false}
                  onClick={() => setMethod("username")}
                  data-testid="tab-username-from-email"
                >
                  <User className="w-4 h-4 mr-2" />
                  Username
                </Button>
              </div>

              <EmailLoginForm />
            </div>
          )}

          {method === "username" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBack}
                  data-testid="button-back-username"
                  className="hover-elevate active-elevate-2"
                >
                  <X className="w-5 h-5" />
                </Button>
                <h2 className="text-xl font-semibold" data-testid="heading-login-username">Log in</h2>
              </div>

              <div className="flex gap-2 p-1 bg-muted rounded-md">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 data-[active=true]:bg-background hover-elevate active-elevate-2"
                  data-active={false}
                  onClick={() => setMethod("phone")}
                  data-testid="tab-phone-from-username"
                >
                  <Smartphone className="w-4 h-4 mr-2" />
                  Phone
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 data-[active=true]:bg-background hover-elevate active-elevate-2"
                  data-active={false}
                  onClick={() => setMethod("email")}
                  data-testid="tab-email-from-username"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 data-[active=true]:bg-background hover-elevate active-elevate-2"
                  data-active={method === "username"}
                  onClick={() => setMethod("username")}
                  data-testid="tab-username-from-username"
                >
                  <User className="w-4 h-4 mr-2" />
                  Username
                </Button>
              </div>

              <UsernameLoginForm />
            </div>
          )}

          {method === "qr" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBack}
                  data-testid="button-back-qr"
                  className="hover-elevate active-elevate-2"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <QRCodeLogin />
            </div>
          )}
        </div>

        {method === "select" && (
          <div className="text-center text-sm space-y-2">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <a href="/signup" className="text-primary font-medium hover:underline" data-testid="link-signup">
                Sign up
              </a>
            </p>
          </div>
        )}

        <div className="text-center text-xs text-muted-foreground space-y-2 pt-4 border-t border-border">
          <p data-testid="text-login-terms-notice">
            By continuing, you agree to TikTok's{" "}
            <a href="/terms" className="hover:underline" data-testid="link-login-terms">
              Terms of Service
            </a>{" "}
            and confirm that you have read TikTok's{" "}
            <a href="/privacy" className="hover:underline" data-testid="link-login-privacy">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
