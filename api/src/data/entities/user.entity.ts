import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Answer } from "./answer.entity";
import { Lazy } from ".";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    readonly id!: number;

    @Column({ nullable: false, unique: true })
    name!: string;

    @Column()
    passwordHash!: string;

    @Column()
    readonly salt!: string;

    @OneToMany(hasMany => Answer, answer => answer.user, { lazy: true, nullable: true })
    readonly answers?: Lazy<Answer[]>;
}
