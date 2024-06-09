import "dotenv/config";
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { userRouter } from "./users/user.router";

const app = new Hono()


//default route
app.get('/', (c) => {
  return c.text('Hello Hono!')
})


//custom route
app.route('/api',userRouter);  

console.log(`Server is running on port ${process.env.PORT}`)

serve({
  fetch: app.fetch,
  port:Number(process.env.PORT) || 3000
})


import { restaurantRouter } from './restaurant/restaurant.router'; //10
import { addressRouter } from './address/address.router';   //1
import { categoryRouter} from './category/category.router';  //2
import { cityRouter } from "./city/city.router";  //3
import { commentRouter } from "./comment/comment.router";  //4
import {stateRouter} from "./state/state.router";
import {driverRouter} from "./driver/driver.router";  //5
import {menuItemRouter} from "./menu_item/menu_item.router"; //6
import {orderRouter} from "./orders/orders.router";  //9
import {orderMenuItemRouter} from "./order_menu_item/order_menu_item.router";  //7
import {orderStatusRouter} from "./order_status/order_status.router";  //8
import {statusCatalogRouter} from "./status_catalog/state_catalog.router";
import {restaurantOwnerRouter} from "./restaurant_owner/restaurant_owner.router";

app.route('/api', restaurantRouter); //1
app.route('/api', userRouter);   //2
app.route('/api', addressRouter);  //3
app.route('/api', categoryRouter);  //4
app.route('/api', cityRouter);     //5
app.route('/api', commentRouter);  //6
app.route('/api', stateRouter);   //7
app.route('/api', driverRouter);   //8
app.route('/api', menuItemRouter);  //9
app.route('/api', orderRouter);    //10
app.route('/api', orderMenuItemRouter);  //11
app.route('/api', orderStatusRouter);   //12
app.route('/api', statusCatalogRouter);  //13
app.route('/api', restaurantOwnerRouter);   //14



// Use the appropriate method to start the server in Node.js
serve(app);



