import { MongoClient } from 'mongodb'
import { mongo } from '../../settings.json'

MongoClient.connect(mongo, function (err, db) {
    if (err) throw err;
    console.log("数据库已连接");
    const yocard = db.db('yocard')
    user(yocard)
    userAuth(yocard)
    db.close();
    console.log("数据库已关闭");
});

function user(yocard) {
    yocard.createCollection('user')
    yocard.collection('user').createIndex({
        openId: 1
    }, {
        unique: true
    })
    console.log("user已建立");
}

function userAuth(yocard) {
    yocard.createCollection('user_auth')
    yocard.collection('user_auth').createIndex({
        userId: 1
    }, {
        unique: true
    })
    console.log("user_auth已建立");
}