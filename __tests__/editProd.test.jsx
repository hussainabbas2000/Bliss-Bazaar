import { editProd } from "../src/app/adminDashboard/prod/edit/[id]/actions"; // Replace with the actual path
import { prisma } from "../src/client/db/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

jest.mock("../src/client/db/prisma", () => ({
  prisma: {
    product: {
      update: jest.fn(),
    },
  },
}));

jest.mock("next/headers", () => ({
  cookies: jest.fn(() => ({
    get: jest.fn(),
  })),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("editProd", () => {
  let mockCookies;
  beforeEach(() => {
    mockCookies = {
      get: jest.fn(),
    };
    cookies.mockReturnValue(mockCookies);
  });

  

  it("should throw an error if required fields are missing", async () => {
    // Arrange
    mockCookies.get.mockReturnValue({ value: "adminSession" });
    const mockFormData = new FormData();
    mockFormData.set("id", "123");

    // Act & Assert
    await expect(editProd(mockFormData)).rejects.toThrow("Required fields are missing!");
    
    expect(prisma.product.update).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
  });


  
  it("should redirect to login if session is empty", async () => {
    // Arrange
    mockCookies.get.mockReturnValue({ value: "" });
    const mockFormData = new FormData();
    
    // Act
    
    await editProd(mockFormData);

    // Assert
    expect(redirect).toHaveBeenCalledWith("/admin/adminLogin");
    expect(prisma.product.update).not.toHaveBeenCalled();
  });
 

  it("should update the product and redirect successfully when all fields are provided", async () => {
    // Arrange
    mockCookies.get.mockReturnValue({ value: "adminSession" });

    const mockFormData = new FormData();
    mockFormData.set("id", "123");
    mockFormData.set("name", "Test Product");
    mockFormData.set("description", "Test Description");
    mockFormData.set("price", "100");
    mockFormData.set("imageUrl", "http://example.com/image.jpg");

    prisma.product.update.mockResolvedValue({});

    // Act
    await editProd(mockFormData);

    // Assert
    expect(prisma.product.update).toHaveBeenCalledWith({
      where: { id: "123" },
      data: {
        name: "Test Product",
        description: "Test Description",
        price: 100,
        imgUrl: "http://example.com/image.jpg",
      },
    });

    expect(redirect).toHaveBeenCalledWith("/adminDashboard");
  });

  it("should handle numeric conversion for price correctly", async () => {
    // Arrange
    mockCookies.get.mockReturnValue({ value: "adminSession" });

    const mockFormData = new FormData();
    mockFormData.set("id", "123");
    mockFormData.set("name", "Test Product");
    mockFormData.set("description", "Test Description");
    mockFormData.set("price", "150.50");
    mockFormData.set("imageUrl", "http://example.com/image.jpg");

    prisma.product.update.mockResolvedValue({});

    // Act
    await editProd(mockFormData);

    // Assert
    expect(prisma.product.update).toHaveBeenCalledWith({
      where: { id: "123" },
      data: {
        name: "Test Product",
        description: "Test Description",
        price: 150.5,
        imgUrl: "http://example.com/image.jpg",
      },
    });

    expect(redirect).toHaveBeenCalledWith("/adminDashboard");
  });
});
