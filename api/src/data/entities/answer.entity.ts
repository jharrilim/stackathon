import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { User } from "./user.entity";
import { Lazy } from ".";

@Entity()
export class Answer {

    @PrimaryGeneratedColumn()
    readonly id!: number;

    @ManyToOne(hasOne => User, { nullable: false, lazy: true })
    readonly user!: Lazy<User>;

    @Column({ nullable: false })
    readonly isYes!: boolean;
}
