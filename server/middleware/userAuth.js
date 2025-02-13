import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    const { token } = req.cookies; // Get the token from the cookies. The token is stored in the 'token' cookie
    if (!token) {
        return res.json({ success: false, message: 'User not authenticated, Login Again' }); // Send an error response if the token is not present in the cookies. 
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using the secret key
        if (tokenDecode.id) {
            req.body.userId = tokenDecode.id; // Set the user ID in the request body
        }
        else {
            return res.json({ success: false, message: 'User not authenticated, Login Again' }); // Send an error response if the token is invalid
        }
        next(); // Call the next function
    } catch (error) {
        res.json({ success: false, message: error.message }); // Send an error response if something goes wrong   
    }
}


export default userAuth;