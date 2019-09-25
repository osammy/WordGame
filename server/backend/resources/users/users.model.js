var mongoose = require('mongoose');
var passportLocalMongoose = require("passport-local-mongoose");
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;



var UserSchema = new Schema({
    first_name: {
        type:String,
        lowercase:true,
//        required:true
    },                 //this is required

    last_name: {
        type:String,
        lowercase:true,
//        required:true
    },                  //this is required
    
    email: {
        type:String,                      //this is  a required field required
        lowercase:true,
        unique:true,
        trim:true
    },
    position:{
        type:String,
        default:""
//      required:true
    },
    permissions:{
        type:Array, // [staff,admin,executive,owner]
        default:[],
        required:true
    },
    pasreset: String,
    pasresetExpiry: {
        type: Number,
        default: Math.round(234 * Math.random() + 1)
    },
    phone:{
        type:String,
//      required:true
    },
    operation:{
        type:ObjectId,
        ref:'Operations',
//      required:true
    },
    hub:{
        type:ObjectId,
        ref:"Hubs",
        required:true
    },
    zone:{
        type:ObjectId,
        ref:'Zone'
    },
    registeration:{
        type:ObjectId,
        ref:'Users'
    }

}, {
        timestamps: { createdAt: 'created_at' }
    });


UserSchema.virtual('fullname').get(function() {  
    return this.first_name + ' ' + this.last_name;
});

var options = {
    usernameField:'email'
}
UserSchema.plugin(passportLocalMongoose,options)

var UserModel = mongoose.model('Users', UserSchema);



module.exports = UserModel;