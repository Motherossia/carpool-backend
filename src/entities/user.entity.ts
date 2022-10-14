import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// import * as mongoose from 'mongoose';
import { IsEmail, IsMongoId } from 'class-validator';
import * as bcrypt from 'bcrypt';
// import { Transform } from 'class-transformer';
// import { IUser } from 'src/modules/user/interfaces/user.interface';

@Schema({
    timestamps: true,
})
export class User extends Document {
    // @Factory((faker) => faker.lorem.words(2))
    // @IsMongoId()
    // @Transform((el) => el.toString())
    // @Prop({ unique: true })
    // id: OB;

    @Prop({ minlength: 2, maxlength: 255, required: [true, 'FIRST_NAME_IS_BLANK'] })
    firstName: string;

    // @Factory((faker) => faker.lorem.words(2))
    @Prop({ minlength: 2, maxlength: 255, required: [true, 'LAST_NAME_IS_BLANK'] })
    lastName: string;

    // @Factory((faker) => faker.internet.email())
    @IsEmail()
    @Prop({ unique: true, lowercase: true, maxlength: 255, minlength: 6, required: [true, 'EMAIL_IS_BLANK'] })
    email: string;

    // @Factory((faker) => faker.internet.password())
    @Prop({ type: String, minlength: 5, maxlength: 1024, required: [true, 'PASSWORD_IS_BLANK'] })
    password: string;

    // enum: ['ADMIN', 'USER']
    // @Factory(['USER'])
    @Prop({ required: true, default: ['USER'] })
    roles: [string];

    // @Factory('CREATED')
    @Prop({ required: true, enum: ['CREATED', 'CONFIRMED', 'BLOCKED'], default: 'CREATED' })
    status: string;

    // @Prop({ default: [0] })
    // @Factory(0)
    @Prop({ default: 0 })
    loginAttempts: Number;

    // @Prop({ default: Date.now })
    // createdAt: Date;

    // verificationExpires
    // blockExpires
}

const toJSON = (schema) => {
    let transform;
    if (schema.options.toJSON && schema.options.toJSON.transform) {
        transform = schema.options.toJSON.transform;
    }
    console.log('toJSON');

    schema.options.toJSON = Object.assign(schema.options.toJSON || {}, {
        transform(doc, ret, options) {
            Object.keys(schema.paths).forEach((path) => {
                if (schema.paths[path].options && schema.paths[path].options.private) {
                    delete ret[path];
                }
            });

            ret.id = ret._id.toString();
            delete ret._id;
            delete ret.__v;
            // delete ret.createdAt;
            delete ret.updatedAt;
            if (transform) {
                return transform(doc, ret, options);
            }
        },
    });
};

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        // tslint:disable-next-line:no-string-literal
        const hashed = await bcrypt.hash(this['password'], 10);
        // tslint:disable-next-line:no-string-literal
        this['password'] = hashed;
        return next();
    } catch (err) {
        return next(err);
    }
});
