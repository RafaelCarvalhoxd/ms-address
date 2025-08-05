import { Router } from 'express';
import { makeAddress } from '../factories/address';
import { CreateAddressSchema, UpdateAddressSchema, FindAddressByIdSchema, DeleteAddressSchema } from '../validator/address';
import { CreateAddressDto, UpdateAddressDto, FindByIdDto, DeleteAddressDto } from '../dto/address';

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
    const params = req.params as FindByIdDto;
    const validation = FindAddressByIdSchema.safeParse(params);
    
    if (!validation.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: validation.error.issues
      });
    }
    
    const result = await addressController.findById(validation.data);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

addressRoutes.post('/', async (req, res, next) => {
  try {
    const body = req.body as CreateAddressDto;
    const validation = CreateAddressSchema.safeParse(body);
    
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
    const { id } = req.params as FindByIdDto;
    const body = req.body as UpdateAddressDto;
    const validation = UpdateAddressSchema.safeParse(body);
    
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
    const params = req.params as DeleteAddressDto;
    const validation = DeleteAddressSchema.safeParse(params);
    
    if (!validation.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: validation.error.issues
      });
    }
    
    const result = await addressController.delete(validation.data);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

export default addressRoutes;
