import { model } from "mongoose"
import { Schema } from "mongoose"

const product = new Schema({
    productName: { type: String,  index: true ,unique: true},
    price: { type: Number,  index: true },
    category: { type: String , index: true},
    image: {
        imageName: { type: String},
        imageUrl: { type: String}
    },
    createdAt: { type: Date,default: Date.now() },

})

const productSchema = model('product', product)

export default productSchema