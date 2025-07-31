import { IAddressRepository } from '../interfaces/repository/address';
import { Address } from '../entity/address';
import { NotFoundError, UnauthorizedError } from '@/config/errors/http-error';

export class AddressService {
  constructor(private readonly addressRepository: IAddressRepository) {}

  async listByUser(userId: string): Promise<Address[]> {
    return this.addressRepository.findAllByUserId(userId);
  }

  async findById(id: string, userId: string): Promise<Address> {
    const address = await this.addressRepository.findById(id);
    if (!address) {
      throw new NotFoundError('Address not found');
    }
    if (address.getUserId() !== userId) {
      throw new UnauthorizedError('Unauthorized to access this address');
    }
    return address;
  }

  async create(
    userId: string,
    zip: string,
    streetAddress: string,
    number: number,
    neighborhood: string,
    city: string,
    state: string,
    additionalInformation?: string | undefined,
    reference?: string | undefined 
    
  ): Promise<Address> {
    const address = new Address(
      null,
      userId,
      zip,
      streetAddress,
      number,
      neighborhood,
      city,
      state,
      additionalInformation,
      reference
    );
    return this.addressRepository.create(address);
  }

  async update(
    id: string,
    zip: string | undefined,
    number: number | undefined,
    neighborhood: string | undefined,
    city: string | undefined,
    state: string | undefined,
    additionalInformation: string | undefined,
    userId: string,
    reference?: string | undefined,
    streetAddress?: string | undefined
  ): Promise<Address> {
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
      zip ?? existingAddress.getZip(),
      streetAddress ?? existingAddress.getStreetAddress(),
      number ?? existingAddress.getNumber(),
      neighborhood ?? existingAddress.getNeighborhood(),
      city ?? existingAddress.getCity(),
      state ?? existingAddress.getState(),
      additionalInformation ?? existingAddress.getAdditionalInformation(),
      reference ?? existingAddress.getReference()
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
