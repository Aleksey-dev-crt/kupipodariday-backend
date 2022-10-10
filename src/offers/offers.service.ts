import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { WishesService } from 'src/wishes/wishes.service';
import { Repository } from 'typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Offer } from './entities/offer.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
    private readonly wishesService: WishesService,
  ) {}

  async create(user: User, createOfferDto: CreateOfferDto): Promise<Offer> {
    const wish = await this.wishesService.findOne(createOfferDto.itemId);
    await this.wishesService.update(wish.id, {
      ...wish,
      raised: wish.raised + createOfferDto.amount,
    });
    if (wish.raised + createOfferDto.amount >= wish.price) {
      throw new BadRequestException('Сумма заявки больше чем осталось собрать');
    }
    if (user.id === wish.owner.id) {
      throw new BadRequestException('Нельзя скидываться на свои подарки');
    }

    return this.offerRepository.save({
      ...createOfferDto,
      user,
      item: wish,
    });
  }

  findAll(): Promise<Offer[]> {
    return this.offerRepository.find({
      relations: {
        item: true,
        user: true,
      },
    });
  }

  findOne(id: number): Promise<Offer> {
    return this.offerRepository.findOne({
      relations: {
        item: true,
        user: true,
      },
      where: { id },
    });
  }
}
