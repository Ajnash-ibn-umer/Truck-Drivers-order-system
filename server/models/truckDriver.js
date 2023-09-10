import { Schema, model } from "mongoose"
const DrivingLicenseSchema = new Schema({

   
    name: { type: String, unique: true, index: true },
    LicenseNumber: { type: String, unique: true, index: true },
    validFrom: { type: Date },
    validTo: { type: Date},


})


   
const truckDriver = new Schema({

   
    name: { type: String, unique: true, index: true },
    mobileNumber: { type: String, unique: true, index: true },
    address: { type: String },
    drivingLicense: DrivingLicenseSchema,
    password: { type: String, required: true },
    createdAt: { type: Date,default: Date.now() },


})

const truckDriverSchema = model('truckDriver', truckDriver)

export default truckDriverSchema