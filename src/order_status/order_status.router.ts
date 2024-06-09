import { Hono } from 'hono';
import { OrderStatusController } from './order_status.controller';
import { OrderStatusService } from './order_status.service';

const orderStatusService = new OrderStatusService();
const orderStatusController = new OrderStatusController(orderStatusService);

export const orderStatusRouter = new Hono();

// Define routes
orderStatusRouter.get('/order-statuses', orderStatusController.getAllOrderStatuses.bind(orderStatusController));
orderStatusRouter.get('/order-statuses/:id', orderStatusController.getOrderStatusById.bind(orderStatusController));
orderStatusRouter.post('/order-statuses', orderStatusController.createOrderStatus.bind(orderStatusController));
orderStatusRouter.put('/order-statuses/:id', orderStatusController.updateOrderStatus.bind(orderStatusController));
orderStatusRouter.delete('/order-statuses/:id', orderStatusController.deleteOrderStatus.bind(orderStatusController));
orderStatusRouter.get('/order-statuses/search/:name', orderStatusController.getOrderStatusByName.bind(orderStatusController));
