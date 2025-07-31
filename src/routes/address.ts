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

addressRoutes.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await addressController.findById({ id });
    res.json(result);
  } catch (err) {
    next(err);
  }
});

addressRoutes.post('/', async (req, res, next) => {
  try {
    const validation = CreateAddressSchema.safeParse(req.body);
    
    if (!validation.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: validation.error.issues
      });
    }
    
    const created = await addressController.create(validation.data);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

addressRoutes.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const validation = UpdateAddressSchema.safeParse(req.body);
    
    if (!validation.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: validation.error.issues
      });
    }
    
    const updated = await addressController.update(id, validation.data);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

addressRoutes.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await addressController.delete({ id });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

export default addressRoutes;
