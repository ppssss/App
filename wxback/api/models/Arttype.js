
module.exports = {

  attributes: {
    artType:{type:'string',required: true },
    title:{type:'text',required: true },
    imgSrc:{type:'string',required: true },
    kind:{type:'string',defaultsTo:'art' }
  },

};

