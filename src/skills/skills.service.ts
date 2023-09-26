import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}
  async create(createSkillDto: CreateSkillDto) {
    if (!createSkillDto.name) {
      throw new BadRequestException('Invalid dtp');
    }

    const newSkill: Skill = {
      id: uuidv4(),
      name: createSkillDto.name,
      url: createSkillDto.url,
    };
    return await this.skillRepository.save(newSkill);
  }

  async findAll() {
    return await this.skillRepository.find();
  }

  async findOne(id: string) {
    return await this.skillRepository
      .findOne({ where: { id: id } })
      .then((skill) => {
        if (!skill) {
          throw new NotFoundException('Skill not found');
        }
        return skill;
      })
      .catch((error) => {
        console.error('Error while fetching skill:', error.message);
        throw error;
      });
  }

  async update(id: string, updateSkillDto: UpdateSkillDto) {
    const { name, url } = updateSkillDto;
    const skill = await this.skillRepository.findOne({
      where: { id: id },
    });

    if (!skill) {
      throw new NotFoundException('Skill not found');
    }

    skill.name = name;
    skill.url = url;

    return await this.skillRepository.save(skill);
  }

  async remove(id: string) {
    const skill = await this.skillRepository.findOne({
      where: { id: id },
    });
    if (!skill) {
      throw new NotFoundException('Skill not found');
    }
    await this.skillRepository.remove(skill);
  }
}
