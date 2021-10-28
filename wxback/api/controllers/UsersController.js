const alipaySdk=require('../db/alipay');
const AlipayFormData=require('alipay-sdk/lib/form').default;
module.exports = {

  
  addRecord:async function (req, res) {
    const json=req.allParams();
    const obj=await History.create(json).fetch()
    res.json(obj)
  },
  getRecord:async function (req, res) {
    const phone=req.query.phone;
    const arr=await History.find({phone})
    res.json(arr)
  },
  delHistory:async function (req, res) {
    const id=req.query.id;
    const phone=req.query.phone;
    const arr=await History.destroy({id,phone}).fetch()
    res.json(arr)
  },
  getIndexArt: async function (req, res) {
    let artType=req.query.artType
    let skip=req.query.start;
    let pageSize=req.query.pageSize;
    const arr1=await Arttype.find({artType}).sort("id desc").skip(skip).limit(pageSize);
    res.json(arr1);  
  },
  getArt: async function (req, res) {
    let artName=req.query.artName;
    let artId=req.query.artId;
    const arr1=await Article.find({artName,artId});
    res.json(arr1);  
  },
  getTopic: async function (req, res) {
    let artName=req.query.title;
    const obj=await Article.find({artName});
    res.json(obj)
  },
  collcation:async function (req, res) {
    let iscoll=req.query.iscoll
    let artName=req.query.artName
    let phone=req.query.phone
    const json=req.allParams();
    if(iscoll=='true'){
      const obj=await Collcation.create(json).fetch();
      res.json(obj)
    }else{
      const arr=await Collcation.destroy({artName,phone}).fetch();
      res.json(arr)
    }    
  },
  getcollection:async function (req, res) {
    let phone=req.query.phone
    const arr=await Collcation.find({phone})
    res.json(arr)
  },
  getAudioId: async function (req, res) {
    let id=req.query.id;
    const obj=await Audio.findOne({id});
    res.json(obj)
  },
  
  getAudioPrev: async function (req, res) {
    let id=req.query.id;
    let dataType=req.query.dataType;
    const obj=await Audio.find({id:{'<':id},dataType}).sort('id desc').limit(1);
    if(obj.length===0){
      res.json(false)
    }else res.json(obj)
  },
  
  getAudioNext: async function (req, res) {
    let id=req.query.id;
    let dataType=req.query.dataType;
    const obj=await Audio.find({id:{'>':id},dataType}).sort('id asc').limit(1);
    if(obj.length===0){
      res.json(false)
    }else res.json(obj)
  },
  
  mediaData:async function (req, res) {
    let type=req.query.type;
    let start=req.query.start;
    let num=req.query.num;
    if(type==="audio"){
          let arr=await Audio.find().sort('id asc').skip(start).limit(num)
          res.json(arr)
        }else{
          let arr=await Video.find().sort('id asc').skip(start).limit(10)
          res.json(arr)
    }
  },
  getAudio:async function (req, res) {
    let dataType=req.query.dataType;
    let skip=req.query.start;
    let pageSize=req.query.pageSize;
    const arr=await Audio.find({dataType}).skip(skip).limit(pageSize);
    res.json(arr)
  },
  getvideo:async function (req, res) {
    const arr=await Video.find();
    res.json(arr)
  },
  comment:async function (req, res) {
    const json=req.allParams();
    const temp=await Comment.create(json).fetch();
    res.json(temp)
  },
  getComment:async function (req, res) {
    const artId=req.query.artId;
    const artName=req.query.artName;
    const arr=await Comment.find({artId,artName}).sort('id desc');
    res.json(arr)
  },
  
  insertAudio: async function (req, res) {
    const arr=[];
    for(let i=1;i<=45;i++){
      let json={}
      json.title="《大话西游》第"+i+"集";
      json.url='https://cdn.leadinghr.cn/audio/jgj/jgj'+i+'.mp3';
      json.smSrc="images/"+"("+parseInt(Math.random()*28+1)+")"+'.jpg'
      json.dataType='four'
      arr.push(json)
    }
    const temp=await Audio.createEach(arr).fetch()
    res.json(temp)
  },
  insertvideo: async function (req, res) {
    const arr=[];
    for(let i=1;i<=34;i++){
      let json={}
      json.title="西游记"+i+"集";
      json.url='a.mp4';
      json.smSrc="images/"+"("+parseInt(Math.random()*30+1)+")"+'.jpg'
      json.dataType='one'
      arr.push(json)
    }
    const temp=await Video.createEach(arr).fetch()
    res.json(temp)
  },
  select: async function(req, res) {
    let keyword = req.query.keyword;
    let arr = await Arttype.find({ where: { title: { contains: keyword } } });
        res.json(arr)
},
searchaudio:async function(req, res) {
  let keyword = req.query.keyword;
  let arr = await Audio.find({ where: { title: { contains: keyword } } });
      res.json(arr)
},
insertuse:async function(req, res) {
  const json=req.allParams();
  const recod=await User.find({phone:{contains:json.phone}});
  if(recod==''){
    const arr=await User.create(json).fetch();
  res.json(arr)
  }else{
    res.json('false')
  }  
},
login:async function(req, res) {
  const obj=req.allParams();
  const phone=obj.phone;
  const password=obj.password;
  const arr=await User.find({phone:{contains:phone},password:{contains:password}});
  res.json(arr)
},
getuse:async function(req, res) {
  const phone=req.query.phone;  
  const arr=await User.find({phone:{contains:phone}});
  res.json(arr)
},
pay:async function (req, res) {
  let orderId=req.query.orderId
  let artName=req.query.artName
  let amount=req.query.amount
  const formData=new AlipayFormData()
  formData.setMethod('get');
  formData.addField('returnUrl',`http://localhost:8080/topic/${artName}`);
  formData.addField('bizContent',{
    outTradeNo:orderId,
    productCode:'FAST_INSTANT_TRADE_PAY',
    totalAmount:amount,
    subject:artName
  });
  const result=await alipaySdk.exec(
    'alipay.trade.page.pay',
    {},
    {formData}
  );
    res.json(result)
},
queryorder:async function (req, res) {
  let out_trade_no=req.query.out_trade_no
  let trade_no=req.query.trade_no
  const formData=new AlipayFormData();
  formData.setMethod('get');
  formData.addField('bizContent',{
    out_trade_no,
    trade_no
  });
  const result=await alipaySdk.exec(
    'alipay.trade.query',
    {},
    {formData}
  );
 res.json(result)
},
addstore:async function (req, res) {
  const obj=req.allParams();
  const arr=await Store.create(obj).fetch();
  res.json(arr)
},
getstore:async function (req, res) {
  let phone=req.query.phone
  const arr=await Store.find({phone})
  res.json(arr)
},
searchstore:async function (req, res) {
  let phone=req.query.phone
  let artName=req.query.artName
  const arr=await Store.find({phone,artName})
  res.json(arr)
}
};

