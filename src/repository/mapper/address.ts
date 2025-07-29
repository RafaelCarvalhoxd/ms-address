import { Address } from '../../entity/address';

export function addressMapper(row: any): Address {
  return new Address(
    row.id,
    row.user_id,
    row.zip,
    row.street_address,
    row.number,
    row.additional_information,
    row.reference,
    row.neighborhood,
    row.city,
    row.state
  );
}
