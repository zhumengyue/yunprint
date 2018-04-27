/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/21
 * Time : 19:26
 */
const Mock=require('mockjs');

let mylist=Mock.mock({
  'data|8-10':[{
    'id|+1': 1,
    name:'@cname',
    filename: '@cword(8,14)',
    createtime: '@datetime',
    'status|1': [0,1],
  }]
});

let alllist = Mock.mock({
  'data|20-30':[{
    'id|+1': 1,
    name:'@cname',
    filename: '@cword(8,14)',
    createtime: '@datetime',
    status: 1,
  }]
});

module.exports={
  [`GET /api/mylist`](req,res){

    res.status(200).json(mylist);
  },

  [`GET /api/alllist`](req,res){

    res.status(200).json(alllist);
  },

  [`POST /api/users`](req,res){

    let user=req.body;
    console.log(req);
    user.id=Mock.mock('@id');
    mylist.data.push(user);

    res.status(200).json(user);
  }
}
