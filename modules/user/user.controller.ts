import { Controller, Post, Body } from '@nestjs/common'
import { UserService } from './user.service'


@Controller('/user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {};

    @Post('/login')
    async login(
        @Body('code') code: string,
    ) {
        const res = await this.userService.login(code);
        return res;
    };

    @Post('/setUserInfo')
    async setUserInfo(
        @Body('userId') userId: string,
        @Body('userInfo') userInfo: any,
    ) {
        const res = await this.userService.setUserInfo({ userId, userInfo });
        return res;
    }

    @Post('/getUserInfo')
    async getUserInfo(
        @Body('userId') userId: string,
    ) {
        const res = await this.userService.getUserInfo(userId);
        return res;
    }

};
