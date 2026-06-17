import multer from "multer";
import path from "path";
import fs from "fs";

// Create uploads directory if it doesn't exist
const uploadPath = "./public/temp";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}`;

    const extension = path.extname(file.originalname);

    cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|gif/;

  const mimeType = allowedTypes.test(file.mimetype);
  const extension = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (mimeType && extension) {
    return cb(null, true);
  }

  cb(new Error("Only image files are allowed"), false);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
}); 