import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {
  updateUserAvatar,
  getCurrentUser,
} from '../controllers/userController.js';
import { upload } from '../middleware/multer.js';

const router = Router();

router.patch(
  '/api/users/me/avatar',
  authenticate,
  upload.single('avatar'),
  updateUserAvatar,
);

router.get('/api/users', authenticate, getCurrentUser);

export default router;
