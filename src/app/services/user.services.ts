import { Model, Document } from "mongoose";
import { ModelHelpers } from "../utils/modelHelpers";

class UserServices<T extends Document | any> {
  private ModelHelpers: ModelHelpers<T>;

  constructor(private Model: Model<T>) {
    this.ModelHelpers = new ModelHelpers<T>(Model);
  }
  create = (data: any) => {
    return new this.Model(data).save();
  };

  findOne = (id: string) => {
    return this.Model.findById(id);
  };
  update = (id: string, data: any) => {
    return this.Model.findByIdAndUpdate(id, data, { new: true });
  };
  delete = (id: string) => {
    return this.Model.findByIdAndDelete(id);
  };

  async findAll(
    criteria: any = {},
    paginationOptions: {
      currentPage: number;
      perPage?: number;
    },
    sortOptions?: {
      sortBy: string;
      sortValue: 1 | -1;
    }
  ) {
    const totalItems = await this.Model.countDocuments(criteria);
    const totalPages = Math.ceil(totalItems / paginationOptions.perPage);
    const skipAmount =
      (paginationOptions.currentPage - 1) * paginationOptions.perPage;
    let query = this.Model.find(criteria);

    if (sortOptions) {
      query.sort({ [sortOptions.sortBy]: sortOptions.sortValue });
    }

    if (paginationOptions) {
      query.skip(skipAmount).limit(paginationOptions.perPage);
    }
    const data = await query.exec();

    return { data, totalItems, totalPages, ...paginationOptions };
  }
}

export default UserServices;

// paginate(criteria: any = {}, currentPage?: number, perPage?: number) {
//   return this.ModelHelpers.paginate(criteria, currentPage, perPage);
// }
// sort(criteria: any = {}, sortBy: string, sortValue: number) {
//   return this.ModelHelpers.sort(criteria, sortBy, sortValue);
// }
// paginateAndSort(
//   criteria: any = {},
//   currentPage?: number,
//   perPage?: number,
//   sortBy?: string,
//   sortValue?: number
// ) {
//   return this.ModelHelpers.paginateAndSort(criteria, {
//     currentPage,
//     perPage,
//     sortBy,
//     sortValue,
//   });
// }
