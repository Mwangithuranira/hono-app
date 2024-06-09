import { Hono } from 'hono';
import { getAllCities, getCityById, createCity, updateCity, deleteCity, getCityByName } from './city.controller';

export const cityRouter = new Hono();

// Get all cities      api/cities
cityRouter.get('/cities', getAllCities);
// Get a single city   api/cities/1
cityRouter.get('/cities/:id', getCityById);
// Search cities by name  api/cities/search/name
cityRouter.get('/cities/search/:name', getCityByName);
// Create a city       api/cities
cityRouter.post('/cities', createCity);
// Update a city       api/cities/1
cityRouter.put('/cities/:id', updateCity);
// Delete a city       api/cities/1
cityRouter.delete('/cities/:id', deleteCity);
