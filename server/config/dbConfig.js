const mongoose =require('mongoose');
mongoose.connect(process.env.mongo_url ,).catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit();
});
const db = mongoose.connection;
db.once('open',()=>{
    console.log('MongoDB connection successful');
});
db.on('error',(err)=>{
    console.error('MongoDB connection error:', err);
});