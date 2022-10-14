import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
// import { IsEmail, IsMongoId } from 'class-validator';
import { ScientificDayStatusEnum, errors } from 'src/common';

@Schema({
    timestamps: true,
})
export class ScientificDay extends Document {
    @Prop({ required: true, enum: Object.values(ScientificDayStatusEnum), default: ScientificDayStatusEnum.DRAFT })
    status: string;

    @Prop({ minlength: 2, maxlength: 255, required: [true, errors.TITLE_NAME_IS_BLANK] })
    title: string;

    @Prop({ minlength: 2, maxlength: 255, required: [true, errors.DESCRIPTION_NAME_IS_BLANK] })
    description: string;

    @Prop({ required: [true, errors.LEARNING_GOALS_IS_BLANK] })
    goals: [string];

    @Prop({ required: [true, errors.OVERVIEW_IS_BLANK] })
    overview: string;

    @Prop({ required: [true, errors.AUTHOR_IS_BLANK] })
    moderator: string;
    // moderator: {
    //     type: mongoose.Types.ObjectId;
    //     ref: 'User';
    // };

    @Prop({})
    complaints: [
        {
            type: mongoose.Types.ObjectId;
            ref: 'Complaint';
        },
    ];

    content: [
        {
            episodeTitle: String;
            episodeDescription: String;
            order: number;
            capsule: {
                type: mongoose.Types.ObjectId;
                ref: 'Capsule';
            };
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

export const ScientificDaySchema = SchemaFactory.createForClass(ScientificDay);
