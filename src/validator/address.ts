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
