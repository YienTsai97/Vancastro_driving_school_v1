import { AuthObject, clerkMiddleware } from '@clerk/express';
import { NextFunction, Request, Response, Router } from 'express';
import { contractRouter } from './contract.routes';
import { invoiceRouter } from './invoice.routes';
import { lessonRouter } from './lesson.routes';
import { lessonTypeRouter } from './lessonType.route';
import { payerRouter } from './payer.routes';
import { purchaseRouter } from './purchase.routes';
import { transactionRouter } from './transaction.routes';
import { travelTimeRouter } from './travelTime.routes';
import { userRouter } from './user.routes';

declare global {
  namespace Express {
    interface Request {
      auth: AuthObject;
    }
  }
}

export const protectedRouter = Router();

// middleware
protectedRouter.use(clerkMiddleware());

protectedRouter.use(async (req: Request, res: Response, next: NextFunction) => {
  // need to check if the user is validated
  const userId = req.auth.userId;

  if (!userId) {
    res.status(401).json({ success: false, message: 'Clerk Unauthorized' });
    return;
  }

  next();
});

// routes
protectedRouter.use('/users', userRouter);
protectedRouter.use('/invoices', invoiceRouter);
protectedRouter.use('/payers', payerRouter);
protectedRouter.use('/lessons', lessonRouter);
protectedRouter.use('/transactions', transactionRouter);
protectedRouter.use('/contracts', contractRouter);
protectedRouter.use('/lesson-types', lessonTypeRouter);
protectedRouter.use('/purchases', purchaseRouter);
protectedRouter.use('/travel-times', travelTimeRouter);
