import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MembershipForm } from "../membership-form";

describe("MembershipForm", () => {
  it("disables continue until a membership is selected", () => {
    render(
      <MembershipForm
        selectedConditionIds={[]}
        onSubmit={jest.fn()}
        onBack={jest.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: /continue/i })).toBeDisabled();
  });

  it("submits the selected membership", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();

    render(
      <MembershipForm
        selectedConditionIds={[]}
        onSubmit={onSubmit}
        onBack={jest.fn()}
      />,
    );

    await user.click(screen.getByRole("combobox"));
    await user.click(await screen.findByText("Basic Membership"));
    await user.keyboard("{Escape}");

    await user.click(screen.getByRole("button", { name: /continue/i }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({ membershipId: "basic" });
  });

  it("blocks 24/7 membership when medical clearance is required", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();

    render(
      <MembershipForm
        selectedConditionIds={["heart-disease"]}
        onSubmit={onSubmit}
        onBack={jest.fn()}
      />,
    );

    await user.click(screen.getByRole("combobox"));
    await user.click(await screen.findByText("Premium Membership"));
    await user.keyboard("{Escape}");

    expect(screen.getByRole("button", { name: /continue/i })).toBeDisabled();
    expect(onSubmit).not.toHaveBeenCalled();
    expect(
      await screen.findByText(/24\/7 memberships require medical clearance/i),
    ).toBeInTheDocument();
  });

  it("calls onBack when back button is clicked", async () => {
    const user = userEvent.setup();
    const onBack = jest.fn();

    render(
      <MembershipForm
        selectedConditionIds={[]}
        onSubmit={jest.fn()}
        onBack={onBack}
      />,
    );

    await user.click(screen.getByRole("button", { name: /back/i }));
    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
