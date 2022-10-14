// import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

// export class GetUsersDto {
//     @IsNotEmpty()
//     role: string;

//     @IsOptional()
//     from: number;

//     @IsOptional()
//     @IsPositive()
//     limit: number;
// }
import { IsNotEmpty, MinLength, MaxLength, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    // first name
    @ApiProperty({
        example: 'pejman hadavi',
        description: 'The name of the User',
        format: 'string',
        minLength: 6,
        maxLength: 255,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(255)
    readonly firtName: string;

    // last name
    @ApiProperty({
        example: 'pejman hadavi',
        description: 'The name of the User',
        format: 'string',
        minLength: 6,
        maxLength: 255,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(255)
    readonly lastName: string;

    // Email
    @ApiProperty({
        example: 'pejman@gmail.com',
        description: 'The email of the User',
        format: 'email',
        uniqueItems: true,
        minLength: 5,
        maxLength: 255,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(255)
    @IsEmail()
    readonly email: string;

    // Password
    @ApiProperty({
        example: 'secret password change me!',
        description: 'The password of the User',
        format: 'string',
        minLength: 5,
        maxLength: 1024,
    })
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(1024)
    readonly password: string;
}