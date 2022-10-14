import { IUser } from '../../user/interfaces/user.interface';
import { Document } from 'mongoose';

export interface RefreshToken extends Document {
    user: IUser;
    refreshToken: string;
    ip: string;
    browser: string;
    country: string;
}
