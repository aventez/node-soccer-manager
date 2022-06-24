import {
  Column,
  Entity, JoinColumn, OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn
} from "typeorm";
import Team from "../../teams/entities/team.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";

@Entity('users')
class User {
  @ApiProperty()
  @PrimaryColumn()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty()
  @Column({ unique: true })
  public email: string;

  @Exclude()
  @Column()
  public password: string;

  @Exclude()
  @OneToOne(() => Team, { eager: true })
  @JoinColumn()
  public team: Team;
}

export default User;
