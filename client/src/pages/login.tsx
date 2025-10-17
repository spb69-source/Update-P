import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, Mail, Smartphone, X } from "lucide-react";
import { UnifiedLoginForm } from "@/components/login/unified-login-form";
import { TikTokLogo } from "@/components/tiktok-logo";

type LoginMethod = "select" | "phone" | "email" | "username";

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
            Log in to TikTok
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
                onClick={() => setMethod("phone")}
                data-testid="button-select-phone-email-username"
              >
                <Smartphone className="w-5 h-5" />
                Use phone / email / username
              </Button>
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

              <UnifiedLoginForm method="phone" />
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

              <UnifiedLoginForm method="email" />
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

              <UnifiedLoginForm method="username" />
            </div>
          )}

        </div>

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
