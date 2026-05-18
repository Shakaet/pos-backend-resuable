import jwt from "jsonwebtoken";
import { Credentials } from "../config/config";

export const generateAccessToken = (payload: any) => {
    const options: any = { expiresIn: Credentials.jwt_access_expires };
    return jwt.sign(payload, Credentials.jwt_access_secret, options);
}

export const generateRefreshToken = (payload: any) => {
    const options: any = { expiresIn: Credentials.jwt_refresh_expires };
    return jwt.sign(payload, Credentials.jwt_refresh_secret, options);
}