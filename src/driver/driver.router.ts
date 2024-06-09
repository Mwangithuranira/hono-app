import { Hono } from 'hono';
import { getAllDrivers, getDriverById, createDriver, updateDriver, deleteDriver, getDriverByName } from './driver.controller';

export const driverRouter = new Hono();

// Get all drivers      api/drivers
driverRouter.get('/drivers', getAllDrivers);
// Get a single driver  api/drivers/1
driverRouter.get('/drivers/:id', getDriverById);
// Search drivers by name  api/drivers/search/name
driverRouter.get('/drivers/search/:name', getDriverByName);
// Create a driver      api/drivers
driverRouter.post('/drivers', createDriver);
// Update a driver      api/drivers/1
driverRouter.put('/drivers/:id', updateDriver);
// Delete a driver      api/drivers/1
driverRouter.delete('/drivers/:id', deleteDriver);
