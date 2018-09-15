import {Product} from '../models/Product';
import {IClientInfo} from './IClientInfo';
import {OrderStatus} from '../enum/orderStatus';

export interface IOrder {
  id: any;
  products: Array<Product>;
  state: OrderStatus;
  clientInfo: IClientInfo;
}
