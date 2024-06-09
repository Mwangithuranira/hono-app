import { Hono } from 'hono';
import { OrderController } from './orders.controller'; 
import { OrderService } from './orders.service'; 

const orderService = new OrderService(); 
const orderController = new OrderController(orderService);

export const orderRouter = new Hono(); // Create a new Hono router instance

// Define routes
orderRouter.get('/orders', orderController.getAllOrders.bind(orderController)); // Route to get all orders
orderRouter.get('/orders/:id', orderController.getOrderById.bind(orderController)); // Route to get an order by ID
orderRouter.post('/orders', orderController.createOrder.bind(orderController)); // Route to create an order
orderRouter.put('/orders/:id', orderController.updateOrder.bind(orderController)); // Route to update an order
orderRouter.delete('/orders/:id', orderController.deleteOrder.bind(orderController)); // Route to delete an order
orderRouter.get('/orders/search/:status', orderController.getOrderByStatus.bind(orderController)); // Route to search orders by status
