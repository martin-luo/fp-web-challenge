import { render } from "@testing-library/react";
import { ProtectedRoute } from "./protected-route";
import { getCurrentUser, isAuthenticated, type User } from "@/_actions/auth";

jest.mock("@/_actions/auth", () => ({
  isAuthenticated: jest.fn(),
  getCurrentUser: jest.fn(),
}));

describe("ProtectedRoute", () => {
  it("should redirect to login if user is not authenticated", async () => {
    jest.mocked(isAuthenticated).mockResolvedValue(false);

    const view = await ProtectedRoute({
      children: <div>Protected Content</div>,
    });
    const { container } = render(view);

    expect(container.querySelector("a")).toHaveAttribute("href", "/login");
  });

  it("should render children if user is authenticated", async () => {
    const mockUser: User = {
      id: "1",
      email: "test@example.com",
      name: "Test User",
      membershipType: "basic",
      memberSince: "2023-01-01",
    };

    jest.mocked(isAuthenticated).mockResolvedValue(true);
    jest.mocked(getCurrentUser).mockResolvedValue(mockUser);

    const view = await ProtectedRoute({
      children: <div>Protected Content</div>,
    });
    const { getByText } = render(view);

    expect(getByText("Protected Content")).toBeInTheDocument();
  });
});
