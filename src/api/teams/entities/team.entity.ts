import {
  AfterInsert,
  AfterLoad, AfterUpdate,
  Column,
  Entity, JoinColumn, OneToMany, OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn
} from "typeorm";
import User from "../../users/entities/user.entity";
import Player from "../../players/entities/player.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsNumber } from "class-validator";

@Entity('teams')
class Team {
  @ApiProperty()
  @PrimaryColumn()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty()
  @Column()
  public name: string;

  @ApiProperty()
  @Column()
  public country: string;

  @ApiProperty()
  @Column()
  public budget: number;

  @Exclude()
  @OneToOne(() => User, user => user.team)
  public user: User;

  @ApiProperty({ type: [Player] })
  @OneToMany(() => Player, player => player.team, { eager: true })
  @JoinColumn()
  public players: Player[];

  @ApiProperty()
  public value: number;

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  calculateValue(): void {
    this.value = this.players?.reduce((sum, player) => sum + player.marketValue, 0);
  }
}

export default Team;
