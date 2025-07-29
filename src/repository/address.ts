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
}
