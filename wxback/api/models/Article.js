
module.exports = {

  attributes: {
    artName:{type:'string',required: true },
    title:{type:'string',required: true },
    content:{type:'text',required: true },
    smSrc:{type:'string',required: true },
    artId:{type:'string',defaultsTo:'1' }
  },

};

