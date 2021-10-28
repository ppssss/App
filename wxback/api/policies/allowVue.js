module.exports=async function(req,res,proceed){
    res.header("Access-Control-Allow-Origin","*");
    res.header ("Access-Control-Allow-Credentials","true");
    return proceed()
}

