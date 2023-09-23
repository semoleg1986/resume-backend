import { ApiProperty } from '@nestjs/swagger';
import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class Education {
  @ApiProperty({ required: true, format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ required: true, example: 'MSU' })
  @Column()
  university: string;

  @ApiProperty({
    required: true,
    description: 'In year',
    example: 2004,
  })
  @Column()
  year: number;

  @ApiProperty({ required: true, example: 'Computer Science' })
  @Column()
  specialty: string;
}
