import { Model } from 'mongoose';
import { IPagination } from '../interfaces/Pagination.interface';

export async function paginateModel<type>( 
  model: Model<type>, 
  filters: object, 
  page: number, 
  limit: number
): Promise<IPagination<type>> {
  const skip = (page - 1) * limit;
  try {
    const data = await model.find(filters).skip(skip).limit(limit);
    const total = await model.countDocuments(filters);
    const pages = Math.ceil(total / limit);
    return { data, total, page, pages };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(`Error while paginating data: ${error.message}`);
  }
}