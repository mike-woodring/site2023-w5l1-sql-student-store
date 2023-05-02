const express = require("express");
const Store = require("../models/store");
const router = express.Router();

router.get("/", async (req, res, next) => {
    console.log({
        "context": "routes/stores.js/get('/')"
    });

    try {
        const allProducts = await Store.listProducts();

        console.log({
            "context": "routes/stores.js/get('/')",
            "allProducts": allProducts
        });

        return res.status(200).json({ products: allProducts });
    } catch (err) {
        console.log({
            "context": "routes/stores.js/get('/')/catch",
            "err": err
        });

        next(err);
    }
});

module.exports = router;