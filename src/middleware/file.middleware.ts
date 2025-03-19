import multer from 'multer';
import path from 'path';
import crypto from 'crypto'

// Настройка хранилища файлов
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../', 'assets', '/images')); // Путь к папке, где будут сохраняться файлы
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = crypto.randomBytes(3).toString('hex');
        cb(null, 'img' + uniqueSuffix + path.extname(file.originalname)); // Уникальное имя файла
    }
});

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../', 'assets', '/files')); // Путь к папке, где будут сохраняться файлы
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + crypto.randomBytes(3).toString('hex');
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Уникальное имя файла
    }
});

// Фильтрация файлов (по типу)
const imageFilter = (req: any, file: Express.Multer.File, cb: any) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Файл должен быть изображением'), false);
    }
};

const filesFilter = (req: any, file: Express.Multer.File, cb: any) => {
    const allowedTypes = [
        'application/pdf', 
        'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
    ];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Поддерживаются файлы формата .pdf, .doc, .docx, .txt'), false);
    }
};

// Инициализация multer
export const imageUpload = multer({ storage: imageStorage, fileFilter: imageFilter });
export const fileUpload = multer({ storage: fileStorage, fileFilter: filesFilter, limits: { fileSize: 24 * 1024 * 1024 } });

