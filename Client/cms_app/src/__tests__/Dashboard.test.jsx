import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

// Mock localStorage
beforeEach(() => {
  Storage.prototype.getItem = jest.fn((key) => {
    if (key === "userRole") return "admin";
    if (key === "token") return "mock-token";
    return null;
  });
});

// Mock axios
jest.mock("axios", () => ({
  get: jest.fn(() =>
    Promise.resolve({
      data: [],
    })
  ),
}));

describe("Dashboard Component", () => {
  test("renders 'View All Pages' button and navigates correctly", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    const viewAllPagesButton = screen.getByText(/View All Pages/i);
    expect(viewAllPagesButton).toBeInTheDocument();
    expect(viewAllPagesButton.closest("a")).toHaveAttribute("href", "/pages");
  });

  test("renders 'View All Users' button for admin and navigates correctly", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    const viewAllUsersButton = screen.getByText(/View All Users/i);
    expect(viewAllUsersButton).toBeInTheDocument();
    expect(viewAllUsersButton.closest("a")).toHaveAttribute("href", "/useraccount");
  });
});
