
import { join, extname, parse } from "path"

const fileUpload = async (req, res) => {
    try {
     
        console.log("body",req.body);
        console.log('file', req.files);

        console.log("request", req?.files?.length)
        let errorMessages= []
       
     
   
    
        if (!req.files || Object.keys(req.files).length === 0) {
            errorMessages.push("file(s) not given")
        }
        if (errorMessages.length > 0) {
            res.json({ success: false, msg: errorMessages.toString() })
            return
        }

           
            const fileReference = req?.files.file;
            if (!fileReference) {
                res.json({ success: false, msg: "file reference mismatch" })
                return
            }
           
            let fileName = parse(fileReference.name).name
            fileName = `${fileName}-${Date.now()}`
           
            const ext = extname(fileReference.name);
           
            const uploadPath = join("file-uploads",  `${fileName}${ext}`)
           console.log({uploadPath})
            const fileMove = fileReference.mv(uploadPath)
            return fileMove.then(() => {
                console.log(" file upload");
                
               
                res.json({ success: true, msg: "file uploaded", imgUrl: uploadPath })

            }).catch(() => {
                res.json({ success: false, msg: "file not uploaded" })
            })
        
        
    }
    catch (err) {
        console.log(err)
        res.json({ success: false, msg: "some error occured" })
    }

}
export default fileUpload
