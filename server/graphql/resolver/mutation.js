import userAuth from "../../middleware/auth.js";
import adminSchema from "../../models/admin.js";
import orderSchema from "../../models/order.js";
import productSchema from "../../models/product.js";
import truckDriverSchema from "../../models/truckDriver.js";
import vendorSchema from "../../models/vendor.js";
import bcryptUtil from "../../util/bcryptUtil.js";
import formValidator from "../../util/formValidator.js";

export default {
  Mutation: {
    adminRegister: async (root, args) => {
      try {
        const validationResult = await formValidator.adminRegisterValidator(
          args
        );
        /// email and username existance
        const userExist = await adminSchema.exists({
          $or: [{ email: args.email }, { username: args.username }],
        });
        if (userExist) throw "This account already exists";
        const hashedPassword = await bcryptUtil.bcryptData(args.password);
        args.password = hashedPassword;
        delete args["confirmPassword"];
        console.log({ args });

        await new adminSchema(args).save();
        return {
          success: true,
          msg: "Account created successfully",
        };
      } catch (error) {
        if (error.code === 11000) {
          return {
            success: false,
            msg: `${Object.keys(error["keyValue"])} is Already exist`,
          };
        }
        return {
          success: false,
          msg: error.message ?? error,
        };
      }
    },
    createTruckDriver: async (root, args, { req, res }) => {
      try {
        console.log(req.headers["authorization"]);
        const auth = await userAuth(req.headers["authorization"], ["admin"]);
        const formValidation = await formValidator.createTruckDriverValidator(
          args
        );
        console.log({ auth, args });

        const userExist = await truckDriverSchema.exists({
          $or: [{ name: args.name }, { mobileNumber: args.mobileNumber }],
        });
        if (userExist) throw "This account already exists";
        const hashedPassword = await bcryptUtil.bcryptData(args.password);
        args.password = hashedPassword;
        console.log({ args });

        await new truckDriverSchema(args).save();
        return {
          success: true,
          msg: "new TruckDriver account created successfully",
        };
      } catch (error) {
        if (error.code === 11000) {
          return {
            success: false,
            msg: `${Object.keys(error["keyValue"])} is Already exist`,
          };
        }
        return {
          success: false,
          msg: error.message ?? error,
        };
      }
    },
    updateTruckDriver: async (root, args, { req, res }) => {
      try {
        console.log(req.headers["authorization"]);
        const auth = await userAuth(req.headers["authorization"], ["admin"]);
        const formValidation = await formValidator.updateTruckDriverValidator(
          args
        );
        console.log({ auth, args });

        const userExist = await truckDriverSchema.findOne({ _id: args.id });
        if (!userExist) throw "This account not exist";
        if (args.password) {
          const hashedPassword = await bcryptUtil.bcryptData(args.password);
          args.password = hashedPassword;
        }
        console.log({ args });
        delete args.id;
        await userExist.updateOne(args);
        return {
          success: true,
          msg: "new TruckDriver account updated successfully",
        };
      } catch (error) {
        console.log(error);
        if (error.code === 11000) {
          return {
            success: false,
            msg: `${Object.keys(error["keyValue"])} is Already exist`,
          };
        }
        return {
          success: false,
          msg: error.message ?? error,
        };
      }
    },
    deleteTruckDriverById: async (root, args, { req, res }) => {
      try {
        console.log(req.headers["authorization"]);
        const auth = await userAuth(req.headers["authorization"], ["admin"]);
        if (!args.id) throw "Id is required";
        console.log({ auth, args });

        const userExist = await truckDriverSchema.findOne({ _id: args.id });
        if (!userExist) throw "This account not exist";

        console.log({ args });

        await userExist.deleteOne();
        return {
          success: true,
          msg: " TruckDriver account deleted successfully",
        };
      } catch (error) {
        console.log(error);

        return {
          success: false,
          msg: error.message ?? error,
        };
      }
    },

    createVendor: async (root, args, { req, res }) => {
      try {
        console.log(req.headers["authorization"]);
        const auth = await userAuth(req.headers["authorization"], ["admin"]);
        const formValidation = await formValidator.createVendorValidator(args);
        console.log({ auth, args });

        await new vendorSchema(args).save();
        return {
          success: true,
          msg: "new vendor account created successfully",
        };
      } catch (error) {
        if (error.code === 11000) {
          return {
            success: false,
            msg: `This ${Object.keys(error["keyValue"])} is Already exist`,
          };
        }
        return {
          success: false,
          msg: error.message ?? error,
        };
      }
    },

    updateVendor: async (root, args, { req, res }) => {
      try {
        console.log(req.headers["authorization"]);
        const auth = await userAuth(req.headers["authorization"], ["admin"]);
        const formValidation = await formValidator.updateVendorValidator(args);
        console.log({ auth, args });

        let data = await vendorSchema.findOne({ _id: args.id });
        delete args.id;
        await await data.updateOne(args);
        return {
          success: true,
          msg: " vendor account updated successfully",
        };
      } catch (error) {
        if (error.code === 11000) {
          return {
            success: false,
            msg: `This ${Object.keys(error["keyValue"])} is Already exist`,
          };
        }
        return {
          success: false,
          msg: error.message ?? error,
        };
      }
    },

    deleteVendorById: async (root, args, { req, res }) => {
      try {
        console.log(req.headers["authorization"]);
        const auth = await userAuth(req.headers["authorization"], ["admin"]);
        if (!args.id) throw "Id is required";
        console.log({ auth, args });

        const exist = await vendorSchema.findOne({ _id: args.id });
        if (!exist) throw "This account not exist";

        console.log({ args });

        await exist.deleteOne();
        return {
          success: true,
          msg: " Vendor account deleted successfully",
        };
      } catch (error) {
        console.log(error);

        return {
          success: false,
          msg: error.message ?? error,
        };
      }
    },

    createProduct: async (root, args, { req, res }) => {
      try {
        console.log(req.headers["authorization"]);
        const auth = await userAuth(req.headers["authorization"], ["admin"]);
        const formValidation = await formValidator.createProductValidator(args);
        console.log({ auth, args });

        await new productSchema(args).save();
        return {
          success: true,
          msg: "new product created successfully",
        };
      } catch (error) {
        if (error.code === 11000) {
          return {
            success: false,
            msg: `This ${Object.keys(error["keyValue"])} is Already exist`,
          };
        }
        return {
          success: false,
          msg: error.message ?? error,
        };
      }
    },
    updateProduct: async (root, args, { req, res }) => {
        try {
            console.log(req.headers["authorization"]);
            const auth = await userAuth(req.headers["authorization"], ["admin"]);
            const formValidation = await formValidator.updateProductValidator(args);
            console.log({ auth, args });
    
            let data = await productSchema.findOne({ _id: args.id });
            delete args.id;
            await await data.updateOne(args);
            return {
              success: true,
              msg: " Product updated successfully",
            };
          } catch (error) {
            if (error.code === 11000) {
              return {
                success: false,
                msg: `This ${Object.keys(error["keyValue"])} is Already exist`,
              };
            }
            return {
              success: false,
              msg: error.message ?? error,
            };
          }
      },

      deleteProductById: async (root, args, { req, res }) => {
        try {
          console.log(req.headers["authorization"]);
          const auth = await userAuth(req.headers["authorization"], ["admin"]);
          if (!args.id) throw "Id is required";
          console.log({ auth, args });
  
          const exist = await productSchema.findOne({ _id: args.id });
          if (!exist) throw "This product not exist";
  
          console.log({ args });
  
          await exist.deleteOne();
          return {
            success: true,
            msg: " Product deleted successfully",
          };
        } catch (error) {
          console.log(error);
  
          return {
            success: false,
            msg: error.message ?? error,
          };
        }
      },
      createOrder: async (root, args, { req, res }) => {
        try {
          console.log(req.headers["authorization"]);
          const auth = await userAuth(req.headers["authorization"], ["admin","td"]);
          const formValidation = await formValidator.createOrderValidator(args);
          console.log({ auth, args });
  if(auth.role==="td")args.truckDriver=auth.uid
  
          await new orderSchema(args).save();
          return {
            success: true,
            msg: "new order created successfully",
          };
        } catch (error) {
          if (error.code === 11000) {
            return {
              success: false,
              msg: `This ${Object.keys(error["keyValue"])} is Already exist`,
            };
          }
          return {
            success: false,
            msg: error.message ?? error,
          };
        }
      },

  },
};
