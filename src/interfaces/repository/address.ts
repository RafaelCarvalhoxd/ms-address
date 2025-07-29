import { Address } from '../../entity/address';

export interface IAddressRepository {
  findAllByUserId(userId: string): Promise<Address[]>;
}
