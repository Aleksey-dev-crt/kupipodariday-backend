import { Wish } from '../entities/wish.entity';

export type UpdateWishDto = Omit<Wish, 'id' | 'createdAt' | 'updatedAt'>;
