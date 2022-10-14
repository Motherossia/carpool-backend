import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
// import { IsEmail, IsMongoId } from 'class-validator';
import { RentalDetailsStatusEnum } from 'src/common';

@Schema({
    timestamps: true,
})
export class RentalDetails extends Document {
    @Prop({})
    owner: {
        type: mongoose.Types.ObjectId;
        ref: 'User';
    };

    @Prop({})
    track: {
        type: mongoose.Types.ObjectId;
        ref: 'Track';
    };

    @Prop({ required: true, enum: Object.values(RentalDetailsStatusEnum), default: RentalDetailsStatusEnum.ACTIVE })
    status: String;

    @Prop({})
    rentalDate: Date;

    @Prop({})
    rentalPrice: number;

    @Prop({})
    expiresIn: [Date];

    @Prop({})
    lastViewed: {
        date: Date;
        chapterOrder: number;
        episodeOrder: number;
        pausePositionIncapsule: number;
    };

    @Prop({})
    advancement: [
        {
            chapter: number;
            episodes: [number];
        },
    ];
}

export const RentalDetailsSchema = SchemaFactory.createForClass(RentalDetails);
