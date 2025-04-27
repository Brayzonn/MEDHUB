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
