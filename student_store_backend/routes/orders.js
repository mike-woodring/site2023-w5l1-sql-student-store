const express = require("express");
const Order = require("../models/order");
const router = express.Router();

router.get("/", async (req, res, next) => {
    console.log({
        "context": "routes/orders.js/get('/')"
    });

    try {
        const ordersForUser = await Order.listOrdersForUser();

        console.log({
            "context": "routes/orders.js/get('/')",
            "orders": ordersForUser
        });

        return res.status(200).json({ orders: ordersForUser });
    } catch (err) {
        console.log({
            "context": "routes/orders.js/get('/')/catch",
            "err": err
        });

        next(err);
    }
});

router.post("/", async (req, res, next) => {
    console.log({
        "context": "routes/orders.js/post('/')"
    });

    try {
        const newOrder = await Order.createOrder();

        console.log({
            "context": "routes/orders.js/post('/')",
            "newOrder": newOrder
        });

        return res.status(200).json({ order: newOrder });
    } catch (err) {
        console.log({
            "context": "routes/orders.js/post('/')/catch",
            "err": err
        });

        next(err);
    }
});

module.exports = router;