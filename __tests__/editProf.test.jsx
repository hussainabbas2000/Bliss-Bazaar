import { editProf } from "../src/app/adminDashboard/editProfile/actions"; // Replace with the actual path to your file
import { prisma } from "../src/client/db/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

jest.mock("../src/client/db/prisma", () => ({
  prisma: {
    admin: {
      update: jest.fn(),
    },
  },
}));

jest.mock("next/headers", () => ({
  cookies: jest.fn(() => ({
    get: jest.fn(),
    set: jest.fn(),
  })),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("editProf", () => {
  let mockCookies;
  beforeEach(() => {
    mockCookies = {
      get: jest.fn(),
      set: jest.fn(),
    };
    cookies.mockReturnValue(mockCookies);
  });
  it("should handle missing email in cookies gracefully", async () => {
    // Arrange
    const mockNewEmail = "new@example.com";

    const mockFormData = new FormData();
    mockFormData.set("email", mockNewEmail);

    mockCookies.get.mockReturnValue(undefined);

    // Act
    await expect(editProf(mockFormData)).rejects.toThrow();

    // Assert
    expect(prisma.admin.update).not.toHaveBeenCalled();
    expect(mockCookies.set).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
  });
  it("should throw an error if admin update fails", async () => {
    // Arrange
    const mockPrevEmail = "old@example.com";
    const mockNewEmail = "new@example.com";

    const mockFormData = new FormData();
    mockFormData.set("email", mockNewEmail);

    mockCookies.get.mockReturnValue({ value: mockPrevEmail });
    const mockError = new Error("Update failed");
    prisma.admin.update.mockRejectedValue(mockError);

    // Act & Assert
    await expect(editProf(mockFormData)).rejects.toThrow("Update failed");

    expect(prisma.admin.update).toHaveBeenCalled();
    expect(mockCookies.set).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
  });
  it("should update admin details and redirect successfully", async () => {
    // Arrange
    const mockPrevEmail = "old@example.com";
    const mockNewEmail = "new@example.com";
    const mockPassword = "newPassword";
    const mockName = "New Name";
    
    const mockFormData = new FormData();
    mockFormData.set("email", mockNewEmail);
    mockFormData.set("password", mockPassword);
    mockFormData.set("name", mockName);

    mockCookies.get.mockReturnValue({ value: mockPrevEmail });
    prisma.admin.update.mockResolvedValue({});

    // Act
    await editProf(mockFormData);

    // Assert
    expect(prisma.admin.update).toHaveBeenCalledWith({
      where: { email: mockPrevEmail },
      data: {
        email: mockNewEmail,
        password: mockPassword,
        name: mockName,
      },
    });

    expect(mockCookies.set).toHaveBeenCalledWith("localAdminID", `${mockNewEmail}`);
    expect(redirect).toHaveBeenCalledWith("/adminDashboard");
  });

  

  
});
