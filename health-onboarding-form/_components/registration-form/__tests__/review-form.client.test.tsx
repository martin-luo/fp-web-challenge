import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReviewForm } from "../review-form";

describe("ReviewForm", () => {
  const baseProps = {
    personalInfo: {
      firstName: "Jamie",
      lastName: "Lee",
      email: "jamie.lee@example.com",
      mobile: "5551234567",
    },
    healthInfo: {
      selectedConditionIds: ["asthma"],
    },
    membership: {
      membershipId: "basic",
    },
  };

  it("renders review data", () => {
    render(
      <ReviewForm {...baseProps} onBack={jest.fn()} onConfirm={jest.fn()} />,
    );

    expect(screen.getByText("Jamie Lee")).toBeInTheDocument();
    expect(screen.getByText("jamie.lee@example.com")).toBeInTheDocument();
    expect(screen.getByText("5551234567")).toBeInTheDocument();
    expect(screen.getByText("Asthma")).toBeInTheDocument();
    expect(screen.getByText("Basic Membership")).toBeInTheDocument();
    expect(screen.getByText(/\$29\.99/)).toBeInTheDocument();
    expect(
      screen.getByText(/you will set your password in the next step/i),
    ).toBeInTheDocument();
  });

  it("calls onBack when back button is clicked", async () => {
    const user = userEvent.setup();
    const onBack = jest.fn();
    render(<ReviewForm {...baseProps} onBack={onBack} onConfirm={jest.fn()} />);

    await user.click(screen.getByRole("button", { name: /back/i }));
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it("calls onConfirm when continue is clicked", async () => {
    const user = userEvent.setup();
    const onConfirm = jest.fn();

    render(
      <ReviewForm {...baseProps} onBack={jest.fn()} onConfirm={onConfirm} />,
    );

    await user.click(screen.getByRole("button", { name: /continue/i }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("shows an error when required info is missing", async () => {
    const user = userEvent.setup();
    render(
      <ReviewForm
        personalInfo={null}
        healthInfo={baseProps.healthInfo}
        membership={baseProps.membership}
        onBack={jest.fn()}
        onConfirm={jest.fn()}
      />,
    );

    await user.click(screen.getByRole("button", { name: /continue/i }));
    expect(
      screen.getByText(/missing required information/i),
    ).toBeInTheDocument();
  });
});
