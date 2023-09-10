
import { model } from "mongoose"
import { Schema ,SchemaTypes} from "mongoose"
const orderProduct = new Schema({
    productName: { type: String,  index: true },
    price: { type: Number,  index: true },
   quantity: { type: Number, index: true},
   productId:{type:SchemaTypes.ObjectId,ref:"product"}

})
const order = new Schema({
    products:[orderProduct],
    totalAmount: { type: Number,  index: true ,default:0},
    collectedAmount: { type: Number,  index: true ,default:0},
   
   truckDriver:{type:SchemaTypes.ObjectId,ref:"truckDriver"},
   vendor:{type:SchemaTypes.ObjectId,ref:"vendor"},

    createdAt: { type: Date,default: Date.now() },

})

const orderSchema = model('order', order)

export default orderSchema