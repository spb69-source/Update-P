import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginWithEmailSchema, type LoginWithEmail } from "@shared/schema";
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
import { Eye, EyeOff } from "lucide-react";

export function EmailLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const form = useForm<LoginWithEmail>({
    resolver: zodResolver(loginWithEmailSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginWithEmail) => {
      return await apiRequest("POST", "/api/auth/login/email", data);
    },
    onSuccess: (data) => {
      toast({
        title: "Login successful!",
        description: `Welcome back, ${data.user.username || data.user.email}!`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Login failed",
        description: error.message || "Invalid email or password",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LoginWithEmail) => {
    loginMutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium" data-testid="label-email">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Email address"
                  type="email"
                  className="h-12"
                  data-testid="input-email-address"
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
              <FormLabel className="text-sm font-medium" data-testid="label-email-password">Password</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    className="h-12 pr-10"
                    data-testid="input-email-password"
                    {...field}
                  />
                </FormControl>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="button-toggle-email-password"
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

        <div className="flex items-center justify-between text-sm">
          <a
            href="/forgot-password"
            className="text-muted-foreground hover:text-foreground transition-colors"
            data-testid="link-email-forgot-password"
          >
            Forgot password?
          </a>
          <a
            href="/send-code"
            className="text-primary hover:underline font-medium"
            data-testid="link-email-send-code"
          >
            Log in with code
          </a>
        </div>

        <Button
          type="submit"
          className="w-full h-12 text-base font-semibold"
          data-testid="button-email-login"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? "Logging in..." : "Log in"}
        </Button>
      </form>
    </Form>
  );
}
