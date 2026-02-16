import { Step, StepLabel, Stepper } from "@mui/material";
import React from "react";

export enum RegistrationStep {
  PersonalInfo = "personal-info",
  HealthInfo = "health-info",
  Membership = "membership",
  Password = "password",
  Review = "review",
}

export const RegistrationStepLabels = {
  [RegistrationStep.PersonalInfo]: "Personal Info",
  [RegistrationStep.HealthInfo]: "Health Info",
  [RegistrationStep.Membership]: "Membership",
  [RegistrationStep.Password]: "Password",
  [RegistrationStep.Review]: "Review",
};

const steps = Object.values(RegistrationStepLabels);

type RegistrationFormStepProps = {
  currentStep: number;
};

export const RegistrationFormStep = ({
  currentStep,
}: RegistrationFormStepProps) => {
  return (
    <Stepper activeStep={currentStep} alternativeLabel component="ol">
      {steps.map((label) => (
        <Step key={label} component="li">
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};
