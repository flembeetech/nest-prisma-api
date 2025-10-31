import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { QueryUserService } from './services/query.user.service';
import { CreateUserService } from './services/create.user.service';
import { UpdateUserService } from './services/update.user.service';
import { RemoveUserService } from './services/remove.user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        QueryUserService,
        CreateUserService,
        UpdateUserService,
        RemoveUserService,
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
