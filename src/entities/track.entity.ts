import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
// import { IsEmail, IsMongoId } from 'class-validator';
import { TrackStatusEnum, errors, episodeTypeEnum } from 'src/common';

@Schema({
    timestamps: true,
})
export class Track extends Document {
    @Prop({ required: true, enum: Object.values(TrackStatusEnum), default: TrackStatusEnum.DRAFT })
    status: string;

    @Prop({ minlength: 2, maxlength: 255, required: [true, errors.TITLE_NAME_IS_BLANK] })
    title: string;

    @Prop({ minlength: 2, maxlength: 255, required: [true, errors.DESCRIPTION_NAME_IS_BLANK] })
    description: string;

    @Prop({ required: [true, errors.LEARNING_GOALS_IS_BLANK] })
    learningGoals: [string];

    @Prop({ required: [true, errors.OVERVIEW_IS_BLANK] })
    overview: string;

    @Prop({ required: [true, errors.PRICE_IS_BLANK] })
    prices: [
        {
            price: number;
            setupDate: Date;
        },
    ];

    @Prop({ required: [true, errors.AUTHOR_IS_BLANK] })
    author: string;
    // author: {
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

    @Prop({})
    rentalDetails: [
        {
            type: mongoose.Types.ObjectId;
            ref: 'rentalDetails';
        },
    ];
    content: [
        {
            chapterTitle: String;
            chapterDescription: String;
            order: Number;
            episodes: [
                {
                    episodeTitle: String;
                    episodeDescription: String;
                    order: number;
                    capsule: {
                        type: mongoose.Types.ObjectId;
                        ref: 'Capsule';
                    };
                    episodeType: {
                        type: string;
                        // enum: Object.values(episodeTypeEnum),
                        enum: ['PRIVATE', 'PUBLIC'];
                        default: episodeTypeEnum.PRIVATE;
                    };
                },
            ];
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

export const TrackSchema = SchemaFactory.createForClass(Track);
