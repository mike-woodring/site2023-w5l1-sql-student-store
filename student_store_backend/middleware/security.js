const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("./config");
const { UnauthorizedError } = require("../utils/errors");

const jwtFrom = ({headers}) => {
    console.log({
        "context": "jwtFrom"
    });

    if (headers?.authorization) {
        const [scheme, token] = headers.authorization.split(" ");

        console.log({
            "context": "jwtFrom",
            "scheme": scheme,
            "token": token
        });

        if (scheme.trim() === "Bearer") {
            return token;
        }
    }

    return undefined;
};

const extractUserFromJwt = (req, res, next) => {
    try {
        console.log({
            "context": "extractUserFromJwt",
            "scheme": scheme,
            "token": token
        });

        const token = jwtFrom(req);

        if (token) {
            res.locals.user = jwt.verify(token, SECRET_KEY);

            console.log({
                "context": "extractUserFromJwt/verify",
                "res.locals.user": res.locals.user
            });
        }

        return next();
    } catch(err) {
        console.log({
            "context": "extractUserFromJwt",
            "err": err
        });

        return next();
    }
};

const requireAuthenticatedUser = (req, res, next) => {
    try {
        const { user } = res.locals;

        console.log({
            "context": "requireAuthenticatedUser",
            "res.locals.user": user
        });

        if (!user?.email) {
            throw new UnauthorizedError();
        }

        return next();
    } catch(err) {
        console.log({
            "context": "requireAuthenticatedUser",
            "err": err
        });

        return next(err);
    }
};

module.exports = {
    extractUserFromJwt,
    requireAuthenticatedUser
};