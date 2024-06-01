import { CustomerPayload } from './Customer.dto';
import { VandorPaylod } from './Vandor.dto';

export type AuthPaylod = VandorPaylod | CustomerPayload;