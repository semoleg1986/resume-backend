import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { EducationService } from './education.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Education } from './entities/education.entity';
import { plainToClass } from 'class-transformer';

@ApiTags('Education')
@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Add new position',
    description: 'Add new education information',
  })
  @ApiCreatedResponse({ description: 'Successful operation', type: Education })
  @ApiBadRequestResponse({
    description: 'Bad request. Body does not contain required fields',
  })
  create(@Body() createEducationDto: CreateEducationDto) {
    return plainToClass(
      Education,
      this.educationService.create(createEducationDto),
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get education list',
    description: 'Gets all positions education list',
  })
  @ApiOkResponse({ description: 'Successful operation', type: [Education] })
  findAll() {
    return this.educationService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get single position by id',
    description: 'Get single position by id',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
    description: 'The ID of the education record',
  })
  @ApiOkResponse({ description: 'Successful operation', type: Education })
  @ApiNotFoundResponse({ description: 'Position was not found' })
  @ApiBadRequestResponse({
    description: 'Bad request. position is invalid (not uuid)',
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.educationService.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update position information',
    description: 'Update position information by UUID',
  })
  @ApiOkResponse({
    description: 'The position has been updated.',
    type: Education,
  })
  @ApiNotFoundResponse({ description: 'Position was not found' })
  @ApiBadRequestResponse({
    description: 'Bad request. PositionId is invalid (not uuid)',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEducationDto: UpdateEducationDto,
  ) {
    return plainToClass(
      Education,
      this.educationService.update(id, updateEducationDto),
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete position',
    description: 'Delete position from db',
  })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiNotFoundResponse({ description: 'Position was not found' })
  @ApiBadRequestResponse({
    description: 'Bad request. positionId is invalid (not uuid)',
  })
  remove(@Param('id') id: string) {
    return this.educationService.remove(id);
  }
}
