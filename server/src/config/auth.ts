import jwt, {JwtPayload} from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
require('dotenv').config();

declare global {
        namespace Express {
            interface Request {
                userId?: string; 
                userRole?: string;
                userName?: string;
                adminId?: string;
                adminName?: string,
                adminRole?: string,
            }
        }
}

const ensureAuthenticated = function(req: Request, res: Response , next: NextFunction) {

        let userToken: string | JwtPayload;
    
        const UserauthHeader = req.headers.authorization;

        if (!UserauthHeader || UserauthHeader.trim() === '' || UserauthHeader.split(' ')[1] === 'null' ) {
                return res.status(500).json({ errMsg: 'Unauthorized Access.' });
        }

        // Remove quotes from the token
        userToken = UserauthHeader.replace(/['"]+/g, '').split(' ')[1];

        try {
                const secret  = process.env.JWT_SECRET;

                if(secret){
                        const decoded =  jwt.verify(userToken, secret) as JwtPayload;

                        if (!decoded.id) {
                                return res.status(500).json({ errMsg: 'Unauthorized Access.' });   
                        } else {
                                const userId = decoded.id;
                                const userRole = decoded.role;
                                const userName = decoded.userName;
            
                                req.userRole = userRole;
                                req.userName = userName;
                                req.userId = userId;
            
                                next();
                        }
                }else{
                        return res.status(500).json({ message: 'No secret found' });   
                      
                }
               
        } catch (error) {
                res.status(500).json({ message: 'internal server error' })
                console.log(error);
        }
};

const ensureAdmin = function(req: Request, res: Response , next: NextFunction) {

        let adminToken;
    
        const adminAuthHeader = req.headers.authorization;

        if (!adminAuthHeader || adminAuthHeader.trim() === '' || adminAuthHeader.split(' ')[1] === 'null' ) {
                return res.json({ errMsg: 'Unauthorized Access.' });
        }
    
                // Remove quotes from the token
                adminToken = adminAuthHeader.replace(/['"]+/g, '').split(' ')[1];

        try {
                const secret  = process.env.JWT_SECRET;

                if(secret){
                        const decoded =  jwt.verify(adminToken, secret) as JwtPayload;
                
                        if (!decoded.id) {
                            return res.json({ errMsg: 'Unauthorized Access.' });
                        } else {
                            // Access the admin ID 
                            const adminId   = decoded.id;
                            const adminRole = decoded.role;
                            const adminName = decoded.userName;
        
                            // Pass the admin ID to the next middleware 
                            req.adminId   = adminId;
                            req.adminRole = adminRole;
                            req.adminName = adminName;
        
                            next();
                        }
                }else{
                        return res.json({ errMsg: 'Something went wrong' });   
                }

        } catch (error) {
                res.status(500).json({status: false, message: 'internal server error'})
                console.log(error);
        }
};



export {ensureAuthenticated, ensureAdmin} 
