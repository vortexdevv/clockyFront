"use client";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosConfig";

type Product = {
  _id: string;
  name: string;
  price: number;
  before: number;
  description: string;
  countInStock: number;
  img: string;
  gender: string;
  caseColor: string;
  dialColor: string;
  movmentType: string;
};
const AdminDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    before: "",
    description: "",
    countInStock: "",
    img: "",
    gender: "",
    caseColor: "",
    dialColor: "",
    movmentType: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
    fetchProducts();
  }, []);

  const handleInputChange: any = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddProduct = async () => {
    try {
      const response = await axiosInstance.post("/products", {
        name: form.name,
        price: parseFloat(form.price),
        before: parseFloat(form.before),
        description: form.description,
        countInStock: parseInt(form.countInStock),
        img: form.img,
        gender: form.gender,
        caseColor: form.caseColor,
        dialColor: form.dialColor,
        movmentType: form.movmentType,
      });

      const newProduct = response.data;
      // setProducts([...products, newProduct]); // Add the new product including _id
      fetchProducts();
      setForm({
        name: "",
        price: "",
        before: "",
        description: "",
        countInStock: "",
        img: "",
        gender: "",
        caseColor: "",
        dialColor: "",
        movmentType: "",
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
      before: product.before.toString(),
      description: product.description,
      countInStock: product.countInStock.toString(),
      img: product.img,
      gender: product.gender,
      caseColor: product.caseColor,
      dialColor: product.dialColor,
      movmentType: product.movmentType,
    });
  };

  const handleUpdateProduct = async () => {
    if (editingProduct) {
      try {
        const response = await axiosInstance.put(
          `/products/${editingProduct._id}`,
          {
            name: form.name,
            price: parseFloat(form.price),
            before: parseFloat(form.before),
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
          before: "",
          description: "",
          countInStock: "",
          img: "",
          gender: "",
          caseColor: "",
          dialColor: "",
          movmentType: "",
        });
      } catch (error) {
        console.error("Failed to update product", error);
      }
    }
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
        <div className="p-6 bg-black min-h-screen w-full text-black">
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
                value={form.before}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Enter previous price"
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
              <label className="block text-gray-700">Gender</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="unisex">Unisex</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="block text-gray-700">Case Color</label>
              <input
                type="text"
                name="caseColor"
                value={form.caseColor}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Enter picture URL"
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700">Dial Color</label>
              <input
                type="text"
                name="dialColor"
                value={form.dialColor}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Enter picture URL"
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700">Movement Type</label>
              <input
                type="text"
                name="movmentType"
                value={form.movmentType}
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
                  <th className="border-b p-2 hide">Price</th>
                  <th className="border-b p-2">Count in Stock</th>
                  <th className="border-b p-2 hide">Description</th>
                  <th className="border-b p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className="border-b p-2">{product.name}</td>
                    <td className="border-b p-2 hide">${product.price}</td>
                    <td className="border-b p-2">{product.countInStock}</td>
                    <td className="border-b p-2 hide">{product.description}</td>
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
