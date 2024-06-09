import { Hono } from 'hono';
import { getAllComments, getCommentById, createComment, updateComment, deleteComment, getCommentsByRestaurant, getCommentsByUser } from './comment.controller';

export const commentRouter = new Hono();

// Get all comments      api/comments
commentRouter.get('/comments', getAllComments);
// Get a single comment   api/comments/1
commentRouter.get('/comments/:id', getCommentById);
// Get comments by restaurant id  api/comments/restaurant/1
commentRouter.get('/comments/restaurant/:restaurantId', getCommentsByRestaurant);
// Get comments by user id  api/comments/user/1
commentRouter.get('/comments/user/:userId', getCommentsByUser);
// Create a comment       api/comments
commentRouter.post('/comments', createComment);
// Update a comment       api/comments/1
commentRouter.put('/comments/:id', updateComment);
// Delete a comment       api/comments/1
commentRouter.delete('/comments/:id', deleteComment);
