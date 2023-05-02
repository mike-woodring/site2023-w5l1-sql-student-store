const db = require("../db");

class Order {
    static async listOrdersForUser() {
        console.log({
            "context": "Order.listOrdersForUser"
        });

        /*
        const query = `SELECT * FROM products`;
        const result = await db.query(query);
        
        return result.rows;
        */
    }

    static async createOrder() {
        console.log({
            "context": "Order.createOrder"
        });

        /*
        const query = `SELECT * FROM products`;
        const result = await db.query(query);
        
        return result.rows;
        */
    }
}

module.exports = Order;