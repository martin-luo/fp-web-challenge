import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HealthInfoDisclaimerForm } from "../health-info-disclaimer-form";

describe("HealthInfoDisclaimerForm", () => {
  it("disables continue until a condition is selected", async () => {
    const user = userEvent.setup();
    render(
      <HealthInfoDisclaimerForm onSubmit={jest.fn()} onBack={jest.fn()} />,
    );

    const continueButton = screen.getByRole("button", { name: /continue/i });
    expect(continueButton).toBeDisabled();

    await user.click(screen.getByRole("combobox"));

    const option = await screen.findByText("Asthma");
    await user.click(option);
    await user.keyboard("{Escape}");

    expect(continueButton).toBeEnabled();
  });

  it("submits selected conditions when a dropdown option is chosen", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    render(<HealthInfoDisclaimerForm onSubmit={onSubmit} onBack={jest.fn()} />);

    await user.click(screen.getByRole("combobox"));

    const option = await screen.findByText("Asthma");
    await user.click(option);
    await user.keyboard("{Escape}");

    await user.click(screen.getByRole("button", { name: /continue/i }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      selectedConditionIds: ["asthma"],
    });
  });

  it("calls onBack when back button is clicked", async () => {
    const user = userEvent.setup();
    const onBack = jest.fn();
    render(<HealthInfoDisclaimerForm onSubmit={jest.fn()} onBack={onBack} />);

    await user.click(screen.getByRole("button", { name: /back/i }));
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it("does not submit when no selections are made (edge case)", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    render(<HealthInfoDisclaimerForm onSubmit={onSubmit} onBack={jest.fn()} />);

    await user.click(screen.getByRole("button", { name: /continue/i }));
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
