import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/variables.js";
import adminSchema from "../models/admin.js";



const userAuth = (token,authList) => {
    return new Promise((resolve, reject) => {
        try {

            console.log("tk", token);
            jwt.verify(token, JWT_SECRET, async (err, value) => {
                if (err) {
                    console.log(err.message);
                    reject('401: Authorization failed ,user cant be found')
                } else {
                    const admin = await adminSchema.findOne({ _id: value?.data?.uid }).lean()
                   

                    if (authList) {
                        console.log({value})
                        let isAuthorized = authList.some((d) => value?.data.role=== d)
                        console.log({ isAuthorized });
                        if (!isAuthorized) reject("You don't have permission to access this service")
                    }
                    

                    resolve({
                        uid: value.data?.uid ,
                        role: value?.data?.role,
                        
                    })

                    

                }
            });
        } catch (error) {
            reject(error )

        }
    })


}

export default userAuth