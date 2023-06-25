import { extname } from 'path';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import {uploadsConstants} from "../../constants/uploads.constants";

export const multerOptions = {
    storage: diskStorage({
        destination: uploadsConstants.dest,
        filename: (req, file, cb) => {
            cb(null, `${uuid()}${extname(file.originalname)}`);
        }
    })
};