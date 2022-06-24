import {
  Column,
  Entity, JoinColumn, OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn, Unique
} from "typeorm";
import Player from "../../players/entities/player.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity('transfers')
@Unique(['player'])
class Transfer {
  @ApiProperty()
  @PrimaryColumn()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty()
  @Column()
  public price: number;

  @ApiProperty()
  @OneToOne(() => Player, { eager: true })
  @JoinColumn()
  public player: Player;
}

export default Transfer;
