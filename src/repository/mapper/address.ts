import { Address } from '../../entity/address';

// Interface que representa os dados retornados pela query do banco
interface AddressRow {
  id: string;
  userId: string;
  zip: string;
  streetAddress: string;
  number: number;
  neighborhood: string;
  city: string;
  state: string;
  additionalInformation: string | null;
  reference: string | null;
}

export function addressMapper(row: AddressRow): Address {
  return new Address(
    row.id,
    row.userId,
    row.zip,
    row.streetAddress,
    row.number,
    row.neighborhood,
    row.city,
    row.state,
    row.additionalInformation || undefined,
    row.reference || undefined
  );
}
