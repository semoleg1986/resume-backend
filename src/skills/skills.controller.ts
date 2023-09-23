import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { Skill } from './entities/skill.entity';
import { plainToClass } from 'class-transformer';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Add skill track',
    description: 'Add new skill information',
  })
  @ApiCreatedResponse({ description: 'Successful operation', type: Skill })
  @ApiBadRequestResponse({
    description: 'Bad request. Body does not contain required fields',
  })
  create(@Body() createSkillDto: CreateSkillDto) {
    return plainToClass(Skill, this.skillsService.create(createSkillDto));
  }

  @Get()
  @ApiOperation({
    summary: 'Get skills list',
    description: 'Gets all skills',
  })
  @ApiOkResponse({ description: 'Successful operation', type: [Skill] })
  findAll() {
    return this.skillsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get skill by id',
    description: 'Get skill by id',
  })
  @ApiParam({
    name: 'id',
    description: 'The id of the skill',
    type: 'string',
    format: 'uuid',
  })
  @ApiOkResponse({ description: 'Successful operation', type: Skill })
  @ApiNotFoundResponse({ description: 'Skill was not found' })
  @ApiBadRequestResponse({
    description: 'Bad request. skillId is invalid (not uuid)',
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.skillsService.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update skill information',
    description: 'Update position skill by UUID',
  })
  @ApiOkResponse({
    description: 'The skill has been updated.',
    type: Skill,
  })
  @ApiNotFoundResponse({ description: 'Skill was not found' })
  @ApiBadRequestResponse({
    description: 'Bad request. skillId is invalid (not uuid)',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSkillDto: UpdateSkillDto,
  ) {
    return plainToClass(Skill, this.skillsService.update(id, updateSkillDto));
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete skill',
    description: 'Delete skill from db',
  })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiNotFoundResponse({ description: 'Skill was not found' })
  @ApiBadRequestResponse({
    description: 'Bad request. skillId is invalid (not uuid)',
  })
  remove(@Param('id') id: string) {
    return this.skillsService.remove(id);
  }
}
