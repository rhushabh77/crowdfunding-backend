import Product from "../models/products.model.js";

// Create a new product
export const createProduct = async (req, res) => {
  const { name, description, image, amount, collected } = req.body;

  // Validate required fields
  if (!name || !description || !image || amount < 0 || collected < 0) {
    return res.status(400).json({ message: "Invalid product data" });
  }

  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: "Error creating product", error });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// Get a single product by id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  const { name, description, image, amount, collected } = req.body;

  // Validate required fields
  if (amount < 0 || collected < 0) {
    return res.status(400).json({ message: "Invalid product data" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: "Error updating product", error });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};
