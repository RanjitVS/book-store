const formidable = require('formidable');
const _ = require('lodash');
const Product = require('../models/product');
const fs=require('fs');


exports.productById=(req,res,next,id)=>{
    Product.findById(id)
    .populate('category')
    .exec((err,product)=>{
        if(err||!product){
            return res.status(400).json({
                error:"Product not found"
            })
        }
        req.product=product;
        next();
    })
}

exports.read=(req,res)=>{
    req.product.photo=undefined;
    return res.json(req.product);
}


exports.create=(req,res)=>{
    //we can't handle this from req.body since we also have to handle the images
    let form = new formidable.IncomingForm()
    form.keepExtensions=true;//extensions of image types would be there
    form.parse(req,(err,fields,files)=>{
        if(err){
            return res.status(400).json({
                error:'Image could not be uploaded'
            })
        }

        //check if all fields present
        const {name,description,price,category,quantity} = fields;
        if(!name||!description||!price||!quantity||!category){
            return res.status(400).json({
                error:'All fields are required'
            })
        }

        let product=new Product(fields)//creating a new product

        //no photo greater than 1Mb
        if(files.photo){
            if(files.photo.size>1000000){//we get a property size in files.photo
                return res.status(400).json({
                    error:'Image should not be greater than 1Mb in size'
                })
            }
            product.photo.data=fs.readFileSync(files.photo.path)
            product.photo.contentType=files.photo.type
        }

        product.save((err,result)=>{
            if(err){
                return res.status(400).json({
                    err
                })
            }
            res.json(result);
        })


    })
}


exports.remove=(req,res)=>{
    let product=req.product;//whenever we have productId in the url, the productById method runs and gives the
    //product in req.product variable
    product.remove((err,deletedProduct)=>{
        if(err){
            return res.status(400).json({
                err
            })
        }
        res.json({
            message:"the product was deleted"
        })
    })
}




exports.update=(req,res)=>{
    //we can't handle this from req.body since we also have to handle the images
    let form = new formidable.IncomingForm()
    form.keepExtensions=true;//extensions of image types would be there
    form.parse(req,(err,fields,files)=>{
        if(err){
            return res.status(400).json({
                error:'Image could not be uploaded'
            })
        }

        //check if all fields present
        const {name,description,price,category,quantity} = fields;
        if(!name||!description||!price||!quantity||!category){
            return res.status(400).json({
                error:'All fields are required'
            })
        }

        let product=req.product;//getting the product through productById's req.product
        product=_.extend(product,fields)//replace the existing info with new info .extend(existing,new); extend is made available through lodash module

        //no photo greater than 1Mb
        if(files.photo){
            if(files.photo.size>1000000){//we get a property size in files.photo
                return res.status(400).json({
                    error:'Image should not be greater than 1Mb in size'
                })
            }
            product.photo.data=fs.readFileSync(files.photo.path)
            product.photo.contentType=files.photo.type
        }

        product.save((err,result)=>{
            if(err){
                return res.status(400).json({
                    err
                })
            }
            res.json(result);
        })


    })
}




//show products by total sales and arrival
// by sales: =/products?sortBy=sold&order=desc&limit=4
// by arrival =/products?sortBy=createdAt&order=desc&limit=4
// if no parameters are sent, then all products would be returned


exports.list=(req,res)=>{
    let order=req.query.order ? req.query.order : 'asc'  //order as in asc or desc from the route
    let sortBy=req.query.sortBy ? req.query.sortBy : '_id'
    let limit=req.query.limit ? parseInt(req.query.limit) : 24 //give 24 products by default

    Product.find()
    .select('-photo')//deselect photo
    .populate('category')// Populate is used for getting data from other collections if the fields are referenced
    .sort([[sortBy,order]])
    .limit(limit)//the maximum number of results which will be returned
    .exec((err,data)=>{
        if(err){
            return res.status(400).json({
                message:"products not found"
            })
        }
        res.json(data)
    })
}



//find the related products based on the same category

exports.listRelated=(req,res)=>{
    let limit=req.query.limit ? parseInt(req.query.limit) : 24

    Product.find({_id: {$ne:req.product},category: req.product.category})// ne means not equal in mongo
    .limit(limit)
    .populate('category','_id name')
    .exec((err,product)=>{
        if(err){
            return res.status(400).json({
                error:"Products not found"
            })
        }
        res.json(product);
    })
}



//lists the categories iff they have products associated with them
exports.listCategories=(req,res)=>{
    Product.distinct('category',{},(err,categories)=>{
        if(err){
            return res.status(400).json({
                error:"Categories not found"
            })
        }
        res.json(categories);
    })
}



//list upon search

/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */
 
 
exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);//get the results after skipping some fixed number of documents
    let findArgs = {};
 
    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);
 
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-500] prices will be in the format 0-500 500-100 and so on....
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }
 
    Product.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};



exports.photo=(req,res,next)=>{
    if(req.product.photo.data){
        res.set('Content-Type',req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}

exports.listSearch=(req,res)=>{
    const query={}
    if(req.query.search){
        query.name={$regex:req.query.search,$options:'i'}
        if(req.query.category&&req.query.category!='All'){
            query.category=req.query.category
        }
        Product.find(query,(err,products)=>{
            if(err){
                return res.status(400).json({
                    error:err
                })
            }
            res.json(products)
        }).select('-photo')
    }
}