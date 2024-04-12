import {BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";

@Entity()
export class Message extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    sender: User;

    @ManyToOne(() => User)
    receiver: User;

    @Column()
    content: string;

    @CreateDateColumn()
    created_at: string;
}
