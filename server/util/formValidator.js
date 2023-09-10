
import joi from 'joi'


export default {

    adminRegisterValidator: (data) => {
        return new Promise(async (resolve, reject) => {
            const schema = joi.object({
                email: joi.string().min(3).max(30).email().required(),
                username: joi.string().min(3).max(30).required().pattern(new RegExp('^[a-zA-Z0-9.-]{1,30}$')).messages({
                    'string.min': 'Username should have at least 3 characters',
                    'string.max': 'Username should not have more than 30 characters',
                }),
                password: joi.string().min(8).required(),
                confirmPassword: joi.ref('password'),

            })
            const { error } = await schema.validate(data)
            if (error) {
                console.log('error in validation');

                reject(error.details[0].message)
            } else {
                resolve(true)

            }
        })

    },
    adminLoginValidator: (data) => {
        return new Promise(async (resolve, reject) => {
            const schema = joi.object({

                email: joi.string().min(3).max(30).email().required(),
                password: joi.string().min(8).required(),
               
            })
            const { error } = await schema.validate(data)
            if (error) {
                reject(error.details[0].message)
            } else {
                resolve(true)

            }
        })

    },
    truckDriverLoginValidator: (data) => {
        return new Promise(async (resolve, reject) => {
            const schema = joi.object({

                mobileNumber: joi.string().min(10).max(13).required().regex(/^[0-9]{10}$/) 
                .message('Mobile number must be a 10-digit number'),
                password: joi.string().min(8).required(),
               
            })
            const { error } =  schema.validate(data)
            if (error) {
                reject(error.details[0].message)
            } else {
                resolve(true)

            }
        })

    },
    createTruckDriverValidator: (data) => {
        return new Promise(async (resolve, reject) => {
            const schema = joi.object({
              
                address:joi.string().min(10).max(50).required(),
                mobileNumber: joi.string().min(10).max(13).required().regex(/^[0-9]{10}$/) 
                .message('Mobile number must be a 10-digit number'),
                name: joi.string().min(3).max(30).required().pattern(new RegExp('^[a-zA-Z0-9.-]{1,30}$')).messages({
                    'string.min': 'name should have at least 3 characters',
                    'string.max': 'name should not have more than 30 characters',
                }),
                password: joi.string().min(8).required(),
                drivingLicense:joi.allow()

            })
            const { error } = await schema.validate(data)
            if (error) {
                console.log('error in validation');

                reject(error.details[0].message)
            } else {
                resolve(true)

            }
        })

    },
    createVendorValidator: (data) => {
        return new Promise(async (resolve, reject) => {
            const schema = joi.object({
                location:joi.string().min(3).max(15).required(),
                address:joi.string().min(10).max(30).required(),
                mobileNumber: joi.string().min(10).max(13).required().regex(/^[0-9]{10}$/) 
                .message('Mobile number must be a 10-digit number'),
                name: joi.string().min(3).max(30).required().pattern(new RegExp('^[a-zA-Z0-9.-]{1,30}$')).messages({
                    'string.min': 'Name should have at least 3 characters',
                    'string.max': 'Name should not have more than 30 characters',
                }),
                email: joi.string().min(3).max(30).email().required(),
           

            })
            const { error } = await schema.validate(data)
            if (error) {
                console.log('error in validation');

                reject(error.details[0].message)
            } else {
                resolve(true)

            }
        })

    },
    updateVendorValidator: (data) => {
        return new Promise(async (resolve, reject) => {
            const schema = joi.object({
                id:joi.required(),
                location:joi.string().min(3).max(15),
                address:joi.string().min(10).max(30),
                mobileNumber: joi.string().min(10).max(13).regex(/^[0-9]{10}$/) 
                .message('Mobile number must be a 10-digit number'),
                name: joi.string().min(3).max(30).pattern(new RegExp('^[a-zA-Z0-9.-]{1,30}$')).messages({
                    'string.min': 'Name should have at least 3 characters',
                    'string.max': 'Name should not have more than 30 characters',
                }),
                email: joi.string().min(3).max(30).email(),
           

            })
            const { error } = await schema.validate(data)
            if (error) {
                console.log('error in validation');

                reject(error.details[0].message)
            } else {
                resolve(true)

            }
        })

    },
    updateTruckDriverValidator: (data) => {
        return new Promise(async (resolve, reject) => {
            const schema = joi.object({
                id: joi.required(),
                address:joi.string().min(10).max(50),
                mobileNumber: joi.string().min(10).max(10).regex(/^[0-9]{10}$/) 
                .message('Mobile number must be a 10-digit number'),
                name: joi.string().min(3).max(30).pattern(new RegExp('^[a-zA-Z0-9.-]{1,30}$')).messages({
                    'string.min': 'Username should have at least 3 characters',
                    'string.max': 'Username should not have more than 30 characters',
                }),
                password: joi.string().min(8),
                drivingLicense:joi.allow()

            })
            const { error } =  schema.validate(data)
            if (error) {
                console.log('error in validation');

                reject(error.details[0].message)
            } else {
                resolve(true)

            }
        })

    },



    createProductValidator: (data) => {
        return new Promise(async (resolve, reject) => {
            const schema = joi.object({
                image:joi.allow(),
                category:joi.string().min(1).max(30).required(),
                price: joi.number().min(1).required(),
                productName: joi.string().min(3).max(30).required().pattern(new RegExp('^[a-zA-Z0-9.-]{1,30}$')).messages({
                    'string.min': 'ProductName should have at least 3 characters',
                    'string.max': 'ProductName should not have more than 30 characters',
                }),
               
           

            })
            const { error } =  schema.validate(data)
            if (error) {
                console.log('error in validation');

                reject(error.details[0].message)
            } else {
                resolve(true)

            }
        })

    },
    createOrderValidator: (data) => {
        return new Promise(async (resolve, reject) => {
            let orderProduct = joi.object().keys({
                productName: joi.string().min(3).max(30).required().pattern(new RegExp('^[a-zA-Z0-9.-]{1,30}$')).messages({
                    'string.min': 'ProductName should have at least 3 characters',
                    'string.max': 'ProductName should not have more than 30 characters',
                }),
                price: joi.number().min(1).required(),
                quantity: joi.number().min(1).required(),
                productId:joi.string().required()

            })
            const schema = joi.object({
                products:joi.array().items(orderProduct),
                totalAmount: joi.number().min(1).required(),
                collectedAmount: joi.number().min(1).required(),
                truckDriver:joi.string().allow(),
                vendor:joi.string().required()
            })
            const { error } =  schema.validate(data)
            if (error) {
                console.log('error in validation');

                reject(error.details[0].message)
            } else {
                resolve(true)

            }
        })

    },
    updateProductValidator: (data) => {
        return new Promise(async (resolve, reject) => {
            const schema = joi.object({
                id:joi.string().allow(),
                image:joi.allow(),
                category:joi.string().min(1).max(30),
                price: joi.number().min(1),
                productName: joi.string().min(3).max(30).pattern(new RegExp('^[a-zA-Z0-9.-]{1,30}$')).messages({
                    'string.min': 'ProductName should have at least 3 characters',
                    'string.max': 'ProductName should not have more than 30 characters',
                }),
               
           

            })
            const { error } =  schema.validate(data)
            if (error) {
                console.log('error in validation');

                reject(error.details[0].message)
            } else {
                resolve(true)

            }
        })

    },
    


}