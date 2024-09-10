"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "@/lib/axiosConfig";

type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
  countInStock: number;
  img: string;
};

const AdminDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    countInStock: "",
    img: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    // Check if there's a valid token in localStorage
    const token = localStorage.getItem("token");
    if (token) setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    // Fetch products from the backend
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddProduct = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/products", {
        name: form.name,
        price: parseFloat(form.price),
        description: form.description,
        countInStock: parseInt(form.countInStock),
        img: form.img,
      });
      setProducts([...products, response.data]);
      setForm({
        name: "",
        price: "",
        description: "",
        countInStock: "",
        img: "",
      });
    } catch (error) {
      console.error("Failed to add product", error);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      price: product.price.toString(),
      description: product.description,
      countInStock: product.countInStock.toString(),
      img: product.img,
    });
  };

  const handleUpdateProduct = async () => {
    if (editingProduct) {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/products/${editingProduct._id}`,
          {
            name: form.name,
            price: parseFloat(form.price),
            description: form.description,
            countInStock: parseInt(form.countInStock),
            img: form.img,
          }
        );
        setProducts(
          products.map((product) =>
            product._id === editingProduct._id ? response.data : product
          )
        );
        setEditingProduct(null);
        setForm({
          name: "",
          price: "",
          description: "",
          countInStock: "",
          img: "",
        });
      } catch (error) {
        console.error("Failed to update product", error);
      }
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };
  return (
    <>
      {isAuthenticated ? (
        <div className="p-6 bg-black min-h-screen w-full mt-10 text-black">
          <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

          {/* Add/Edit Product Form */}
          <div className="bg-white p-4 rounded shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-3">
              {editingProduct ? "Edit Product" : "Add Product"}
            </h2>
            <div className="mb-3">
              <label className="block text-gray-700">Product Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Enter product name"
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Enter product price"
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700">Price Before</label>
              <input
                type="number"
                name="before"
                value={form.price}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Enter product price"
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700">Count in Stock</label>
              <input
                type="number"
                name="countInStock"
                value={form.countInStock}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Enter count in stock"
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700">Picture URL</label>
              <input
                type="text"
                name="img"
                value={form.img}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Enter picture URL"
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Enter product description"
              />
            </div>
            <div>
              {editingProduct ? (
                <button
                  onClick={handleUpdateProduct}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Update Product
                </button>
              ) : (
                <button
                  onClick={handleAddProduct}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Add Product
                </button>
              )}
            </div>
          </div>

          {/* Product List */}
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-3">Product List</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b p-2">Name</th>
                  <th className="border-b p-2">Price</th>
                  <th className="border-b p-2">Count in Stock</th>
                  <th className="border-b p-2">Description</th>
                  <th className="border-b p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className="border-b p-2">{product.name}</td>
                    <td className="border-b p-2">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="border-b p-2">{product.countInStock}</td>
                    <td className="border-b p-2">{product.description}</td>
                    <td className="border-b p-2 flex gap-2">
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
        <div className="bg-red-100 text-red-700 p-4 rounded">
          You are not authenticated. Please log in.
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
