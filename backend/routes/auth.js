const express=require('express')
const router=express.Router();

const{signup,signin,signout}=require('../controllers/auth');

router.post('/signup',signup);
router.post('/signin',signin);
router.get('/signout',signout);



/* router.get('/hello',requireSignin,(req,res)=>{
    res.send("hello there");
});
 */

module.exports=router;