import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/variables.js'

export const JWTsigning = (data, time="3d") => {
    return new Promise((resolve, reject) => {
        console.log('key:', JWT_SECRET);

        jwt.sign({
            data: data,
        }, JWT_SECRET, { expiresIn: time || "3d" }, (err, decoded) => {
            if (err) {
                console.error(err);

            } else {
                const token = decoded
                console.log('decoded', decoded);
                resolve(token)
            }
        })

    })

}
export const JWTverifyToken = ((token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (err, value) => {
            
            if (err) {
                console.log('error @ jwt',err.message);
                reject(err)
            } else {
                resolve(value)
            }
        });

    })
})
