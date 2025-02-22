const multer = require('multer');
const path = require('path');
const { ensureDirectoryExistence } = require('.');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = 'uploads/';

    // Choisir un sous-dossier selon le type de fichier ou la route
    if (file.fieldname === 'profilePicture') {
      uploadPath += 'profilePictures/';
    }

    // Vérifier et créer le dossier s'il n'existe pas
    ensureDirectoryExistence(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  },
});

const upload = multer({ storage });
module.exports = upload;
