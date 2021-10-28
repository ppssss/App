
function changeTime(t) {
  let d = new Date(t);
  //return d.toLocalDataString()
  let year = d.getFullYear();
  let month = d.getMonth() + 1;
  let day = d.getDate();
  return year + '-' + month + '-' + day;
}

module.exports = {
  index: function(req, res) {
      res.view({ layout: false });
  },
 
  addVideo: async function(req, res) {
      req.file('image').upload({
              dirname: require('path').resolve(sails.config.appPath, 'assets/upload')
          },
          async function(err, files) {
              if (err)
                  return res.serverError(err);
              if (files.length === 0)
                  return res.json(false);
              let path = files[0].fd.split('\\');
              path = path[path.length - 1];
              let json = req.allParams();
              json.imgSrc = path;
              let row = await Video.create(json).fetch();
              res.json(row);
          });
  },
  addArtType:async function(req, res) {
    req.file('image').upload({
        dirname: require('path').resolve(sails.config.appPath, 'assets/artTypeImg')
    },
    async function(err, files) {
        if (err)
            return res.serverError(err);
        if (files.length === 0)
            return res.json(false);
        let path = files[0].fd.split('\\');
        path = path[path.length - 1];
        let json = req.allParams();
        json.imgSrc = path;
        let row = await Arttype.create(json).fetch();
        res.json(row);
    });
  },
  getArt:async function(req, res) {
      let obj=await Arttype.find()
      res.json(obj)
  },
  addArticle: async function(req, res) {
    req.file('smallSrc').upload({
            dirname: require('path').resolve(sails.config.appPath, 'assets/smallSrc')
        },
        async function(err, files) {
            if (err)
                return res.serverError(err);
            if (files.length === 0)
                return res.json(false);
            let path = files[0].fd.split('\\');
            path = path[path.length - 1];
            let json=req.allParams();
            json.smSrc=path;
            let artName=json.artName
            let arr=await Article.find({artName}).sort('artId desc')
            if(arr==''){
               json.artId=1
            }else{
                json.artId=arr[0].artId-0+1 
            }
            
            let row = await Article.create(json).fetch();
            res.json(row);
        });
},
   newImg: function(req, res) {
      req.file('smallSrc').upload({
              dirname: require('path').resolve(sails.config.appPath, 'assets/upload')
          },
          function(err, files) {
              if (err)
                  return res.serverError(err);
              if (files.length === 0)
                  return res.json(false);
              let arr = files[0].fd.split('\\');
              let fileName = arr[arr.length - 1];
              res.json(fileName);
          });
  },

  delVideo: async function(req, res) {
    let id = req.query.id;
    let dataType=req.session.dataType;
    try {
        let row = await Video.destroy({ id }).fetch();
        let count1 = await Video.count({dataType});
        res.json(count1)  
    } catch (error) {
        res.json(false)
    }
},  
getvideo: async function(req, res) {    
    let title=req.query.title;
    console.log(title);
    let pageNum = req.query.pageNum;
    let arr = await Video.find({title}).sort('id asc').skip(pageNum * 5).limit(5);
    let num = await Video.count();
    res.json({ arr, num })
},
select: async function(req, res) {
    let title = req.query.title;
    let artName = req.query.artName;
    console.log(artName);
    console.log(title);
    let arr = await Article.find({ title,artName }).sort('id desc').limit(5);
    arr = arr.map(el => {
        el.date = changeTime(el.updatedAt);
        return el
    })
    res.json(arr)
},
selectId: async function(req, res) {
    let id = req.query.id;
    let obj = await Article.findOne({ id });
    res.json(obj)
},
changeNew: async function(req, res) {
    let id = req.body.id;
    let title = req.body.title;
    let content = req.body.content;
    let obj = await Article.update({ id }, { title, content }).fetch();
    res.json(obj)
},


};

