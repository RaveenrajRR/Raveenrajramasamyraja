import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import { validate } from '../middleware/validate.js';
import { contactSchema } from '../validators/contact.js';
import { createContact } from '../controllers/contactController.js';
const router=Router();
const contactLimiter=rateLimit({windowMs:15*60*1000,limit:5,standardHeaders:true,legacyHeaders:false,message:{message:'Too many enquiries. Please try again later.'}});
router.post('/',contactLimiter,validate(contactSchema),createContact);
export default router;
