import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column
} from "typeorm";
import User from "./User";

@Entity()
export default class Pet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  name: string;

  @Column("text")
  kind: Kind;

  @ManyToOne(() => User, user => user.postedPins)
  user: User;
}
