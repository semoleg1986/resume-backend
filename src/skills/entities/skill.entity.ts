import { ApiProperty } from '@nestjs/swagger';
import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class Skill {
  @ApiProperty({ required: true, format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ required: true, example: 'Nest' })
  @Column()
  name: string;

  @ApiProperty({
    required: true,
    type: String,
    format: 'url',
    example:
      'https://d33wubrfki0l68.cloudfront.net/e937e774cbbe23635999615ad5d7732decad182a/26072/logo-small.ede75a6b.svg',
  })
  @Column()
  url: string;
}
