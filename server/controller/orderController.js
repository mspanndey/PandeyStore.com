import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../scheme/orderSchema.js";
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsprice,
    taxprice,
    shippingprice,
    totalprice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("no Order Items");
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      shippingAddress: {
        address: shippingAddress.address,
        city: shippingAddress.city,
        postalcode: shippingAddress.postalCode,
        country: shippingAddress.country,
      },
      paymentMethod,
      itemsPrice: itemsprice,

      taxPrice: taxprice,
      shippingPrice: shippingprice,
      totalPrice: totalprice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});
const getOrderByid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    (order.Ispaid = true),
      (order.paidAt = Date.now()),
      (order.paymentResult = {
        id: req.body._id,
        status: req.body.status,
        updated_Time: req.body.updated_Time,
        email_address: req.body.payer.email_address,
      });
    const updateOrder = order.save();
    res.status(202).json(updateOrder);
  } else {
    res.status(404);
    throw new Error("order not found ");
  }
});

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(400);
    throw new Error("Error Not Found ");
  }
});

const getOrders = asyncHandler(async (req, res) => {
  const order = await Order.find({}).populate("user", "id name");
  res.status(200).json(order);
});

export {
  addOrderItems,
  getMyOrders,
  getOrderByid,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
