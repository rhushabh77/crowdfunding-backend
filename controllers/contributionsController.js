import Contribution from "../models/contributions.model.js";
import Product from "../models/products.model.js";

export const createContribution = async (req, res) => {
  const { productId, name, remarks, amount, currency, isConverted } = req.body;

  try {
    const contribution = new Contribution({
      productId,
      name,
      remarks,
      amount,
      currency,
      isConverted,
    });
    await contribution.save();

    const update = {
      [`collected.${currency}`]: amount,
    };
    await Product.findByIdAndUpdate(productId, { $inc: update });

    res.status(201).json(contribution);
  } catch (error) {
    res.status(400).json({ message: "Error creating contribution", error });
  }
};

export const getAllContributions = async (req, res) => {
  try {
    const contributions = await Contribution.find().populate(
      "productId",
      "name description image"
    ); // Populate product details
    res.status(200).json(contributions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contributions", error });
  }
};
