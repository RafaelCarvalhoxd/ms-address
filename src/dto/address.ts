export type CreateAddressDto = {
    zip: string;
    streetAddress: string;
    number: number;
    additionalInformation?: string;
    reference?: string;
    neighborhood: string;
    city: string;
    state: string;
  };
  