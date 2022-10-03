import { IsInt, IsNumber, IsUrl, Length } from 'class-validator';
import { Offer } from 'src/offers/entities/offer.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(1, 250)
  name: string;

  @Column()
  @IsUrl(undefined, { message: 'URL is not valid.' })
  link: string;

  @Column()
  @IsUrl(undefined, { message: 'URL is not valid.' })
  image: string;

  @Column()
  @IsNumber()
  price: number;

  @Column()
  @IsNumber()
  raised: number;

  @Column()
  owner: string;

  @Column()
  @Length(1, 1024)
  description: string;

  // массив ссылок на заявки скинуться от других пользователей
  @ManyToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];

  // содержит cчётчик тех, кто скопировал подарок себе. Целое десятичное число
  @Column()
  @IsInt()
  copied: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
