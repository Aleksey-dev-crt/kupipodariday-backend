import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
  ) {}

  create(wishlist: CreateWishlistDto): Promise<Wishlist> {
    return this.wishlistRepository.save(wishlist);
  }

  findAll(): Promise<Wishlist[]> {
    return this.wishlistRepository.find();
  }

  findOne(id: number): Promise<Wishlist> {
    return this.wishlistRepository.findOneBy({ id });
  }

  update(id: number, wishlist: UpdateWishlistDto) {
    return this.wishlistRepository.update({ id }, wishlist);
  }

  remove(id: number) {
    return this.wishlistRepository.delete({ id });
  }
}
