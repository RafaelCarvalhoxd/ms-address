import { Router } from 'express';
import { makeAddress } from '../factories/address';

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

export default addressRoutes;
