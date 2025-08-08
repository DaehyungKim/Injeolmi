import multer from 'multer';
import { v7 as uuidv7 } from 'uuid';


const storage = multer.diskStorage({
  destination: 'public/uploads/guest-board/image/',
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    const basename = uuidv7();
    cb(null, `${basename}.${ext}`);
  }
});
export const upload = multer({ storage });