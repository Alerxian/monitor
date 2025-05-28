import { randomUUID } from 'node:crypto';

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationEntity } from 'src/entities/application.entity';
import { Repository } from 'typeorm';

import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(ApplicationEntity)
    private readonly appRepository: Repository<ApplicationEntity>,
  ) {}
  async create(createApplicationDto: CreateApplicationDto) {
    try {
      Logger.log(createApplicationDto);
      const appId = randomUUID();

      const data = await this.appRepository.save({
        ...createApplicationDto,
        appId,
      });
      return {
        code: 200,
        message: 'Application created successfully',
        data: data,
      };
    } catch (error) {
      Logger.error(error);
      return {
        code: 500,
        message: 'Internal Server Error',
        error: error,
      };
    }
  }

  async findAll() {
    const [list, total] = await this.appRepository.findAndCount();
    return {
      code: 200,
      message: 'success',
      data: {
        list,
        total,
      },
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} application`;
  }

  update(id: number, updateApplicationDto: UpdateApplicationDto) {
    Logger.log(updateApplicationDto);
    return `This action updates a #${id} application`;
  }

  remove(id: number) {
    return `This action removes a #${id} application`;
  }
}
