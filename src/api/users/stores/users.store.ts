import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import User from "../entities/user.entity";
import { Repository } from "typeorm";
import CreateUserPayload from "../interfaces/create-user-payload.interface";
import { IEntityStore } from "../../../database/interfaces/entity-store.interface";

@Injectable()
export class UsersStore implements IEntityStore<User> {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findByIdOrFail(id: string): Promise<User> {
    return await this.usersRepository.findOneByOrFail({ id });
  }

  async findById(id: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ id });
  }

  async create(payload: CreateUserPayload): Promise<User> {
    return await this.usersRepository.save(
      await this.usersRepository.create(payload)
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ email });
  }

  async findByEmailOrFail(email: string): Promise<User> {
    return await this.usersRepository.findOneByOrFail({ email });
  }
}