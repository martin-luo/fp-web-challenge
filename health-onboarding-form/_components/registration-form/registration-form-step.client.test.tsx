import { render } from "@testing-library/react";
import { RegistrationFormStep } from "./registration-form-step";

describe("RegistrationFormStep", () => {
  it("renders the correct number of steps", () => {
    const { getAllByRole } = render(<RegistrationFormStep currentStep={0} />);
    const steps = getAllByRole("listitem");
    expect(steps).toHaveLength(5);
  });
});
