import axios from 'axios'
import UUID from 'uuidjs'
import { Injectable } from '@nestjs/common'
import { Mongo } from '../_common/Mongo.service'
import _Config from '../../_config'

interface IWxSession {
    openid: string,
    session_key: string,
    unionid: string,
    errcode: number,
    errmsg: string,
}

@Injectable()
export class UserService {

    constructor(
        private readonly mongo: Mongo,
    ) { }

    async login(code: string) {
        const { openid } = await this.wxLogin(code);
        const userInfo = await this.findUser(openid);
        if (!userInfo) {
            const newUserInfo = await this.addUser(openid);
            return newUserInfo;
        }
        return userInfo;
    }

    async wxLogin(code: string): Promise<IWxSession> {
        const grant_type = 'authorization_code';
        const authLink = `https://api.weixin.qq.com/sns/jscode2session?appid=${_Config.appid}&secret=${_Config.secret}&js_code=${code}&grant_type=${grant_type}`;
        const res = await axios.get(authLink);
        const wxSession: IWxSession = res.data;
        if (wxSession.errcode > 0) {
            throw wxSession.errmsg;
        }
        return wxSession;
    }

    async findUser(openId: string) {
        const userCol = await this.mongo.getCol('user')
        const user = await userCol.findOne({ openId });
        return user;
    }

    async addUser(openId: string) {
        const userCol = await this.mongo.getCol('user')
        const userId: string = UUID.genV4().hexNoDelim;
        const _user = {
            openId,
            userId,
        }
        await userCol.insertOne(_user);
        const user = await userCol.findOne({ openId });
        return user;
    }

    async getUserInfo() {
        
    }

}
