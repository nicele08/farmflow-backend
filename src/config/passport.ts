import prisma from '../client';
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  VerifyCallback,
} from 'passport-jwt';
import Config from './global.config';

const jwtOptions = {
  secretOrKey: Config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify: VerifyCallback = async (payload, done) => {
  try {
    const user = await prisma.user.findUnique({
      select: {
        id: true,
        email: true,
        role: true,
      },
      where: { id: payload.sub },
    });
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

export const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);
