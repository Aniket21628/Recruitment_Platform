require('dotenv').config();
import { connect } from 'mongoose';

connect(process.env.MONGODB_URI,{useNewUrlParser:true,useUnifiedTopology:true,})

.then(()=>{
    console.log('DB Connected');
})
.catch((err)=>console.log(err))
