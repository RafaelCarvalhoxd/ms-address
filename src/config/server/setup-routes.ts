import { Router } from 'express';
import { healthCheck } from '../../routes/health-check';
import addressRoutes from '@/routes/address';

export const router = Router();

export function setupRoutes() {
  router.get('/', (req, res) => {
    res.send('Hello, World!');
  });

  router.get('/health', healthCheck);
  router.use('/address', addressRoutes);
  return router;
}
