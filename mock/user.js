/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/21
 * Time : 19:26
 */
const Mock=require('mockjs');

let db=Mock.mock({
  'data|8-10':[{
    id:'@id',
    name:'@name',
    'age|18-32':1
  }]
});

let data = Mock.mock({
  "user|10": [{   // 随机生成1到3个数组元素
    'id|+1': 12,    // 属性值自动加 1，初始值为88
    'name|1': '@cname',  // 中文名称
    'price|3000-9999' : 4000, // 价格
    'score|0-4.1':3,  // 评分
    'image|1': '@image(mock)',  // 图片
    'cputype|1' : ['i3','i5','i7'],  // cpu类型
    'city|1': '@ccity',  // 品牌
    'sales|200-10000' : 2222,  // 销售情况
  }]
});

module.exports={
  [`GET /api/users`](req,res){

    res.status(200).json(db);
  },

  [`GET /api/data`](req,res){

    res.status(200).json(data);
  },

  [`POST /api/users`](req,res){

    let user=req.body;
    console.log(req);
    user.id=Mock.mock('@id');
    db.data.push(user);

    res.status(200).json(user);
  }
}
