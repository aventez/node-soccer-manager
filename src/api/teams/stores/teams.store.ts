import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateTeamPayload } from "../interfaces/create-team-payload.interface";
import Team from "../entities/team.entity";
import { IEntityStore } from "../../../database/interfaces/entity-store.interface";

@Injectable()
export class TeamsStore implements IEntityStore<Team> {
  constructor(
    @InjectRepository(Team)
    private readonly teamsRepository: Repository<Team>,
  ) {}

  async findByIdOrFail(id: string): Promise<Team> {
    return await this.teamsRepository.findOneByOrFail({ id });
  }

  async findById(id: string): Promise<Team | null> {
    return await this.teamsRepository.findOneBy({ id });
  }

  async findByUserIdOrFail(userId: string): Promise<Team> {
    return await this.teamsRepository.findOneByOrFail({ user: { id: userId } });
  }

  async create(dto: CreateTeamPayload): Promise<Team> {
    return await this.teamsRepository.save(
      await this.teamsRepository.create(dto)
    );
  }

  async update(id: string, values: Record<string, any>): Promise<Team> {
    const result = await this.teamsRepository.createQueryBuilder()
      .update(Team)
      .set(values)
      .where('id = :id', { id })
      .returning('*')
      .execute();

    return result.raw[0];
  }
}