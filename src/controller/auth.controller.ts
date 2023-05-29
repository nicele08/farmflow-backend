import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import { User } from '@prisma/client';
import authService from '../service/auth.service';
import tokenService from '../service/token.service';
import Config from '../config/global.config';

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(
    email,
    password,
  );
  const tokens = tokenService.generateToken(
    user.id,
    Config.jwt.accessExpirationMinutes,
  );
  res.status(httpStatus.OK).send({ user, tokens });
});

const resetPassword = catchAsync(async (req, res) => {
  const { newPassword } = req.body;
  const { id: userId } = req.user as User;
  await authService.resetPassword(userId, newPassword);
  res
    .status(httpStatus.OK)
    .send({ message: 'Password reset successfully' });
});

export default {
  login,
  resetPassword,
};
