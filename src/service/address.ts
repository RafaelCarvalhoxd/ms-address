import { IAddressRepository } from '../interfaces/repository/address';
import { Address } from '../entity/address';
import { CreateAddressDto, UpdateAddressDto } from '@/dto/address';
import { NotFoundError, UnauthorizedError } from '@/config/errors/http-error';
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

  async update(id: string, dto: UpdateAddressDto, userId: string): Promise<Address> {
    const existingAddress = await this.addressRepository.findById(id);
    if (!existingAddress) {
      throw new NotFoundError('Address not found');
    }
    if (existingAddress.getUserId() !== userId) {
      throw new UnauthorizedError('Unauthorized to update this address');
    }

    const updatedAddress = new Address(
      id,
      userId,
      dto.zip ?? existingAddress.getZip(),
      dto.streetAddress ?? existingAddress.getStreetAddress(),
      dto.number ?? existingAddress.getNumber(),
      dto.neighborhood ?? existingAddress.getNeighborhood(),
      dto.city ?? existingAddress.getCity(),
      dto.state ?? existingAddress.getState(),
      dto.additionalInformation ?? existingAddress.getAdditionalInformation(),
      dto.reference ?? existingAddress.getReference()
    );
    return this.addressRepository.update(updatedAddress);
  }

  async delete(id: string, userId: string): Promise<void> {
    const existingAddress = await this.addressRepository.findById(id);
    if (!existingAddress) {
      throw new NotFoundError('Address not found');
    }
    if (existingAddress.getUserId() !== userId) {
      throw new UnauthorizedError('Unauthorized to delete this address');
    }

    await this.addressRepository.delete(id);
  }
}
