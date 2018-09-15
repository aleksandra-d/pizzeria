import {IProduct} from '../interface/product';
import {Type} from '../enum/type';

export class Product implements IProduct {
  price: Number;
  id: any;
  type: Type;
  name?: String;
  description?: String;
}
