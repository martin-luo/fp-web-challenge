import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PersonalInformationForm } from "./personal-information-form";

describe("PersonalInformationForm", () => {
  it("renders all inputs and a single submit button", () => {
    render(<PersonalInformationForm onSubmit={jest.fn()} />);

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mobile/i)).toBeInTheDocument();

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(1);
    expect(buttons[0]).toHaveAttribute("type", "submit");
  });

  it("passes form data to onSubmit when submitted", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();

    render(<PersonalInformationForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/first name/i), "Jamie");
    await user.type(screen.getByLabelText(/last name/i), "Lee");
    await user.type(screen.getByLabelText(/email/i), "jamie.lee@example.com");
    await user.type(screen.getByLabelText(/mobile/i), "5551234567");

    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      firstName: "Jamie",
      lastName: "Lee",
      email: "jamie.lee@example.com",
      mobile: "5551234567",
    });
  });

  it("does not pass form data to onSubmit when no data is entered and submit button is clicked", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();

    render(<PersonalInformationForm onSubmit={onSubmit} />);

    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(onSubmit).toHaveBeenCalledTimes(0);
  });
});
