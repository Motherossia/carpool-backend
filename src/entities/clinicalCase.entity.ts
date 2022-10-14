import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
// import { IsEmail, IsMongoId } from 'class-validator';

@Schema({
    timestamps: true,
})
export class ClinicalCase extends Document {
    @Prop({ required: true })
    author: {
        type: mongoose.Types.ObjectId;
        ref: 'User';
    };

    @Prop({ required: true })
    title: {
        type: String;
    };
    @Prop({ required: true })
    description: {
        type: String;
    };
    @Prop({ required: true })
    slides: [
        {
            title: String;
            description: String;
            file: {
                type: mongoose.Types.ObjectId;
                ref: 'File';
            };
            slideType: String;
        },
    ];

    @Prop({})
    comments: [
        {
            type: mongoose.Types.ObjectId;
            ref: 'Comment';
        },
    ];
    @Prop({})
    upvotes: [
        {
            type: mongoose.Types.ObjectId;
            ref: 'User';
        },
    ];
}

export const ClinicalCaseSchema = SchemaFactory.createForClass(ClinicalCase);
