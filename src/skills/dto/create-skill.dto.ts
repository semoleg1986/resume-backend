import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSkillDto {
  @ApiProperty({ required: true, example: 'Nest' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
    type: String,
    format: 'url',
    example:
      'https://d33wubrfki0l68.cloudfront.net/e937e774cbbe23635999615ad5d7732decad182a/26072/logo-small.ede75a6b.svg',
  })
  @IsOptional()
  url: string | null;
}
