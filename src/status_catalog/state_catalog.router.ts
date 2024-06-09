import { Hono } from 'hono';
import { StatusCatalogController } from './status_catalog.controller';
import { StatusCatalogService } from './status_catalog.service';

const statusCatalogService = new StatusCatalogService();
const statusCatalogController = new StatusCatalogController(statusCatalogService);

export const statusCatalogRouter = new Hono();

// Define routes
statusCatalogRouter.get('/status-catalogs', statusCatalogController.getAllStatusCatalogs.bind(statusCatalogController));
statusCatalogRouter.get('/status-catalogs/:id', statusCatalogController.getStatusCatalogById.bind(statusCatalogController));
statusCatalogRouter.post('/status-catalogs', statusCatalogController.createStatusCatalog.bind(statusCatalogController));
statusCatalogRouter.put('/status-catalogs/:id', statusCatalogController.updateStatusCatalog.bind(statusCatalogController));
statusCatalogRouter.delete('/status-catalogs/:id', statusCatalogController.deleteStatusCatalog.bind(statusCatalogController));
statusCatalogRouter.get('/status-catalogs/search/:name', statusCatalogController.getStatusCatalogByName.bind(statusCatalogController));
