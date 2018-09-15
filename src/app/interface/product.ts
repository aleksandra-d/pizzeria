import {Type} from '../enum/type';

export interface IProduct {
  id: any;
  price: Number;
  type: Type;
  name?: String;
  description?: String;
}
