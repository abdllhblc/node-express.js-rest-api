const { default: mongoose } = require("mongoose")

const db = ()=>{
    mongoose.connect(process.env.MONGOURI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(()=>{
        console.log("mongoose connect")
    }).catch((err)=> {
        console.log(err)
    })
}


module.exports = db