import userAuth from "../../middleware/auth.js";
import adminSchema from "../../models/admin.js";
import orderSchema from "../../models/order.js";
import productSchema from "../../models/product.js";
import truckDriverSchema from "../../models/truckDriver.js";
import vendorSchema from "../../models/vendor.js";
import bcryptUtil from "../../util/bcryptUtil.js";
import formValidator from "../../util/formValidator.js";
import { JWTsigning } from "../../util/jwtAuth.js";
import schema from "../schema.js";

export default {
 
  Query: {
    adminLogin: async (root, args, { req, res }) => {
      try {
        console.log({ args });
        const loginValidation = await formValidator.adminLoginValidator(args);
        const userExist = await adminSchema
          .findOne({ email: args.email })
          .lean();
        //check existance of user
        if (!userExist) throw "This Account is not existing";

        // check password
        let checkPassword = await bcryptUtil.bcryptCompare(
          args.password,
          userExist.password
        );
        console.log({ checkPassword });
        if (!checkPassword) throw "Password is incorrect";
        const token = await JWTsigning({
          email: userExist.email,
          username: userExist.username,
          uid:userExist._id,
          role:"admin"
        });

        return {
          success: true,
          msg: "logged successfully",
          token: `${token}`,
        };
      } catch (error) {
        return {
          success: false,
          msg: error.message ?? error,
        };
      }
    },
    truckDriverLogin: async (root, args, { req, res }) => {
      try {
        console.log({ args });
        const loginValidation = await formValidator.truckDriverLoginValidator(args);
        const userExist = await truckDriverSchema
          .findOne({ mobileNumber: args.mobileNumber })
          .lean();
        //check existance of user
        if (!userExist) throw "This Account is not existing";

        // check password
        let checkPassword = await bcryptUtil.bcryptCompare(
          args.password,
          userExist.password
        );
        console.log({ checkPassword });
        if (!checkPassword) throw "Password is incorrect";
        const token = await JWTsigning({
          mobileNumber: userExist.email,
          name: userExist.name,
          uid:userExist._id,
          role:"td"
        });

        return {
          success: true,
          msg: "logged successfully",
          token: `${token}`,
        };
      } catch (error) {
        return {
          success: false,
          msg: error.message ?? error,
        };
      }
    },
    readTruckDrivers:async (root, args, { req, res }) => {
      try {
         await userAuth(req.headers["authorization"], ["admin"]);
        
        const truckDrivers=await dataFetchList(truckDriverSchema,args.pageNumber,args.limit)
        console.log({truckDrivers})
        return {
          success: true,
          msg: "truckDrivers data loaded",
          truckDrivers:truckDrivers
        };
      } catch (error) {
        return {
          success: false,
          msg: error.message ?? error,
        };
      }
    },
    readTruckDriverById:async (root, args, { req, res }) => {
      try {
         await userAuth(req.headers["authorization"], ["admin"]);
         if(!args.id)throw("Id is required");
       
        const truckDriver=await await dataFetchById(truckDriverSchema,args.id)

        console.log({truckDriver})
        if(!truckDriver) throw("data not found")
        return {
          success: true,
          msg: "truckDriver data loaded",
          truckDriver
        };
      } catch (error) {
        return {
          success: false,
          msg: error.message ?? error,
        };
      }
    },
    readVendors:async (root, args, { req, res }) => {
      try {
         await userAuth(req.headers["authorization"], ["admin","td"]);
       
        const vendors=await dataFetchList(vendorSchema,args.pageNumber,args.limit)
        console.log({vendors})
        return {
          success: true,
          msg: "vendors data loaded",
          vendors
        };
      } catch (error) {
        return {
          success: false,
          msg: error.message ?? error,
        };
      }
    },
    readVendorById:async (root, args, { req, res }) => {
      try {
         await userAuth(req.headers["authorization"], ["admin","td"]);
         if(!args.id)throw("Id is required");
       
        const vendor=await await dataFetchById(vendorSchema,args.id)

        console.log({vendor})
        if(!vendor) throw("data not found")
        return {
          success: true,
          msg: "vendor data loaded",
          vendor
        };
      } catch (error) {
        return {
          success: false,
          msg: error.message ?? error,
        };
      }
    },


    readProducts:async (root, args, { req, res }) => {
      try {
        const auth=    await userAuth(req.headers["authorization"], ["admin","td"]);
        console.log({auth})
       const products=await dataFetchList(productSchema,args.pageNumber,args.limit)
       console.log({products})
        return {
          success: true,
          msg: "products data loaded",
          products
        };
      } catch (error) {
        return {
          success: false,
          msg: error.message ?? error,
        };
      }
    },
    readProductById:async (root, args, { req, res }) => {
      try {
       await userAuth(req.headers["authorization"], ["admin","td"]);
         if(!args.id)throw("Id is required");
       console.log(args.id)
       const product=await dataFetchById(productSchema,args.id)
        return {
          success: true,
          msg: "product data loaded",
          product
        };
      } catch (error) {
        return {
          success: false,
          msg: error.message ?? error,
        };
      }
    },
    readOrders:async (root, args, { req, res }) => {
      try {
       await userAuth(req.headers["authorization"], ["admin","td"]);
       
         const orders=await dataFetchList(orderSchema,args.pageNumber,args.limit,"vendor truckDriver products.productId")
         console.log({orders})
        return {
          success: true,
          msg: "orders data loaded",
          orders
        };
      } catch (error) {
        return {
          success: false,
          msg: error.message ?? error,
        };
      }
    },
  },
 
};


export const  dataFetchList=(schema,page=1,limit=10,population="")=>{

return new Promise(async(resolve,reject)=>{
  try {
  // set limit and pagenumber using inputs
    const count = (limit < 1 || limit ===null)? 1000 : limit;
    const skip = (page < 0 || page===null) ? 0 : (page - 1) * limit;
  
        const data=await schema.find().limit(count).skip(skip).populate(population).lean()
        console.log("schema ",{data})
        resolve(data)
  } catch (error) {
    reject(error)
  }
})
}
export const  dataFetchById=(schema,id)=>{

  return new Promise(async(resolve,reject)=>{
    try {
      
      const data=await schema.findOne({_id:id}).lean()

      if(!data) throw("data not found")
          console.log({data})
          resolve(data)
    } catch (error) {
      reject(error)
    }
  })
  }