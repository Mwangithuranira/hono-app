import { Hono } from 'hono';
import { StateController } from './state.controller';
import { StateService } from './state.service';

const stateService = new StateService();
const stateController = new StateController(stateService);

export const stateRouter = new Hono();

// Define routes
stateRouter.get('/states', stateController.getAllStates.bind(stateController));
stateRouter.get('/states/:id', stateController.getStateById.bind(stateController));
stateRouter.post('/states', stateController.createState.bind(stateController));
stateRouter.put('/states/:id', stateController.updateState.bind(stateController));
stateRouter.delete('/states/:id', stateController.deleteState.bind(stateController));
stateRouter.get('/states/search/:name', stateController.getStateByName.bind(stateController));
