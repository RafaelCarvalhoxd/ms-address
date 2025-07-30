import { z } from 'zod';

export const CreateAddressSchema = z.object({
  zip: z.string().regex(/^\d{5}-\d{3}$/, { message: 'CEP inválido' }),
  streetAddress: z.string().min(1),
  number: z.number().int().positive(),
  additionalInformation: z.string().optional(),
  reference: z.string().optional(),
  neighborhood: z.string().min(1),
  city: z.string().min(1),
  state: z.string().length(2)
});

export const UpdateAddressSchema = z.object({
  zip: z.string().regex(/^\d{5}-\d{3}$/, { message: 'CEP inválido' }).optional(),
  streetAddress: z.string().min(1).optional(),
  number: z.number().int().positive().optional(),
  additionalInformation: z.string().optional(),
  reference: z.string().optional(),
  neighborhood: z.string().min(1).optional(),
  city: z.string().min(1).optional(),
  state: z.string().length(2).optional(),
});

export const AddressIdSchema = z.object({
  id: z.string().uuid({ message: 'Id inválido' })
});

export const DeleteAddressSchema = AddressIdSchema;

export const FindAddressByIdSchema = AddressIdSchema;
