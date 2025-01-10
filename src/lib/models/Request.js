const mongoose = require('mongoose');


const requestSchema = new mongoose.Schema({
    
},{strict : false});

  
module.exports= mongoose.models.Requests || mongoose.model('Requests', requestSchema);