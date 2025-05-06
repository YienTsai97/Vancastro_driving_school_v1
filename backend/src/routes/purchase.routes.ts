import { Router } from 'express';
import purchaseController from '../controllers/purchase.controller';

export const purchaseRouter = Router();

purchaseRouter.get('/', purchaseController.getPurchases);
purchaseRouter.get('/:id', purchaseController.getPurchaseById);

purchaseRouter.post('/', purchaseController.createPurchase);
purchaseRouter.patch('/:id', purchaseController.updatePurchase);
purchaseRouter.patch('/item/:id', purchaseController.updatePurchaseItem);
purchaseRouter.delete('/:id', purchaseController.deletePurchase);
