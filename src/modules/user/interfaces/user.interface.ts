import { Document } from 'mongoose';

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roles: [string];
    status: string;
    loginAttempts?: number;
    _id: string;
}
