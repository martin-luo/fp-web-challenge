import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ConfirmationPage from "./page";

const replaceMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: replaceMock,
  }),
}));

describe("ConfirmationPage", () => {
  beforeEach(() => {
    replaceMock.mockReset();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("renders welcome copy and redirects after countdown", () => {
    render(<ConfirmationPage />);

    expect(screen.getByText(/welcome aboard/i)).toBeInTheDocument();
    expect(
      screen.getByText(/redirecting to the landing page in/i),
    ).toBeInTheDocument();

    jest.advanceTimersByTime(4000);
    expect(replaceMock).toHaveBeenCalledWith("/");
  });

  it("allows manual navigation to landing page", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<ConfirmationPage />);

    await user.click(
      screen.getByRole("button", { name: /go to landing page/i }),
    );
    expect(replaceMock).toHaveBeenCalledWith("/");
  });
});
