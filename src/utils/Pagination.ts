import { Model } from 'mongoose';
import { IPagination } from '../interfaces/Pagination.interface';

export async function paginateModel<type>(
  model: Model<type>, 
  filters: object, 
  total: number,
  limit: number,
  page: number
): Promise<IPagination<type>> {
  try {
    const skip = (page - 1) * limit;
    const data = await model.find(filters).skip(skip).limit(limit);
    const totalCount = await model.countDocuments(filters);
    const totalPages = Math.ceil(totalCount / limit);
    const offsets = totalPages / page;

    return { data, total: totalCount, limit, offset: totalPages, offsets };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(`Error while paginating data: ${error.message}`);
  }
}

