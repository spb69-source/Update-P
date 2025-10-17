import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUp } from "@shared/schema";
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
import { Eye, EyeOff, X } from "lucide-react";
import { TikTokLogo } from "@/components/tiktok-logo";
import { useLocation } from "wouter";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<SignUp>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const signupMutation = useMutation({
    mutationFn: async (data: SignUp) => {
      return await apiRequest("POST", "/api/auth/signup", data);
    },
    onSuccess: (data) => {
      toast({
        title: "Account created successfully!",
        description: `Welcome to TikTok, ${data.user.username}!`,
      });
      setTimeout(() => setLocation("/"), 1500);
    },
    onError: (error: any) => {
      toast({
        title: "Sign up failed",
        description: error.message || "Unable to create account",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: SignUp) => {
    signupMutation.mutate(data);
  };

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
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium" data-testid="label-signup-email">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email address"
                      type="email"
                      className="h-12"
                      data-testid="input-signup-email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium" data-testid="label-signup-username">Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Username"
                      type="text"
                      className="h-12"
                      data-testid="input-signup-username"
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
                  <FormLabel className="text-sm font-medium" data-testid="label-signup-password">Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        className="h-12 pr-10"
                        data-testid="input-signup-password"
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      data-testid="button-toggle-signup-password"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1" data-testid="text-password-hint">
                    Your password must be at least 8 characters
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold"
              data-testid="button-signup"
              disabled={signupMutation.isPending}
            >
              {signupMutation.isPending ? "Creating account..." : "Sign up"}
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm space-y-2">
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
