import { Model, Document } from 'mongoose';

export interface PaginateParams {
  limit: number;
  sort?: any;
  page: number;
  fields?: any;
  filter?: any;
  skipActive?: boolean;
}

export interface PaginateMeta {
  total: number;
  count: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
  lastPage: number;
}

export const PaginateModel = async <T extends Document>(
  model: Model<T>,
  params: PaginateParams,
): Promise<{ data: T[]; meta: PaginateMeta }> => {
  const { limit, sort, page, fields, filter, skipActive } = params;

  const query: any = filter;
  if (!skipActive) {
    query['deletedAt'] = null;
    query['active'] = true;
  }
  const findQuery = model.find(filter);

  findQuery.limit(limit).skip((page - 1) * limit);

  if (sort) findQuery.sort(sort);

  if (fields)
    findQuery
      .select(
        params.fields
          .filter((field) => !field.startsWith('-'))
          .reduce(function (result, item) {
            result[item] = 1;
            return result;
          }, {}),
      )
      .select(params.fields.filter((field) => field.startsWith('-')).join());

  const items = await findQuery.exec();

  const totalQuery = model.find(filter);

  const count = await totalQuery.countDocuments();

  const meta = PaginateMetaBuilder(items.length, count, page, limit);

  return { data: items, meta };
};

export const PaginateMetaBuilder = (
  total: number,
  count: number,
  page: number,
  limit: number,
): PaginateMeta => {
  const lastPage = Math.ceil(count / limit);
  const nextPage = page + 1 > lastPage ? null : page + 1;
  const prevPage = page - 1 < 1 ? null : page - 1;

  return {
    total,
    count,
    currentPage: page,
    nextPage,
    prevPage,
    lastPage,
  };
};
