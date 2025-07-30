import { AddressService } from '../service/address';
import { CreateAddressDto, UpdateAddressDto } from '@/dto/address';

export class AddressController {
  constructor(private readonly service: AddressService) {}

  list() {
    return this.service.listByUser('6cd3fb81-607b-4263-ae0b-8e2178d6a0f1');
  }

  findById(id: string) {
    return this.service.findById(id, '6cd3fb81-607b-4263-ae0b-8e2178d6a0f1');
  }

  create(dto: CreateAddressDto) {
    return this.service.create(dto, '6cd3fb81-607b-4263-ae0b-8e2178d6a0f1');
  }

  update(id: string, dto: UpdateAddressDto) {
    return this.service.update(id, dto, '6cd3fb81-607b-4263-ae0b-8e2178d6a0f1');
  }

  delete(id: string) {
    return this.service.delete(id, '6cd3fb81-607b-4263-ae0b-8e2178d6a0f1');
  }
}
