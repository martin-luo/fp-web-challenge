import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PasswordForm } from "../password-form";

describe("PasswordForm", () => {
  it("disables continue until passwords match", async () => {
    const user = userEvent.setup();
    render(<PasswordForm onSubmit={jest.fn()} onBack={jest.fn()} />);

    const continueButton = screen.getByRole("button", { name: /continue/i });
    expect(continueButton).toBeDisabled();

    await user.type(screen.getByLabelText(/password$/i), "Secret123!");
    await user.type(screen.getByLabelText(/confirm password/i), "Secret123!");

    expect(continueButton).toBeEnabled();
  });

  it("submits when passwords match", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    render(<PasswordForm onSubmit={onSubmit} onBack={jest.fn()} />);

    await user.type(screen.getByLabelText(/password$/i), "Secret123!");
    await user.type(screen.getByLabelText(/confirm password/i), "Secret123!");
    await user.click(screen.getByRole("button", { name: /continue/i }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      password: "Secret123!",
    });
  });

  it("calls onBack when back button is clicked", async () => {
    const user = userEvent.setup();
    const onBack = jest.fn();
    render(<PasswordForm onSubmit={jest.fn()} onBack={onBack} />);

    await user.click(screen.getByRole("button", { name: /back/i }));
    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
