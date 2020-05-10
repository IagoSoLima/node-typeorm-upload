import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  id: string;
}
class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const transactionIdExist = await transactionsRepository.findOne({
      where: { id },
    });
    if (!transactionIdExist) {
      throw new AppError('Transaction id is not exist', 401);
    }

    await transactionsRepository.delete({ id });
  }
}

export default DeleteTransactionService;
