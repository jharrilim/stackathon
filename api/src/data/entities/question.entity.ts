import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    readonly id!: number;

    @Column()
    readonly text!: string;
}
