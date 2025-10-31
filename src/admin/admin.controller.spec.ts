import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { QueryAdminService } from './services/query.admin.service';
import { CreateAdminService } from './services/create.admin.service';
import { UpdateAdminService } from './services/update.admin.service';

describe('AdminController', () => {
  let controller: AdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [QueryAdminService, CreateAdminService, UpdateAdminService],
    }).compile();

    controller = module.get<AdminController>(AdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
