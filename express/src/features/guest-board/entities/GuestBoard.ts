import { Entity, PrimaryGeneratedColumn, 
  Column, CreateDateColumn, OneToMany,
  UpdateDateColumn, BeforeInsert} from 'typeorm';
import { Image } from './Image';
import * as bcrypt from 'bcrypt';

@Entity()
export class GuestBoard {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({nullable: true})
  public title!: string;

  @Column({ type: 'text'})
  public content!: string;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

  @Column()
  public password!: string;

  @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

  @Column()
  public author!: string;

  @OneToMany(() => Image, image => image.guestBoard, { cascade: true })
  public image!: Image[];
}