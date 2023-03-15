import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { RealEstate } from "./realEstate.entity";
import { User } from "./user.entity";

@Entity("schedules_users_properties")
class Schedule {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "date" })
  date: Date | string;

  @Column({ type: "time" })
  hour: Date | string;

  @ManyToOne(() => User, (users) => users.realEstates)
  user: User;

  @ManyToOne(() => RealEstate, (realEstates) => realEstates.schedules)
  realEstate: RealEstate;
}

export { Schedule };
