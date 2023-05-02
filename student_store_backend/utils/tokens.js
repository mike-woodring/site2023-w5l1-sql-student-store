const jwt = require("jwt");
const { SECRET_KEY } = require("./config");

// Create a function called generateToken that accepts a data parameter and returns a signed token using the jsonwebtoken package and the SECRET_KEY.
//
const generateToken = (data) => jwt.sign(data, SECRET_KEY, { expiresIn: "24h" });

// Below that define a createUserJwt function that accepts a user and creates a payload with that user's email and admin status.
// It should return the result of calling the generateToken method on that payload.
//
const createUserJwt = (user) => {
    const payload = {
        email: user.email,
        isAdmin: user.isAdmin || false
    };

    const token = generateToken(user);

    console.log({
        "context": "createUserJwt",
        "user": user,
        "payload": payload,
        "token": token
    });

    return token;
};

// Finally, create a validateToken function that accepts a function and runs a try...catch block. Try to verify the token with the
// jsonwebtoken package and the SECRET_KEY. If anything goes wrong, return an empty object.
//
const validateToken = (token) => {
    console.log({
        "context": "validateToken",
        "token": token
    });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log({
            "context": "validateToken",
            "decoded": decoded
        });
            return decoded;
    } catch(err) {
        console.log({
            "context": "validateToken/catch",
            "err": err
        });
    }
};

// Export all functions.
//
module.exports = {
    generateToken,
    createUserJwt,
    validateToken
};