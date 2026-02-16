"use client";

import { Stack } from "@mui/material";
import { useState } from "react";
import { register } from "@/_actions/auth";
import { useRouter } from "next/navigation";
import { RegistrationFormStep } from "./registration-form-step";
import {
  PersonalInformation,
  PersonalInformationForm,
} from "./personal-information-form";
import {
  HealthInfoDisclaimerData,
  HealthInfoDisclaimerForm,
} from "./health-info-disclaimer-form";
import { MembershipForm, MembershipSelection } from "./membership-form";
import healthConditions from "@/assets/health-conditions.json";
import { PasswordForm, PasswordFormData } from "./password-form";
import { ReviewForm } from "./review-form";

export const RegistrationForm = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [piiData, setPiiData] = useState<PersonalInformation | null>(null);
  const [healthInfoData, setHealthInfoData] =
    useState<HealthInfoDisclaimerData | null>(null);
  const [membershipData, setMembershipData] =
    useState<MembershipSelection | null>(null);
  const [passwordData, setPasswordData] = useState<PasswordFormData | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handlePIISubmit = (piiData: PersonalInformation) => {
    setPiiData(piiData);
    setCurrentStep(1);

    // todo: submit the data to the server or store it in a global state for later steps
  };

  const handleHealthInfoSubmit = (data: HealthInfoDisclaimerData) => {
    setHealthInfoData(data);
    setCurrentStep(2);

    // todo: submit the data to the server or store it in a global state for later steps
  };

  const handleMembershipSubmit = (data: MembershipSelection) => {
    setMembershipData(data);
    setCurrentStep(3);

    // todo: submit the data to the server or store it in a global state for later steps
  };

  const requiresMedicalClearance = (
    healthInfoData?.selectedConditionIds ?? []
  ).some((id) =>
    healthConditions.some(
      (condition) => condition.id === id && condition.requiresMedicalClearance,
    ),
  );

  const handlePasswordSubmit = async (data: PasswordFormData) => {
    setPasswordData(data);
    if (!piiData || !membershipData) {
      setSubmitError(
        "Missing required information. Please review your details.",
      );
      return;
    }

    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const { token } = await register({
        firstName: piiData.firstName,
        lastName: piiData.lastName,
        email: piiData.email,
        membershipId: membershipData.membershipId,
      });
      localStorage.setItem("auth_token", token);
      router.replace("/confirmation");
    } catch (err: unknown) {
      setSubmitError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Stack spacing={{ xs: 2, sm: 3 }} sx={{ pb: { xs: 3, sm: 4 } }}>
      <RegistrationFormStep currentStep={currentStep} />

      {currentStep === 0 && (
        <PersonalInformationForm onSubmit={handlePIISubmit} />
      )}

      {currentStep === 1 && (
        <HealthInfoDisclaimerForm
          onSubmit={handleHealthInfoSubmit}
          onBack={() => setCurrentStep(0)}
        />
      )}

      {currentStep === 2 && (
        <MembershipForm
          requiresMedicalClearance={requiresMedicalClearance}
          onSubmit={handleMembershipSubmit}
          onBack={() => setCurrentStep(1)}
        />
      )}

      {currentStep === 3 && (
        <ReviewForm
          personalInfo={piiData}
          healthInfo={healthInfoData}
          membership={membershipData}
          onBack={() => setCurrentStep(2)}
          onConfirm={() => setCurrentStep(4)}
        />
      )}

      {currentStep === 4 && (
        <PasswordForm
          onSubmit={handlePasswordSubmit}
          onBack={() => setCurrentStep(3)}
          isLoading={isSubmitting}
          error={submitError ?? undefined}
        />
      )}
    </Stack>
  );
};
