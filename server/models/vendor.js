import { model } from "mongoose"
import { Schema } from "mongoose"

const vendor = new Schema({
    name: { type: String,  index: true ,unique: true},
    mobileNumber: { type: String,  index: true },
    address: { type: String },
    location: String,
    email: { type: String },
    createdAt: { type: Date,default: Date.now() },

})

const vendorSchema = model('vendor', vendor)

export default vendorSchema