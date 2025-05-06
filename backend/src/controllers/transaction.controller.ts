import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

const getTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await prisma.transaction.findMany({});
    // Convert decimal to number
    const serializedTransactions = transactions.map((transaction) => ({
      ...transaction,
      amount: Number(transaction.amount),
      issueDate: transaction.issueDate.toISOString().split('T')[0], // Format date to "YYYY-MM-DD"
    }));
    res.status(200).json({ success: true, data: serializedTransactions });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const getTransactionById = async (req: Request, res: Response) => {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    if (!transaction) {
      res
        .status(404)
        .json({ success: false, message: 'Transaction not found' });
      return;
    }
    res.status(200).json({
      success: true,
      data: {
        ...transaction,
        amount: Number(transaction.amount),
        issueDate: transaction.issueDate.toISOString().split('T')[0], // Format date to "YYYY-MM-DD"
      },
    });
  } catch (error) {
    console.error('Error fetching transaction by id:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const createTransaction = async (req: Request, res: Response) => {
  try {
    const { invoiceId, amount, issueDate } = req.body;
    if (!invoiceId || !amount || !issueDate) {
      res
        .status(400)
        .json({ success: false, message: 'Missing required fields' });
      return;
    }

    const transaction = await prisma.transaction.create({
      data: {
        invoiceId,
        amount,
        issueDate: new Date(issueDate), // Convert string to date
      },
    });

    res.status(201).json({
      success: true,
      data: {
        ...transaction,
        amount: Number(transaction.amount),
        issueDate: transaction.issueDate.toISOString().split('T')[0], // Format date to "YYYY-MM-DD"
      },
    });
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const editTransaction = async (req: Request, res: Response) => {
  try {
    const { amount, issueDate } = req.body;
    const transaction = await prisma.transaction.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        amount,
        issueDate: issueDate && new Date(issueDate), // Convert string to date
      },
    });
    if (!transaction) {
      res
        .status(404)
        .json({ success: false, message: 'Transaction not found' });
      return;
    }
    res.status(200).json({
      success: true,
      data: {
        ...transaction,
        amount: Number(transaction.amount),
        issueDate: transaction.issueDate.toISOString().split('T')[0], // Format date to "YYYY-MM-DD"
      },
    });
  } catch (error) {
    console.error('Error editing transaction:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = await prisma.transaction.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    if (!transaction) {
      res
        .status(404)
        .json({ success: false, message: 'Transaction not found' });
      return;
    }
    res.status(200).json({ success: true, data: transaction.id });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export default {
  getTransactions,
  getTransactionById,
  createTransaction,
  editTransaction,
  deleteTransaction,
};
