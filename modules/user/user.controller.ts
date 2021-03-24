import axios from 'axios'
import { Controller, Post, Body } from '@nestjs/common'
import { UserService } from './user.service'
import _Config from '../../_config'


@Controller('/user')
export class UserController {
    @Post('/login')
    async login(
        @Body('code') code: string,
    ) {
        const grant_type = 'authorization_code';
        const authLink = `https://api.weixin.qq.com/sns/jscode2session?appid=${_Config.appid}&secret=${_Config.secret}&js_code=${code}&grant_type=${grant_type}`;
        const res = await axios.get(authLink);
        console.log(res.data);
        return {};
    };
};
