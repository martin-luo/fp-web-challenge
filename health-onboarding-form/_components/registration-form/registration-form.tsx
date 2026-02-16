"use client";

import { Link, Stack } from "@mui/material";
import { useState } from "react";
import { register } from "@/_actions/auth";
import { useRouter } from "next/navigation";
import {
  RegistrationFormStep,
  RegistrationStep,
  steps,
} from "./registration-form-step";
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
  const [currentStep, setCurrentStep] = useState<RegistrationStep>(
    RegistrationStep.PersonalInfo,
  );
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
    setCurrentStep(RegistrationStep.HealthInfo);

    // todo: submit the data to the server or store it in a global state for later steps
  };

  const handleHealthInfoSubmit = (data: HealthInfoDisclaimerData) => {
    setHealthInfoData(data);
    setCurrentStep(RegistrationStep.Membership);

    // todo: submit the data to the server or store it in a global state for later steps
  };

  const handleMembershipSubmit = (data: MembershipSelection) => {
    setMembershipData(data);
    setCurrentStep(RegistrationStep.Review);

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
        password: data.password,
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
    <Stack
      spacing={{ xs: 2, sm: 3 }}
      sx={{ pb: { xs: 3, sm: 4 }, mx: "auto", maxWidth: 720 }}
    >
      <Link
        href="/"
        underline="none"
        sx={{
          px: { xs: 1, sm: 2, md: 3 },
          py: { xs: 2, sm: 3 },
          alignSelf: "flex-start",
          display: "inline-flex",
          alignItems: "center",
          gap: 1,
          fontWeight: 600,
          color: "text.secondary",
          "&:hover": { color: "text.primary" },
        }}
      >
        <span aria-hidden="true">←</span>
        Back to landing page
      </Link>
      <RegistrationFormStep currentStep={steps.indexOf(currentStep)} />

      {currentStep === RegistrationStep.PersonalInfo && (
        <PersonalInformationForm
          onSubmit={handlePIISubmit}
          initialValues={piiData ?? undefined}
        />
      )}

      {currentStep === RegistrationStep.HealthInfo && (
        <HealthInfoDisclaimerForm
          onSubmit={handleHealthInfoSubmit}
          onBack={() => setCurrentStep(RegistrationStep.PersonalInfo)}
          initialSelectedConditionIds={
            healthInfoData?.selectedConditionIds ?? undefined
          }
        />
      )}

      {currentStep === RegistrationStep.Membership && (
        <MembershipForm
          requiresMedicalClearance={requiresMedicalClearance}
          onSubmit={handleMembershipSubmit}
          onBack={() => setCurrentStep(RegistrationStep.HealthInfo)}
          initialMembershipId={membershipData?.membershipId ?? undefined}
        />
      )}

      {currentStep === RegistrationStep.Review && (
        <ReviewForm
          personalInfo={piiData}
          healthInfo={healthInfoData}
          membership={membershipData}
          onBack={() => setCurrentStep(RegistrationStep.Membership)}
          onConfirm={() => setCurrentStep(RegistrationStep.Password)}
        />
      )}

      {currentStep === RegistrationStep.Password && (
        <PasswordForm
          onSubmit={handlePasswordSubmit}
          onBack={() => setCurrentStep(RegistrationStep.Review)}
          isLoading={isSubmitting}
          error={submitError ?? undefined}
        />
      )}
    </Stack>
  );
};
