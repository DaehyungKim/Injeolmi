import { Entity, PrimaryGeneratedColumn, 
  Column, CreateDateColumn, ManyToOne} from 'typeorm';
import { GuestBoard } from './GuestBoard';

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ type: 'text' })
    public url!: string;

    @Column()
    public fileName!: string;

    @CreateDateColumn()
    public createdAt!: Date;

    @ManyToOne(() => GuestBoard, guestBoard => guestBoard.image, { onDelete: 'CASCADE' })
    public guestBoard!: GuestBoard;

}