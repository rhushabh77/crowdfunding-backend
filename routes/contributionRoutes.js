// import express from "express";
// import { createContribution, getProductContributions } from "../controllers/contributionsController.js";

// const router = express.Router();

// router.post("/", createContribution); // This should match the POST request
// router.get("/:productId", getProductContributions);

// export default router;

import express from "express";
import {
  createContribution,
  getAllContributions,
} from "../controllers/contributionsController.js";

const router = express.Router();

router.post("/", createContribution);
router.get("/", getAllContributions); // Changed to fetch all contributions

export default router;
