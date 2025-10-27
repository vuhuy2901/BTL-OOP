const dashBoardRoutes = require("./dashBoard.router.js")
const authRouter = require("./auth.js")
const authMiddleware = require("../../middleware/admin/auth.js");
module.exports  = (app)=>{
    app.get("/admin", (req, res) => {
        res.redirect("/admin/login");
    });
    app.use("/",authRouter)
    app.use("/admin/dashboard" , authMiddleware.requireAuth ,dashBoardRoutes)
}     
