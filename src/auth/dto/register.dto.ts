import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { IsInternationalPhoneNumber} from 'src/common/validators/is-phone.validator';

export class RegisterDto {
  @ApiProperty({
    example: 'Ahmed Mohamed',
    minLength: 6,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  fullName: string;

  @ApiProperty({
    example: 'ahmed@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'StrongPassword123',
    minLength: 8,
  })
  @IsNotEmpty()
  @MinLength(8)
    @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()[\]{}\-_=+|:;"'<>,./~`]).+$/,
    {
      message:
        'Password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character',
    },
  )
  password: string;


@IsNotEmpty()
  @IsNumber()
  @Min(30)
  @Max(300)
  weight: number;
@IsNotEmpty()
  @IsNumber()
  @Min(50)
  @Max(250)
  height: number;
@IsNotEmpty()
  @IsNumber()
  @Min(10)
  @Max(120)
  age: number;

  @IsEnum(['male', 'female'])
  gender: string;




  @ApiProperty({
    example: '+201001234567',
    
  })
  @IsNotEmpty()
  @IsString()
  @IsInternationalPhoneNumber({
    message: 'Invalid phone number',
  })
  phone: string;
  @IsNotEmpty()
  @IsString()
  country: string;

}