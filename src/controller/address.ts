import { AddressService } from '../service/address';
import {
  CreateAddressDto,
  UpdateAddressDto,
  FindByIdDto,
  DeleteAddressDto,
} from '@/dto/address';
import { Address } from '../entity/address';

export class AddressController {
  constructor(private readonly service: AddressService) {}

  async list(): Promise<Address[]> {
    return await this.service.listByUser('6cd3fb81-607b-4263-ae0b-8e2178d6a0f1');
  }

  async findById(dto: FindByIdDto): Promise<Address> {
    return await this.service.findById(dto.id, '6cd3fb81-607b-4263-ae0b-8e2178d6a0f1');
  }

  async create(dto: CreateAddressDto): Promise<Address> {
    return await this.service.create(
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

  async update(id: string, dto: UpdateAddressDto): Promise<Address> {
    return await this.service.update(
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

  async delete(dto: DeleteAddressDto): Promise<void> {
    return await this.service.delete(dto.id, '6cd3fb81-607b-4263-ae0b-8e2178d6a0f1');
  }
}
