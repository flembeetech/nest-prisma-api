import { Test, TestingModule } from '@nestjs/testing';
import { QueryUserService } from './services/query.user.service';
import { CreateUserService } from './services/create.user.service';
import { UpdateUserService } from './services/update.user.service';
import { RemoveUserService } from './services/remove.user.service';

describe('UserService', () => {
  let service: QueryUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QueryUserService,
        CreateUserService,
        UpdateUserService,
        RemoveUserService,
      ],
    }).compile();

    service = module.get<QueryUserService>(QueryUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
