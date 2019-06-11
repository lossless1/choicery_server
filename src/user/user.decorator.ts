import { createParamDecorator } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '../config/config.service';

export const User = createParamDecorator((data, req) => {

    // if route is protected, there is a user set in auth.middleware
    if (!!req.user) {
        return !!data ? req.user[data] : req.user;
    }

    // in case a route is not protected, we still want to get the optional auth user from jwt
    const token = req.headers.authorization ? (req.headers.authorization as string).split(' ') : null;
    console.log(ConfigService.getInstance().get('SECRET'));

    if (token && token[1]) {
        console.log(ConfigService.getInstance().get('SECRET'));
        const decoded: any = jwt.verify(token[1], ConfigService.getInstance().get('SECRET'));
        return !!data ? decoded[data] : decoded.user;
    }
});
