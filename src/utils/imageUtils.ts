import { readFile, unlinkSync } from 'fs';
import { diskStorage } from 'multer';

export const storage = diskStorage({
  destination: process.cwd() + '/public/img',
  filename: (req, file, cb) => cb(null, Date.now() + '_' + file.originalname),
});
