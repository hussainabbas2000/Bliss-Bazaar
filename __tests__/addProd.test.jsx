import { prisma } from "../src/client/db/prisma";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {addProd} from "../src/app/adminDashboard/addProduct/actions";

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

jest.mock("../src/client/db/prisma", () => ({
  prisma: {
    product: {
      create: jest.fn(),
    },
  },
}));

describe("addProd function", () => {
  const mockFormData = (fields) => {
    return {
      get: jest.fn((name) => fields[name]),
    };
  };
  const adminSessionEmail = "uio@gmail.com";
  beforeEach(() => {
    jest.clearAllMocks();
  });




  it("redirects to login if session is empty", async () => {
    cookies.mockReturnValue({
      get: jest.fn(() => ({ value: '' })),
    });

    const formData = mockFormData({
      name: "Product Name",
      description: "Product Description",
      price: "100",
      imageUrl: "http://example.com/image.jpg",
    });

    await addProd(formData);

    expect(redirect).toHaveBeenCalledWith("/admin/adminLogin");
    expect(prisma.product.create).not.toHaveBeenCalled();
  });






  it("throws an error if description is missing", async () => {
    cookies.mockReturnValue({
      get: jest.fn(() => ({ value: adminSessionEmail })),
    });

    const formData = mockFormData({
      name: "Product Name",
      description: "",
      price: "100",
      imageUrl: "http://example.com/image.jpg",
    });
    await expect(addProd(formData)).rejects.toThrow("Required fields are missing!");
    expect(prisma.product.create).not.toHaveBeenCalled();
  });



  it("throws an error if name is missing", async () => {
    cookies.mockReturnValue({
      get: jest.fn(() => ({ value: adminSessionEmail })),
    });

    const formData = mockFormData({
      name: "",
      description: "Sample Description",
      price: "100",
      imageUrl: "http://example.com/image.jpg",
    });
    await expect(addProd(formData)).rejects.toThrow("Required fields are missing!");
    expect(prisma.product.create).not.toHaveBeenCalled();
  });


  it("throws an error if price is missing", async () => {
    cookies.mockReturnValue({
      get: jest.fn(() => ({ value: adminSessionEmail })),
    });

    const formData = mockFormData({
      name: "Sample Name",
      description: "Sample Description",
      price: "",
      imageUrl: "http://example.com/image.jpg",
    });
    await expect(addProd(formData)).rejects.toThrow("Required fields are missing!");
    expect(prisma.product.create).not.toHaveBeenCalled();
  });


  it("throws an error if image is missing", async () => {
    cookies.mockReturnValue({
      get: jest.fn(() => ({ value: adminSessionEmail })),
    });

    const formData = mockFormData({
      name: "Sample Name",
      description: "Sample Description",
      price: "100",
      imageUrl: "",
    });
    await expect(addProd(formData)).rejects.toThrow("Required fields are missing!");
    expect(prisma.product.create).not.toHaveBeenCalled();
  });



  it("creates a product if all fields are provided and session is valid", async () => {
    cookies.mockReturnValue({
      get: jest.fn(() => ({ value: adminSessionEmail })),
    });

    const formData = mockFormData({
      name: "Product Name",
      description: "Product Description",
      price: "100",
      imageUrl: "http://example.com/image.jpg",
    });

    await addProd(formData);

    expect(prisma.product.create).toHaveBeenCalledWith({
      data: {
        name: "Product Name",
        description: "Product Description",
        price: 100,
        imgUrl: "http://example.com/image.jpg",
      },
    });
    expect(redirect).toHaveBeenCalledWith("/adminDashboard");
  });





});
