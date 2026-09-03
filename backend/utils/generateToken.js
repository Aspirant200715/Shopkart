import jwt from "jsonwebtoken"

const gentoken = (customerId) => {
   return jwt.sign(
      { customerId },
      process.env.jwt_secret || process.env.JWT_SECRET,
      { expiresIn: "7d" },
   )
}

export default gentoken