import { AddressService } from '../service/address';
import { Address } from '../entity/address';

export class AddressController {
  constructor(private readonly service: AddressService) {}

  async list(): Promise<Address[]> {
    const userId = '6cd3fb81-607b-4263-ae0b-8e2178d6a0f1';
    return this.service.listByUser(userId);
  }
}
