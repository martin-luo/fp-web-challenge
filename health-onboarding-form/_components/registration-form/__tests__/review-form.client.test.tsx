import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { register } from "@/_actions/auth";
import { ReviewForm } from "../review-form";

jest.mock("@/_actions/auth", () => ({
  register: jest.fn(),
}));

const mockRegister = register as jest.Mock;

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

  beforeEach(() => {
    mockRegister.mockReset();
  });

  it("renders review data", () => {
    render(<ReviewForm {...baseProps} onBack={jest.fn()} />);

    expect(screen.getByText("Jamie Lee")).toBeInTheDocument();
    expect(screen.getByText("jamie.lee@example.com")).toBeInTheDocument();
    expect(screen.getByText("5551234567")).toBeInTheDocument();
    expect(screen.getByText("Asthma")).toBeInTheDocument();
    expect(screen.getByText("Basic Membership")).toBeInTheDocument();
    expect(screen.getByText(/\$29\.99/)).toBeInTheDocument();
  });

  it("calls onBack when back button is clicked", async () => {
    const user = userEvent.setup();
    const onBack = jest.fn();
    render(<ReviewForm {...baseProps} onBack={onBack} />);

    await user.click(screen.getByRole("button", { name: /back/i }));
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it("submits registration and stores token", async () => {
    const user = userEvent.setup();
    mockRegister.mockResolvedValueOnce({ token: "mock-token", user: {} });
    const setItemSpy = jest.spyOn(Storage.prototype, "setItem");

    render(<ReviewForm {...baseProps} onBack={jest.fn()} />);

    await user.click(screen.getByRole("button", { name: /confirm & submit/i }));

    expect(register).toHaveBeenCalledWith({
      firstName: "Jamie",
      lastName: "Lee",
      email: "jamie.lee@example.com",
      membershipId: "basic",
    });
    expect(setItemSpy).toHaveBeenCalledWith("auth_token", "mock-token");
  });

  it("shows an error when required info is missing", async () => {
    const user = userEvent.setup();
    render(
      <ReviewForm
        personalInfo={null}
        healthInfo={baseProps.healthInfo}
        membership={baseProps.membership}
        onBack={jest.fn()}
      />,
    );

    await user.click(screen.getByRole("button", { name: /confirm & submit/i }));
    expect(
      screen.getByText(/missing required information/i),
    ).toBeInTheDocument();
    expect(register).not.toHaveBeenCalled();
  });
});
