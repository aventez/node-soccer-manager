import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import Player from "../entities/player.entity";
import CreatePlayerPayload from "../interfaces/create-player-payload.interface";
import { IEntityStore } from "../../../database/interfaces/entity-store.interface";

@Injectable()
export class PlayersStore implements IEntityStore<Player> {
  constructor(
    @InjectRepository(Player)
    private readonly playersRepository: Repository<Player>,
  ) {}

  async findByIdOrFail(id: string, loadRelations: boolean = false): Promise<Player> {
    return await this.playersRepository.findOneOrFail({
      where: { id },
      relations: loadRelations === true ? ['team', 'team.user'] : [],
    });
  }

  async findById(id: string): Promise<Player | null> {
    return await this.playersRepository.findOneBy({ id });
  }

  async create(dto: CreatePlayerPayload): Promise<Player> {
    return await this.playersRepository.save(
      await this.playersRepository.create(dto)
    );
  }

  async update(id: string, values: Record<string, any>): Promise<Player> {
    const result = await this.playersRepository.createQueryBuilder()
      .update(Player)
      .set(values)
      .where('id = :id', { id })
      .returning('*')
      .execute();

    return result.raw[0];
  }
}