import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginWithPhoneSchema, type LoginWithPhone } from "@shared/schema";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, EyeOff } from "lucide-react";

const countryCodes = [
  { code: "+1", country: "US" },
  { code: "+44", country: "UK" },
  { code: "+234", country: "NG" },
  { code: "+91", country: "IN" },
  { code: "+86", country: "CN" },
];

export function PhoneLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [countryCode, setCountryCode] = useState("+1");
  const { toast } = useToast();

  const form = useForm<LoginWithPhone>({
    resolver: zodResolver(loginWithPhoneSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginWithPhone) => {
      const phoneWithCode = `${countryCode}${data.phone}`;
      return await apiRequest("POST", "/api/auth/login/phone", {
        phone: phoneWithCode,
        password: data.password,
      });
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
        description: error.message || "Invalid phone number or password",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LoginWithPhone) => {
    loginMutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium" data-testid="label-phone-number">Phone number</FormLabel>
              <div className="flex gap-2">
                <Select value={countryCode} onValueChange={setCountryCode}>
                  <SelectTrigger className="w-24 h-12" data-testid="select-country-code">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {countryCodes.map((country) => (
                      <SelectItem 
                        key={country.code} 
                        value={country.code}
                        data-testid={`option-country-${country.country.toLowerCase()}`}
                      >
                        {country.country} {country.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormControl>
                  <Input
                    placeholder="Phone number"
                    type="tel"
                    className="h-12"
                    data-testid="input-phone-number"
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium" data-testid="label-phone-password">Password</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    className="h-12 pr-10"
                    data-testid="input-phone-password"
                    {...field}
                  />
                </FormControl>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="button-toggle-phone-password"
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
            data-testid="link-phone-forgot-password"
          >
            Forgot password?
          </a>
          <a
            href="/send-code"
            className="text-primary hover:underline font-medium"
            data-testid="link-phone-send-code"
          >
            Log in with code
          </a>
        </div>

        <Button
          type="submit"
          className="w-full h-12 text-base font-semibold"
          data-testid="button-phone-login"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? "Logging in..." : "Log in"}
        </Button>
      </form>
    </Form>
  );
}
