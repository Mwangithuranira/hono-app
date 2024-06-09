import { Hono } from 'hono';
import { getAllAddresses, getAddressById, createAddress, updateAddress, deleteAddress, getAddressByCity } from './address.controller';

export const addressRouter = new Hono();

// Get all addresses      api/addresses
addressRouter.get('/addresses', getAllAddresses);
// Get a single address  api/addresses/1
addressRouter.get('/addresses/:id', getAddressById);
// Search addresses by city  api/addresses/search/city
addressRouter.get('/addresses/search/:city', getAddressByCity);
// Create an address      api/addresses
addressRouter.post('/addresses', createAddress);
// Update an address      api/addresses/1
addressRouter.put('/addresses/:id', updateAddress);
// Delete an address      api/addresses/1
addressRouter.delete('/addresses/:id', deleteAddress);
