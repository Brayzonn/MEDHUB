import jwt from 'jsonwebtoken';

interface TokenID {
    userID: object, 
    role: string, 
    userName: string
}

//generate user token function
const generateUserToken = (id: TokenID) => {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT secret is not defined');
        }

        return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export default generateUserToken