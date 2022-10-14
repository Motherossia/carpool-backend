import { Roles } from './../auth/decorators/roles.decorator';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { CreateForgotPasswordDto } from './dto/create-forgot-password.dto';
import { Request } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { Controller, Get, Post, Body, UseGuards, Req, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyUuidDto } from './dto/verify-uuid.dto';
import { UserService } from './user.service';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags, ApiBearerAuth, ApiHeader, ApiOperation } from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/roles.guard';
// import { IUser } from './interfaces/user.interface';
// import { Type } from '@nestjs/common';

@ApiTags('User')
@Controller('user')
@UseGuards(RolesGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('paginate')
    async backend(@Req() req: Request) {
        let options = {};
        // if (req.query.s) {
        //     options = {
        //         $or: [{ title: new RegExp(req.query.s.toString(), 'i') }, { description: new RegExp(req.query.s.toString(), 'i') }],
        //     };
        // }

        const query = this.userService.query(options);

        if (req.query.sort) {
            query.sort({
                price: req.query.sort,
            });
        }

        const page: number = parseInt(req.query.page as any) || 1;
        const limit: number = parseInt(req.query.limit as any) || 9;

        const total = await this.userService.count(options);

        console.log('options', options);
        console.log('req.query', req.query);
        const results = await query
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();

        return {
            results,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }

    // ╔═╗╦ ╦╔╦╗╦ ╦╔═╗╔╗╔╔╦╗╦╔═╗╔═╗╔╦╗╔═╗
    // ╠═╣║ ║ ║ ╠═╣║╣ ║║║ ║ ║║  ╠═╣ ║ ║╣
    // ╩ ╩╚═╝ ╩ ╩ ╩╚═╝╝╚╝ ╩ ╩╚═╝╩ ╩ ╩ ╚═╝
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Register user' })
    @ApiCreatedResponse({})
    async register(@Body() createUserDto: CreateUserDto) {
        // try {
        return await this.userService.create(createUserDto);
        // } catch (e) {
        //     console.log('eroor', e);
        //     // res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
        //     //     message: error.message,
        //     //     error,
        //     //   });
        // }
    }

    @Post('verify-email')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Verify Email' })
    @ApiOkResponse({})
    async verifyEmail(@Req() req: Request, @Body() verifyUuidDto: VerifyUuidDto) {
        return await this.userService.verifyEmail(req, verifyUuidDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Login User' })
    @ApiOkResponse({})
    async login(@Req() req: Request, @Body() loginUserDto: LoginUserDto) {
        return await this.userService.login(req, loginUserDto);
    }

    @Post('refresh-access-token')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Refresh Access Token with refresh token' })
    @ApiCreatedResponse({})
    async refreshAccessToken(@Body() refreshAccessTokenDto: RefreshAccessTokenDto) {
        return await this.userService.refreshAccessToken(refreshAccessTokenDto);
    }

    @Post('forgot-password')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Forgot password' })
    @ApiOkResponse({})
    async forgotPassword(@Req() req: Request, @Body() createForgotPasswordDto: CreateForgotPasswordDto) {
        return await this.userService.forgotPassword(req, createForgotPasswordDto);
    }

    @Post('forgot-password-verify')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Verfiy forget password code' })
    @ApiOkResponse({})
    async forgotPasswordVerify(@Req() req: Request, @Body() verifyUuidDto: VerifyUuidDto) {
        return await this.userService.forgotPasswordVerify(req, verifyUuidDto);
    }

    @Post('reset-password')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Reset password after verify reset password' })
    @ApiBearerAuth()
    @ApiHeader({
        name: 'Bearer',
        description: 'the token we need for auth.',
    })
    @ApiOkResponse({})
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
        return await this.userService.resetPassword(resetPasswordDto);
    }

    @Get('data')
    @UseGuards(AuthGuard('jwt'))
    @Roles('admin')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'A private route for check the auth' })
    @ApiHeader({
        name: 'Bearer',
        description: 'the token we need for auth.',
    })
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({})
    findAll() {
        return this.userService.findAll();
    }
}

// import { BadRequestException, Body, Controller, Get, HttpStatus, Param, Post, Res, UseGuards, HttpCode } from '@nestjs/common';
// import { InjectConnection } from '@nestjs/mongoose';
// import { Response } from 'express';
// import { Connection, Schema as MongooseSchema } from 'mongoose';
// import { CreateUserDto } from './dto/createUser.dto';
// import { UserService } from './user.service';

// import { ApiCreatedResponse, ApiOkResponse, ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
// import { RolesGuard } from '../auth/guards/roles.guard';

// @ApiTags('User')
// @Controller('user')
// @UseGuards(RolesGuard)
// export class UserController {
//     constructor(@InjectConnection() private readonly mongoConnection: Connection, private userService: UserService) {}

//     @Post()
//     @HttpCode(HttpStatus.CREATED)
//     @ApiOperation({ summary: 'Register user' })
//     @ApiCreatedResponse({})
//     async register(@Body() createUserDto: CreateUserDto) {
//         return await this.userService.create(createUserDto);
//     }

//     // @Post('/createUser')
//     // async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
//     //     const session = await this.mongoConnection.startSession();
//     //     session.startTransaction();
//     //     try {
//     //         const newUser: any = await this.userService.createUser(createUserDto, session);
//     //         await session.commitTransaction();
//     //         return res.status(HttpStatus.CREATED).send(newUser);
//     //     } catch (error) {
//     //         await session.abortTransaction();
//     //         throw new BadRequestException(error);
//     //     } finally {
//     //         session.endSession();
//     //     }
//     // }

//     // @Get('/getUserById/:id')
//     // async getCompanyById(@Param('id') id: MongooseSchema.Types.ObjectId, @Res() res: Response) {
//     //     const user: any = await this.userService.getUserById(id);
//     //     return res.status(HttpStatus.OK).send(user);
//     // }
// }
