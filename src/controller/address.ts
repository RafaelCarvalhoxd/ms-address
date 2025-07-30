import { AddressService } from '../service/address';
import { CreateAddressDto } from '@/dto/address';

export class AddressController {
  constructor(private readonly service: AddressService) {}

  list() {
    return this.service.listByUser('6cd3fb81-607b-4263-ae0b-8e2178d6a0f1');
  }

  create(dto: CreateAddressDto) {
    return this.service.create(dto, '6cd3fb81-607b-4263-ae0b-8e2178d6a0f1');
  }
}
