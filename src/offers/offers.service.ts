import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Offer } from './entities/offer.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
  ) {}

  create(offer: CreateOfferDto): Promise<Offer> {
    return this.offerRepository.save(offer);
  }

  findAll(): Promise<Offer[]> {
    return this.offerRepository.find();
  }

  findOne(id: number): Promise<Offer> {
    return this.offerRepository.findOneBy({ id });
  }

  update(id: number, offer: UpdateOfferDto) {
    return this.offerRepository.update({ id }, offer);
  }

  remove(id: number) {
    return this.offerRepository.delete({ id });
  }
}
