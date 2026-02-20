import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { register } from "@/_actions/auth";
import { RegistrationForm } from "../registration-form";

const replaceMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: replaceMock,
  }),
}));

jest.mock("@/_actions/auth", () => ({
  register: jest.fn(),
}));

describe("RegistrationForm (happy path)", () => {
  beforeEach(() => {
    replaceMock.mockReset();
    (register as jest.Mock).mockReset();
  });

  it("completes the full registration flow and redirects", async () => {
    const user = userEvent.setup();
    (register as jest.Mock).mockResolvedValueOnce({
      token: "mock-token",
      user: {},
    });

    render(<RegistrationForm />);

    await user.type(screen.getByLabelText(/first name/i), "Jamie");
    await user.type(screen.getByLabelText(/last name/i), "Lee");
    await user.type(screen.getByLabelText(/email/i), "jamie.lee@example.com");
    await user.type(screen.getByLabelText(/mobile/i), "5551234567");
    await user.click(screen.getByRole("button", { name: /submit/i }));

    await screen.findByRole("heading", {
      name: /health information disclaimer/i,
    });
    await user.click(
      screen.getByRole("combobox", { name: /health conditions/i }),
    );
    await user.click(await screen.findByRole("option", { name: "Asthma" }));
    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(
        screen.getByRole("combobox", { name: /health conditions/i }),
      ).toHaveTextContent("Asthma");
    });
    await user.click(screen.getByRole("button", { name: /continue/i }));

    await screen.findByRole("heading", { name: /choose your membership/i });
    await user.click(screen.getByRole("combobox", { name: /membership/i }));
    await user.click(
      await screen.findByRole("option", { name: /basic membership/i }),
    );
    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(
        screen.getByRole("combobox", { name: /membership/i }),
      ).toHaveTextContent("Basic Membership");
    });
    await user.click(screen.getByRole("button", { name: /continue/i }));

    await screen.findByRole("heading", { name: /review and confirm/i });
    await user.click(screen.getByRole("button", { name: /continue/i }));
    await screen.findByRole("heading", { name: /almost there!/i });

    await user.type(await screen.findByLabelText(/^password/i), "Secret123!");
    await user.type(screen.getByLabelText(/^confirm password/i), "Secret123!");
    await user.click(screen.getByRole("button", { name: /confirm & submit/i }));

    await waitFor(() => {
      expect(register).toHaveBeenCalledWith({
        firstName: "Jamie",
        lastName: "Lee",
        email: "jamie.lee@example.com",
        password: "Secret123!",
        membershipId: "basic",
      });
      expect(replaceMock).toHaveBeenCalledWith("/confirmation");
    });
  }, 15000);
});
