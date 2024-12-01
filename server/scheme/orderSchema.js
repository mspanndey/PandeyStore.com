import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "user",
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "product",
        },
      },
    ],
    shippingAddress: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      postalcode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: {
        type: String,
      },
      status: {
        type: Boolean,
      },
      updated_Time: {
        type: Date,
      },
      email_Address: {
        type: String,
      },
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    paidAt: {
      type: Date,
      required: true,
      default: 0.0,
    },
    Ispaid: {
      type: Date,
      required: true,
      default: 0.0,
    },
    isDelivered: {
      type: Boolean,
      required: false,
      dafault: false,
    },
    deliveredAt: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const fullorderSchema = mongoose.model("orderDetails", orderSchema);

export default fullorderSchema;
