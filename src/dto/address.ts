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

export type UpdateAddressDto = {
    zip?: string;
    streetAddress?: string;
    number?: number;
    additionalInformation?: string;
    reference?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
  };

export type FindByIdDto = {
    id: string;
  };

export type DeleteAddressDto = {
    id: string;
  };
  