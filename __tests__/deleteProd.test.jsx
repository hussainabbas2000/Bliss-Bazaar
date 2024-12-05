import { handleDelete } from "../src/app/adminDashboard/deleteProduct/actions"; // Replace with the actual path of your file
import { prisma } from "../src/client/db/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
jest.mock("../src/client/db/prisma", () => ({
  prisma: {
    product: {
      delete: jest.fn(),
    },
  },
}));

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

describe("handleDelete", () => {
  it("should delete the product with the given product ID", async () => {
    const mockProdId = "12345";

    // Mock implementation for prisma.product.delete
    prisma.product.delete.mockResolvedValue({ id: mockProdId });

    await handleDelete(mockProdId);

    // Ensure prisma.product.delete was called with the correct arguments
    expect(prisma.product.delete).toHaveBeenCalledWith({ where: { id: mockProdId } });
  });

  it("should revalidate the admin dashboard path", async () => {
    const mockProdId = "12345";

    prisma.product.delete.mockResolvedValue({ id: mockProdId });

    await handleDelete(mockProdId);

    // Ensure revalidatePath was called with the correct path
    expect(revalidatePath).toHaveBeenCalledWith("/adminDashboard/deleteProduct");
  });

});
