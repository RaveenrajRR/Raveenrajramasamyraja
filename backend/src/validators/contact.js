import { z } from 'zod';
export const contactSchema=z.object({
  name:z.string().trim().min(2).max(100),
  email:z.string().trim().email().max(254),
  subject:z.string().trim().min(3).max(160),
  category:z.string().trim().min(2).max(80),
  budget:z.string().trim().max(80).optional().default(''),
  message:z.string().trim().min(10).max(5000)
});
