import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IEntityStore } from "../../../database/interfaces/entity-store.interface";
import Transfer from "../entities/transfer.entity";
import CreateTransferPayload from "../interfaces/create-transfer-payload.interface";

@Injectable()
export class TransfersStore implements IEntityStore<Transfer> {
  constructor(
    @InjectRepository(Transfer)
    private readonly transfersRepository: Repository<Transfer>,
  ) {}

  async findAll(): Promise<Transfer[]> {
    return await this.transfersRepository.find();
  }

  async findByIdOrFail(id: string, loadRelations: boolean = false): Promise<Transfer> {
    return await this.transfersRepository.findOneOrFail({
      where: { id },
      relations: loadRelations === true ? ['player', 'player.team'] : [],
    });
  }

  async findById(id: string): Promise<Transfer | null> {
    return await this.transfersRepository.findOneBy({ id });
  }

  async findByPlayerIdOrFail(playerId: string): Promise<Transfer> {
    return await this.transfersRepository.findOneByOrFail( { player: { id: playerId } });
  }

  async create(payload: CreateTransferPayload): Promise<Transfer> {
    return await this.transfersRepository.save(
      await this.transfersRepository.create(payload)
    );
  }
}