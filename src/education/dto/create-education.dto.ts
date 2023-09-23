import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateEducationDto {
  @ApiProperty({ required: true, example: 'MSU' })
  @IsNotEmpty()
  @IsString()
  university: string;

  @ApiProperty({
    required: true,
    description: 'In year',
    example: 2004,
  })
  @IsNotEmpty()
  @IsInt()
  year: number;

  @ApiProperty({ required: true, example: 'Computer Science' })
  @IsNotEmpty()
  @IsString()
  specialty: string;
}
