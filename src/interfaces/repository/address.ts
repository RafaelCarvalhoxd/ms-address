import { Address } from '../../entity/address';

export interface IAddressRepository {
  findAllByUserId(userId: string): Promise<Address[]>;
  findById(id: string): Promise<Address | null>;
  create(address: Address): Promise<Address>;
  update(address: Address): Promise<Address>;
  delete(id: string): Promise<void>;
}
