import { Model, Document } from "mongoose";
class AdminServices<T extends Document | any> {
  constructor(private Model: Model<T>) {
  }
  findAll = (critria = {}) => {
    return this.Model.find(critria)
  };
  findOne =(id:string)=>{
    return this.Model.findById(id);
  }
  delete = (id:string) => {
      return this.Model.findByIdAndDelete(id);
    };
}

export default AdminServices

