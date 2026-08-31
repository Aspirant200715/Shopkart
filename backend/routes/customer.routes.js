import express from "express"
import { registerCustomer,LoginCustomer,getCustomer, logoutCustomer, changedPassword } from "../controllers/customer.controller.js"
import isAuthenticated from "../middlewares/auth.middleware.js"


const customerRoutes = express.Router()

customerRoutes.post("/register",registerCustomer)
customerRoutes.post("/login",LoginCustomer)
customerRoutes.get("/me",isAuthenticated,getCustomer)
customerRoutes.post("/logout",logoutCustomer)
customerRoutes.patch("/change-password",isAuthenticated,changedPassword)

export default customerRoutes