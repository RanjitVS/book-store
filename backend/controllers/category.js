const Category=require('../models/category')

exports.categoryById=(req,res,next,id)=>{
    Category.findById(id).exec((err,category)=>{
        if(err||!category){
            return res.status(400).json({
                error:"Category not found"
            })
        }
        req.category=category;
        next();
    })
}


exports.create=(req,res)=>{
    const category = new Category(req.body)
    category.save((err,data)=>{
        if(err){
            return res.status(400).json({
                err
            })
        }
        res.json({data})

    })
}

//read one category
exports.read=(req,res)=>{
    return res.json(req.category);
}



exports.update=(req,res)=>{
    const category=req.category
    category.name=req.body.name
    category.save((err,data)=>{
        if(err){
            return res.status(400).json({
                error:"Could not update for some reason"
            })
        }
        res.json(data);
    })
}




exports.remove=(req,res)=>{
    const category=req.category
    category.remove((err)=>{
        if(err){
            return res.status(400).json({
                error:"Could not remove"
            })
        }
        res.json({
            message:"category deleted"
        });
    })
}




//gives every possible category, even if they do not contain any products
exports.list=(req,res)=>{
    Category.find().exec((err,data)=>{
        if(err){
            return res.status(400).json({
                err
            })
        }
        res.json(data);
    })
}

