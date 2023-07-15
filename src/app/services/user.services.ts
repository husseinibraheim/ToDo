import { Model, Document } from "mongoose";
class UserServices<T extends Document | any> {
  constructor(private Model: Model<T>) {
  }
  create = (data: any) => {
    return new this.Model(data).save();
  };
  findAll = (critria = {}) => {
    return this.Model.find(critria)
  };
  findOne =(id:string)=>{
    return this.Model.findById(id);
  }
  update = (id:string, data:any) => {
    return this.Model.findByIdAndUpdate(id, data, { new: true });
  };
  delete = (id:string) => {
      return this.Model.findByIdAndDelete(id);
    };
}

export default UserServices

