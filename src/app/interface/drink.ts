import {Type} from '../enum/type';
import {State} from '../enum/state';

export interface Drink {

  id: any;
  name: String;
  price: Number;
  description: String;
  type: Type;
  state: State;
}
