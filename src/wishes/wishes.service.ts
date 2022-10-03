import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>,
  ) {}

  create(offer: CreateWishDto): Promise<Wish> {
    return this.wishRepository.save(offer);
  }

  findAll(): Promise<Wish[]> {
    return this.wishRepository.find();
  }

  findOne(id: number): Promise<Wish> {
    return this.wishRepository.findOneBy({ id });
  }

  update(id: number, wish: UpdateWishDto) {
    return this.wishRepository.update({ id }, wish);
  }

  remove(id: number) {
    return this.wishRepository.delete({ id });
  }
}
