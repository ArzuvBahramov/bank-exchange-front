import {User} from "./user.model";
import {ExchangeRate} from "./exchange-rate.model";

export interface Conversion {
  id: number;
  from: ExchangeRate;
  to: ExchangeRate;
  fromValue: number;
  toValue: number;
  rateDate: string;
  user: User;
}
