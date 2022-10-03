import { Wishlist } from '../entities/wishlist.entity';

export type CreateWishlistDto = Omit<Wishlist, 'updatedAt'>;
