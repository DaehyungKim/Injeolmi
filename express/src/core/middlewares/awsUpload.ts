import multer from 'multer';
import multerS3 from 'multer-s3';
import s3Client from '../shared/utils/s3Client';
import { v7 as uuidv7 } from 'uuid';



// aws 클라우드 업로드

const awsUpload = (folderName: string) => {
    return multer({
        storage: multerS3({
            s3: s3Client,
            bucket: process.env.AWS_S3_BUCKET_NAME ?? "",
            contentType: multerS3.AUTO_CONTENT_TYPE,
            key: (req, file, cb) => {
                const ext = file.originalname.split('.').pop();
                const basename = uuidv7();
                const finalPath = `${folderName}/${basename}.${ext}`;
                
                cb(null, finalPath);
            },
        }),
    });
};


export default awsUpload;