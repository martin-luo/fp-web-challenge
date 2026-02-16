"use client";

import { Stack } from "@mui/material";
import { useState } from "react";
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

export const RegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [piiData, setPiiData] = useState<PersonalInformation | null>(null);
  const [healthInfoData, setHealthInfoData] =
    useState<HealthInfoDisclaimerData | null>(null);
  const [membershipData, setMembershipData] =
    useState<MembershipSelection | null>(null);
  const [passwordData, setPasswordData] = useState<PasswordFormData | null>(
    null,
  );

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

  const handlePasswordSubmit = (data: PasswordFormData) => {
    setPasswordData(data);
    setCurrentStep(4);

    // todo: submit the data to the server or store it in a global state for later steps
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
        <PasswordForm
          onSubmit={handlePasswordSubmit}
          onBack={() => setCurrentStep(2)}
        />
      )}
    </Stack>
  );
};
