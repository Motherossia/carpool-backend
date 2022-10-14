import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
// import { IsEmail, IsMongoId } from 'class-validator';
import { CapsuleStatusEnum, CapsuleTypeEnum } from 'src/common';

@Schema({
    timestamps: true,
})
export class Comment extends Document {
    @Prop({ required: true })
    content: {
        type: String;
    };
    @Prop({ required: true })
    author: {
        type: mongoose.Types.ObjectId;
        ref: 'User';
    };
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
