import {
  Column,
  Entity, JoinTable, ManyToOne, OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn
} from "typeorm";
import Team from "../../teams/entities/team.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import Transfer from "../../transfers/entities/transfer.entity";

@Entity('players')
class Player {
  @ApiProperty()
  @PrimaryColumn()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty()
  @Column()
  public firstName: string;

  @ApiProperty()
  @Column()
  public lastName: string;

  @ApiProperty()
  @Column()
  public position: string;

  @ApiProperty()
  @Column()
  public country: string;

  @ApiProperty()
  @Column()
  public age: number;

  @ApiProperty()
  @Column()
  public marketValue: number;

  @Exclude()
  @ManyToOne(() => Team, team => team.players)
  @JoinTable()
  public team: Team;
}

export default Player;