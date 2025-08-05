import { AddressRepository } from '../repository/address';
import { AddressService } from '../service/address';
import { AddressController } from '../controller/address';

export const makeAddress = () => {
  return new AddressController(
    new AddressService(
      new AddressRepository()
    )
  );
};
