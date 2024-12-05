import { addProd } from "../src/app/adminDashboard/addProduct/actions"; // Assuming the function is in the same directory.
import prisma from "../src/client/db/prisma"; // Mocking prisma for testing.
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Mock dependencies
jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));
jest.mock("../src/client/db/prisma", () => ({
  product: {
    create: jest.fn(),
  },
}));

describe("addProd Function", () => {
  let formData;

  beforeEach(() => {
    jest.resetAllMocks();
    formData = new FormData();
    formData.set("name", "Test Product");
    formData.set("description", "A test description");
    formData.set("price", "50");
    formData.set("imageUrl", "https://example.com/image.jpg");
    cookies.mockReturnValue({ get: jest.fn(() => ({ value: "validSession" })) });
  });

  test("Mutant 1: Detect incorrect price calculation", async () => {
    // Introduce a mutant: price = Number(formData.get("price") || 0 - 1); in the addProd function
    
    formData.set("price", ""); // Empty price to trigger fallback.

    await expect(addProd(formData)).rejects.toThrow("Required fields are missing!");

    // Kill the mutant by asserting correct error detection.
    expect(prisma.product.create).not.toHaveBeenCalled();
  });

  test("Mutant 2: Detect omission of price validation", async () => {
    // Introduce a mutant: `if (!name || !description || !imgUrl || !price)` -> `if (!name || !description || !imgUrl)`
    formData.set("price", "0"); // Invalid price.
    await expect(addProd(formData)).rejects.toThrow("Required fields are missing!");

    // Kill the mutant by asserting the missing field validation works.
    expect(prisma.product.create).not.toHaveBeenCalled();
  });
});
