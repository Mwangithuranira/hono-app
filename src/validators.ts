import { z } from 'zod'
import { Context } from 'hono';
import { ZodSchema } from 'zod';
import { AddressTable } from './drizzle/schema';

export const validate = (schema: ZodSchema) => {
  return async (c: Context, next: () => Promise<void>) => {
    try {
      const body = await c.req.json();
      schema.parse(body);
      c.req.addValidatedData = body; // Add validated data to request context
      await next();
    } catch (error) {
      return c.json({ error:error }, 400);
    }
  };
};


export const userSchema = z.object({
    fullname: z.string(),
    phone: z.string(),
    address: z.string(),
    score: z.number()
})

export const stateSchema = z.object(
  {
    
  }
)
// Path: src/address/address.controller.ts
