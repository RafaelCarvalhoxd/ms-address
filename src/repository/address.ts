import { eq } from 'drizzle-orm';
import { db } from '@/config/db/db';
import { address } from '@/config/db/schemas/address';
import { Address } from '../entity/address';
import { IAddressRepository } from '../interfaces/repository/address';
import { addressMapper } from './mapper/address';

export class AddressRepository implements IAddressRepository {
  async findAllByUserId(userId: string): Promise<Address[]> {
    const rows = await db
      .select()
      .from(address)
      .where(eq(address.userId, userId))
      .execute();

    return rows.map(addressMapper);
    
  }

  async findById(id: string): Promise<Address | null> {
    const rows = await db
      .select()
      .from(address)
      .where(eq(address.id, id))
      .execute();

    return rows.length > 0 ? addressMapper(rows[0]) : null;
  }

  async create(entity: Address): Promise<Address> {
    const [row] = await db.insert(address).values({
      id: entity.getId(),
      userId: entity.getUserId(),
      zip: entity.getZip(),
      streetAddress: entity.getStreetAddress(),
      number: entity.getNumber(),
      neighborhood: entity.getNeighborhood(),
      city: entity.getCity(),
      state: entity.getState(),
      additionalInformation: entity.getAdditionalInformation(),
      reference: entity.getReference(),
    }).returning().execute();

    return addressMapper(row);
  }

  async update(entity: Address): Promise<Address> {
    const [row] = await db
      .update(address)
      .set({
        zip: entity.getZip(),
        streetAddress: entity.getStreetAddress(),
        number: entity.getNumber(),
        neighborhood: entity.getNeighborhood(),
        city: entity.getCity(),
        state: entity.getState(),
        additionalInformation: entity.getAdditionalInformation(),
        reference: entity.getReference(),
      })
      .where(eq(address.id, entity.getId()))
      .returning()
      .execute();

    return addressMapper(row);
  }
}
