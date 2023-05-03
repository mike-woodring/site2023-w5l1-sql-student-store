const express = require("express");
const Order = require("../models/order");
const security = require("../middleware/security");
const router = express.Router();

router.get("/", security.requireAuthenticatedUser, async (req, res, next) => {
    const { user } = res.locals;

    console.log({
        "context": "routes/orders.js/get('/')",
        "user": user
    });

    try {
        const ordersForUser = await Order.listOrdersForUser(user);

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

router.post("/", security.requireAuthenticatedUser, async (req, res, next) => {
    const { user } = res.locals;

    console.log({
        "context": "routes/orders.js/post('/')",
        "user": user
    });

    try {
        const newOrder = await Order.createOrder({ user, order: req.body });

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