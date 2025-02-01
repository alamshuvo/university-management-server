import { v2 as cloudinary } from 'cloudinary';
import config from '../app/config';
import multer from 'multer';

   // Configuration
   cloudinary.config({ 
    cloud_name: config.cloudinary_cloud_name, 
    api_key: config.cloudinary_api_key, 
    api_secret:config.cloudinary_api_secret // Click 'View API Keys' above to copy your API secret
});

export const sendImageToCloudinary = async(path:"string",name:string)=>{
 
    return new Promise((resolve,reject)=>{
        // Upload an image
    cloudinary.uploader.upload(
            path, {
                public_id: name,
            },
            function(error,result){
                if (error) {
                    reject(error)
                }
                resolve(result)
            }
        )
      
    
    })
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, process.cwd()+'/uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  export const upload = multer({ storage: storage })