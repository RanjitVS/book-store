const express=require('express')
require('dotenv').config()//use the env variable for the PORT 8000
const mongoose= require('mongoose')
const morgan=require('morgan');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const cors=require('cors');
//import routes
const authRoutes=require('./routes/auth');
const userRoutes=require('./routes/user');
const categoryRoutes=require('./routes/category');
const productRoutes=require('./routes/product')

const app=express()

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true 
})
.then(()=>
    console.log('database connected')
)
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use('/api',authRoutes);
app.use('/api',userRoutes);
app.use('/api',categoryRoutes);
app.use('/api/',productRoutes);

const port=process.env.PORT||8000 //just like we have document in browser, we have process in node
//if we do not have a env file then we can use 8000 directly using ||8000

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});

