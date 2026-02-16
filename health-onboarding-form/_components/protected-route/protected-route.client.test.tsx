import { render } from "@testing-library/react";
import { ProtectedRoute } from "./protected-route";
import { getCurrentUser, isAuthenticated, type User } from "@/_actions/auth";

jest.mock("@/_actions/auth", () => ({
  isAuthenticated: jest.fn(),
  getCurrentUser: jest.fn(),
}));

describe("ProtectedRoute", () => {
  it("should redirect to login if user is not authenticated", () => {
    // Mock isAuthenticated to return false
    jest.mocked(isAuthenticated).mockReturnValue(false);

    const { container } = render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>,
    );
    expect(container.querySelector("a")).toHaveAttribute("href", "/login");
  });

  it("should render children if user is authenticated", () => {
    const mockUser: User = {
      id: "1",
      email: "test@example.com",
      name: "Test User",
      membershipType: "basic",
      memberSince: "2023-01-01",
    };

    // Mock isAuthenticated to return true and getCurrentUser to return a user object
    jest.mocked(isAuthenticated).mockReturnValue(true);
    jest.mocked(getCurrentUser).mockReturnValue(mockUser);

    const { getByText } = render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>,
    );
    expect(getByText("Protected Content")).toBeInTheDocument();
  });
});
