import { IsUrl, Length } from 'class-validator';
import { Offer } from 'src/offers/entities/offer.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(1, 250)
  name: string;

  @Column()
  @Length(1, 1500)
  description: string;

  @Column()
  @IsUrl(undefined, { message: 'URL is not valid.' })
  image: string;

  @OneToMany(() => Offer, (offer) => offer.item)
  items: Offer[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
