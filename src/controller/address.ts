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
    return this.service.create(
      '6cd3fb81-607b-4263-ae0b-8e2178d6a0f1',
      dto.zip,
      dto.streetAddress,
      dto.number,
      dto.neighborhood,
      dto.city,
      dto.state,
      dto.additionalInformation,
      dto.reference
    );
  }

  update(id: string, dto: UpdateAddressDto) {
    return this.service.update(
      id,
      dto.zip,
      dto.number,
      dto.neighborhood,
      dto.city,
      dto.state,
      dto.additionalInformation,
      '6cd3fb81-607b-4263-ae0b-8e2178d6a0f1',
      dto.reference,
      dto.streetAddress
    );
  }

  delete(id: string) {
    return this.service.delete(id, '6cd3fb81-607b-4263-ae0b-8e2178d6a0f1');
  }
}
