import {IOrder} from '../interface/IOrder';
import {IClientInfo} from '../interface/IClientInfo';
import {Product} from './Product';
import {OrderStatus} from '../enum/orderStatus';

export class Order implements IOrder {
  clientInfo: IClientInfo;
  id: any;
  products: Array<Product>;
  state: OrderStatus;
}
