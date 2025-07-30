import { Address } from '../../entity/address';

export function addressMapper(row: any): Address {
  return new Address(
    row.id,
    row.userId,
    row.zip,
    row.streetAddress,
    row.number,
    row.neighborhood,
    row.city,
    row.state,
    row.additionalInformation,
    row.reference
  );
}
