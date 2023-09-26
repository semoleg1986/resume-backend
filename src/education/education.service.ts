import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { Education } from './entities/education.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class EducationService {
  constructor(
    @InjectRepository(Education)
    private readonly educationRepository: Repository<Education>,
  ) {}
  async create(createEducationDto: CreateEducationDto) {
    if (
      !createEducationDto.university ||
      !createEducationDto.specialty ||
      !createEducationDto.year
    ) {
      throw new BadRequestException('Invalid dto');
    }

    const newPosition: Education = {
      id: uuidv4(),
      university: createEducationDto.university,
      specialty: createEducationDto.specialty,
      year: createEducationDto.year,
    };
    return await this.educationRepository.save(newPosition);
  }

  async findAll() {
    return await this.educationRepository.find();
  }

  async findOne(id: string) {
    return await this.educationRepository
      .findOne({ where: { id: id } })
      .then((position) => {
        if (!position) {
          throw new NotFoundException('Position not found');
        }
        return position;
      })
      .catch((error) => {
        console.error('Error while fetching position:', error.message);
        throw error;
      });
  }

  async update(id: string, updateEducationDto: UpdateEducationDto) {
    const { university, specialty, year } = updateEducationDto;
    const education = await this.educationRepository.findOne({
      where: { id: id },
    });

    if (!education) {
      throw new NotFoundException('Education not found');
    }

    education.university = university;
    education.specialty = specialty;
    education.year = year;

    return await this.educationRepository.save(education);
  }

  async remove(id: string) {
    const position = await this.educationRepository.findOne({
      where: { id: id },
    });
    if (!position) {
      throw new NotFoundException('Position not found');
    }
    await this.educationRepository.remove(position);
  }
}
