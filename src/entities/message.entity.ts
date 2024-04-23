import {BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";
import {Room} from "./room.entity";

@Entity()
export class Message extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    sender: User;

    @ManyToOne(() => Room)
    @JoinTable()
    room: Room;

    @Column()
    content: string;

    @Column({
        default: 'text'
    })
    type: string;

    @CreateDateColumn()
    created_at: string;
}
