import { Offer } from '../entities/offer.entity';

export type CreateOfferDto = Omit<Offer, 'updatedAt'>;
