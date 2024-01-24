import { IsEmail, IsEnum, IsString, IsEmpty } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsEnum(['INTERN', 'ENGINEER', 'ADMIN'], { message: 'Valid role required' })
    role: 'INTERN' | 'ENGINEER' | 'ADMIN';
}