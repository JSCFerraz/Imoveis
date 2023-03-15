import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { RealEstate } from "./realEstate.entity";

@Entity("categories")
class Category {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 45, unique: true })
  name: string;

  @OneToMany(() => RealEstate, (realEst) => realEst.category)
  realEstate: Array<RealEstate>;
}

export { Category };
