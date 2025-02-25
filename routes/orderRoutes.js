const express = require("express");
const router = express.Router();
const Order = require("../models/OrderSchema");

// ✅ Ensure this POST route exists
router.post("/place", async (req, res) => {
    try {
        const { sellerId, buyerId, products, totalPrice } = req.body;

        if (!sellerId || !buyerId || !products || !totalPrice) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const order = new Order({ sellerId, buyerId, products, totalPrice });
        await order.save();

        res.status(201).json({ message: "Order placed successfully!", order });
    } catch (error) {
        res.status(500).json({ error: "Error placing order", details: error.message });
    }
});
// Update order status
router.put("/update-status/:orderId", async (req, res) => {
    try {
        const { status } = req.body;
        const { orderId } = req.params;

        // Validate status
        const validStatuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid order status" });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ message: "Order status updated", order: updatedOrder });
    } catch (error) {
        res.status(500).json({ error: "Error updating order status", details: error.message });
    }
});
router.get("/get-all", async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
});
router.get("/seller-orders/:sellerId", async (req, res) => {
    try {
        const orders = await Order.find({ sellerId: req.params.sellerId });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: "Error fetching seller orders", details: error.message });
    }
});
router.get("/buyer-orders/:buyerId", async (req, res) => {
    try {
        const orders = await Order.find({ buyerId: req.params.buyerId });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: "Error fetching buyer orders", details: error.message });
    }
});


module.exports = router;
