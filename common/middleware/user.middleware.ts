import { Injectable, NestMiddleware, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'

@Injectable()
export class UserMiddleware implements NestMiddleware<any, any> {
    async use(@Req() req: Request, @Res() res: Response, next: Function) {
        
    }
}
