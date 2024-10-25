import jwt from "jsonwebtoken"

const generateToken = (createdUser) => {

    return jwt.sign({email: createdUser.email, id: createdUser._id}, process.env.JWT_KEY , {expiresIn: "1d"})
}

export default generateToken;