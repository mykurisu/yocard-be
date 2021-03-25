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
};
