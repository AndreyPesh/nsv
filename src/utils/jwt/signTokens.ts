// import config from 'config';
// // import { User } from '../entities/user.entity';
// // import { CreateUserInput } from '../schemas/user.schema';
// // import redisClient from '../utils/connectRedis';
// // import { AppDataSource } from '../utils/data-source';
// import { User } from '../../entities/user.entity';
// // import { signJwt } from '../utils/jwt';

// // (...)

// // ? Sign access and Refresh Tokens
// export const signTokens = async (user: User) => {
//   // 1. Create Session
//   redisClient.set(user.id, JSON.stringify(user), {
//     EX: config.get<number>('redisCacheExpiresIn') * 60,
//   });

//   // 2. Create Access and Refresh tokens
//   const access_token = signJwt({ sub: user.id }, 'accessTokenPrivateKey', {
//     expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
//   });

//   const refresh_token = signJwt({ sub: user.id }, 'refreshTokenPrivateKey', {
//     expiresIn: `${config.get<number>('refreshTokenExpiresIn')}m`,
//   });

//   return { access_token, refresh_token };
// };
