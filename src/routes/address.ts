import { Router } from 'express';
import { makeAddress } from '../factories/address';
import { CreateAddressSchema, UpdateAddressSchema } from '../validator/address';

const addressRoutes = Router();
const addressController = makeAddress();

addressRoutes.get('/', async (req, res, next) => {
  try {
    const result = await addressController.list();
    res.json(result);
  } catch (err) {
    next(err);
  }
});

addressRoutes.post('/', async (req, res, next) => {
  try {
    const validated = CreateAddressSchema.parse(req.body);
    const created = await addressController.create(validated);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

addressRoutes.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const validated = UpdateAddressSchema.parse(req.body);
    const updated = await addressController.update(id, validated);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

export default addressRoutes;
