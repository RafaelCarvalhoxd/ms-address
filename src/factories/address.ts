import { AddressRepository } from '../repository/address';
import { AddressService } from '../service/address';
import { AddressController } from '../controller/address';

export const makeAddress = () => {
  const repository = new AddressRepository();
  const service = new AddressService(repository);
  return new AddressController(service);
};
