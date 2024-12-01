import productSchema from "../scheme/productSchema.js";
import asyncHandler from "../middleware/asyncHandler.js";
const GetProduct = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber || 1);

  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};
  const count = await productSchema.countDocuments({ ...keyword });

  const products = await productSchema
    .find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

const getProductById = asyncHandler(async (req, res) => {
  const productS = await productSchema.findById(req.params.id);

  if (productS) {
    return res.json(productS);
  }
  res.status(404);
  throw new Error("resource not found");
});

const createProduct = asyncHandler(async (req, res) => {
  console.log(req.user);
  const newProduct = new productSchema({
    name: "SampleProduct",
    price: 450,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "sampleBrand",
    category: "sample",
    countInStock: 5,
    numreviews: 7,
    description: "its a sample product",
  });
  const productCreated = newProduct.save();
  res.status(200).json(productCreated);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, image, brand, category, countInStock, description } =
    req.body;

  if (!req.params.id && !image) {
    res.status(400);
    throw new Error("Product ID is required.");
  }

  const product = await productSchema.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.description = description;

    const updatedproduct = await product.save();
    res.status(200).json(updatedproduct);
  } else {
    res.status(400);
    throw new Error("product not Found ");
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await productSchema.findById(req.params.id);
  if (product) {
    await productSchema.deleteOne({ _id: product._id });
  } else {
    res.status(400);
    throw new Error("Resource not Found ");
  }
});

const Reviews = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await productSchema.findById(req.params.id);
  if (product) {
    const alredyReviewed = await product.reviews.find(
      (review) => review.user.toString() === req.user_.id.toString()
    );

    if (alredyReviewed) {
      res.status(400);
      throw new Error("Product Alredy Reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      Comment: comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;

    await product.save();
  } else {
    res.status(400);
    throw new Error("Resource not Found ");
  }
});

const getTopProduct = asyncHandler(async (req, res) => {
  const products = await productSchema.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});

export {
  GetProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  Reviews,
  getTopProduct,
};
