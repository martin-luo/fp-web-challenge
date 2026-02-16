import { Step, StepLabel, Stepper } from "@mui/material";
import React from "react";

export enum RegistrationStep {
  PersonalInfo = "personal-info",
  HealthInfo = "health-info",
  Membership = "membership",
  Review = "review",
  Password = "password",
}

export const RegistrationStepLabels = {
  [RegistrationStep.PersonalInfo]: "Personal Info",
  [RegistrationStep.HealthInfo]: "Health Info",
  [RegistrationStep.Membership]: "Membership",
  [RegistrationStep.Review]: "Review",
  [RegistrationStep.Password]: "Password",
};

export const steps = Object.values(RegistrationStepLabels);

type RegistrationFormStepProps = {
  currentStep: number;
};

export const RegistrationFormStep = ({
  currentStep,
}: RegistrationFormStepProps) => {
  return (
    <Stepper
      activeStep={currentStep}
      alternativeLabel
      component="ol"
      sx={{
        px: { xs: 1, sm: 2, md: 3 },
        py: { xs: 2, sm: 3 },
        "& .MuiStepLabel-label": {
          fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
        },
      }}
    >
      {steps.map((label) => (
        <Step key={label} component="li">
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};
