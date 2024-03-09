// Paslon.ts
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Partai } from "./Partai";
import { Vote } from "./Vote";

@Entity()
export class Paslon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  no_urut: string;

  @Column({ type: "json" })
  vm: string[];

  @Column()
  image: string;

  @OneToMany(() => Partai, partai => partai.paslon)
  partai: Partai[];

  @OneToMany(() => Vote, (vote) => vote.paslon)
  vote: Vote[];

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}
