import { CartItems } from '@src/cart_items/cart_item.entity';

export class CreateCartDto {
    total: number;
    cartItems: CartItems[];
}
