import { Schema, model } from "mongoose"

const admin = new Schema({

    email: { type: String ,unique:true },
    username: { type: String, unique: true, index: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now()}

})
const adminSchema = model('admin', admin)

export default adminSchema