var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')


router.post('/check_admin_password',function(req, res, next) {
 
  try{
    pool.query("select * from admindetails where (emailid=? or mobileno=?) and password=? ",[req.body.emailid,req.body.emailid,req.body.password],function(error,result){
        if(error){
            res.status(200).json({message:error,status:false})
        }else{
            if(result.length==1)
            res.status(200).json({message:'Login successfully',data:result[0],status:true})
            else
            res.status(200).json({message:'Login Unsuccessfully',data:[],status:false})

            console.log(result[0])
        }
    })
  }
  catch(e){
    console.log(e)
    res.status(200).json({message:'fail to submit Brands',status:false})
  }
});

module.exports = router;