import { IAddressRepository } from '../interfaces/repository/address';
import { Address } from '../entity/address';
import { CreateAddressDto } from '@/dto/address';
import { randomUUID } from 'node:crypto';

export class AddressService {
  constructor(private readonly addressRepository: IAddressRepository) {}

  async listByUser(userId: string): Promise<Address[]> {
    return this.addressRepository.findAllByUserId(userId);
  }

  async create(dto: CreateAddressDto, userId: string): Promise<Address> {
    const address = new Address(
      randomUUID(),
      userId,
      dto.zip,
      dto.streetAddress,
      dto.number,
      dto.neighborhood,
      dto.city,
      dto.state,
      dto.additionalInformation,
      dto.reference
    );
    return this.addressRepository.create(address);
  }
}
