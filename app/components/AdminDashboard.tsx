"use client";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosConfig";
import Orders from "./Orders";
import AddEditProductForm from "./AddEditProductForm";

type Product = {
  _id: string;
  name?: string;
  price?: string;
  before?: string;
  description?: string;
  countInStock?: string;
  gender?: string;
  caseColor?: string;
  dialColor?: string;
  movmentType?: string;
  class?: string;
  img?: string;
};

// Define ProductFormData without _id for the form
type ProductFormData = Omit<Product, "_id">;

const AdminDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeSection, setActiveSection] = useState<"products" | "orders">(
    "products"
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsAuthenticated(true);
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("products/dashboard");
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  useEffect(() => {
    if (activeSection === "products") fetchProducts();
  }, [activeSection]);

  const handleSaveProduct = async (productData: ProductFormData) => {
    try {
      if (editingProduct) {
        // Update product
        const response = await axiosInstance.put(
          `/products/${editingProduct._id}`,
          productData
        );
        setProducts(
          products.map((product) =>
            product._id === editingProduct._id ? response.data : product
          )
        );
        setEditingProduct(null);
      } else {
        // Add new product
        const response = await axiosInstance.post("/products", productData);
        setProducts([...products, response.data]);
      }
      fetchProducts();
    } catch (error) {
      console.error("Failed to save product", error);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await axiosInstance.delete(`/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <div className="p-4 sm:p-6 bg-black min-h-screen w-full text-black">
          <h1 className="text-xl sm:text-2xl font-bold mb-4">
            Admin Dashboard
          </h1>

          {/* Navigation */}
          <div className="mb-4 flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => setActiveSection("products")}
              className={`px-4 py-2 ${
                activeSection === "products" ? "bg-gray-700" : "bg-gray-500"
              } text-white rounded`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveSection("orders")}
              className={`px-4 py-2 ${
                activeSection === "orders" ? "bg-gray-700" : "bg-gray-500"
              } text-white rounded`}
            >
              Orders
            </button>
          </div>

          {/* Conditional Rendering */}
          {activeSection === "products" ? (
            <div>
              {/* Add/Edit Product Form */}
              <AddEditProductForm
                onSave={handleSaveProduct}
                editingProduct={editingProduct || undefined}
              />

              {/* Product List */}
              <div className="bg-white p-4 rounded shadow-md mt-4 overflow-x-auto">
                <h2 className="text-lg sm:text-xl font-semibold mb-3">
                  Product List
                </h2>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="border-b p-2 text-sm sm:text-base">
                        Name
                      </th>
                      <th className="border-b p-2 text-sm sm:text-base">
                        Price
                      </th>
                      <th className="border-b p-2 text-sm sm:text-base">
                        Count in Stock
                      </th>
                      <th className="border-b p-2 text-sm sm:text-base">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td className="border-b p-2 text-sm sm:text-base">
                          {product.name}
                        </td>
                        <td className="border-b p-2 text-sm sm:text-base">
                          ${product.price}
                        </td>
                        <td className="border-b p-2 text-sm sm:text-base">
                          {product.countInStock}
                        </td>
                        <td className="border-b p-2 flex gap-2 text-sm sm:text-base">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="bg-yellow-500 text-white px-2 py-1 rounded"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="bg-red-500 text-white px-2 py-1 rounded"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <Orders /> // Render Orders component when "Orders" is selected
          )}
        </div>
      ) : (
        <div className="bg-red-100 text-red-700 p-4 rounded">
          You are not authenticated. Please log in.
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
