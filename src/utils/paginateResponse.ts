import { successCode } from './response';

export function paginateResponse(data: any, page: number, limit: number) {
  const [result, total] = data;
  const totalOfPages = Math.ceil(total / limit);

  successCode(
    { data: result, total: total, totalOfPages: totalOfPages },
    'Success',
  );
}
