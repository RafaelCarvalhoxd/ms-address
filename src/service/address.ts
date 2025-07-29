import { IAddressRepository } from '../interfaces/repository/address';
import { Address } from '../entity/address';

export class AddressService {
  constructor(private readonly addressRepository: IAddressRepository) {}

  async listByUser(userId: string): Promise<Address[]> {
    return this.addressRepository.findAllByUserId(userId);
  }
}
