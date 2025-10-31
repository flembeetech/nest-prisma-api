import { Test, TestingModule } from '@nestjs/testing';
import { QueryAdminService } from './services/query.admin.service';
import { CreateAdminService } from './services/create.admin.service';
import { UpdateAdminService } from './services/update.admin.service';
import { RemoveAdminService } from './services/remove.admin.service';

describe('AdminService', () => {
  let service: QueryAdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QueryAdminService,
        CreateAdminService,
        UpdateAdminService,
        RemoveAdminService,
      ],
    }).compile();

    service = module.get<QueryAdminService>(QueryAdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
