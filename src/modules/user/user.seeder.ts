// import { DataFactory, Seeder } from 'nestjs-seeder';
// import { InjectModel } from '@nestjs/mongoose';
// import { User } from '../../entities/user.entity';
// import { Model } from 'mongoose';
// import { IUser } from './interfaces/user.interface';

// export class ProductSeeder implements Seeder {
//     constructor(
//         // @InjectModel("User") private readonly productModel: Model<ProductDocument>
//         @InjectModel('User') private readonly userModel: Model<IUser>,
//     ) {}

//     drop(): Promise<any> {
//         return this.userModel.deleteMany({}) as any;
//     }

//     seed(): Promise<any> {
//         const products: any = DataFactory.createForClass(User).generate(50);

//         return this.userModel.insertMany(products);
//     }
// }
