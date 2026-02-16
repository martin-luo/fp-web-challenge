"use client";

import React from "react";
import { RegistrationFormStep } from "./registration-form-step";
import {
  PersonalInformation,
  PersonalInformationForm,
} from "./personal-information-form";

export const RegistrationForm = () => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [piiData, setPiiData] = React.useState<PersonalInformation | null>(
    null,
  );

  const handlePIISubmit = (piiData: PersonalInformation) => {
    setPiiData(piiData);
    setCurrentStep(1);

    // todo: submit the data to the server or store it in a global state for later steps
  };

  return (
    <>
      <RegistrationFormStep currentStep={currentStep} />

      {currentStep === 0 && (
        <PersonalInformationForm onSubmit={handlePIISubmit} />
      )}
    </>
  );
};
