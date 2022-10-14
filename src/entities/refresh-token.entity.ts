import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

// import { User } from './user.entity';

@Schema({ timestamps: true })
export class RefreshToken extends Document {
    @Prop({ required: true })
    refreshToken: string;

    @Prop()
    ip: string;

    @Prop()
    country: String;

    // @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    user: MongooseSchema.Types.ObjectId;

    // @Prop({ type: Date, default: Date.now })
    // updatedAt: Date;

    // @Prop({ type: Date, default: Date.now })
    // createdAt: Date;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
