const authRouter = require("./auth.js")

module.exports = (app) => {
    app.use("/" , authRouter )
} 