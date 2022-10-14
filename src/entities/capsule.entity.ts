import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
// import { IsEmail, IsMongoId } from 'class-validator';
import { CapsuleStatusEnum, CapsuleTypeEnum } from 'src/common';

@Schema({
    timestamps: true,
})
export class Capsule extends Document {
    @Prop({})
    track: {
        type: mongoose.Types.ObjectId;
        ref: 'Track';
    };

    @Prop({})
    scientificDay: {
        type: mongoose.Types.ObjectId;
        ref: 'ScientificDay';
    };

    @Prop({ required: true })
    originalVideo: String;

    @Prop({ required: true })
    playlistVideoEntryEntry: String;

    @Prop({ required: true, enum: Object.values(CapsuleStatusEnum), default: CapsuleStatusEnum.CREATED })
    status: String;

    @Prop({ required: true, enum: Object.values(CapsuleTypeEnum), default: CapsuleTypeEnum.TRACK_CAPSULE })
    type: String;
}

export const CapsuleSchema = SchemaFactory.createForClass(Capsule);
