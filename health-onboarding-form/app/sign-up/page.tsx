import { RegistrationForm } from "@/_components/registration-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description:
    "Join Fitness Passport with a quick, guided onboarding to choose your membership and get started.",
};

export default function SignUpPage() {
  return <RegistrationForm />;
}
