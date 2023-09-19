var express = require("express")
const { Server } = require("http")
const { serialize } = require("v8")
var app = express()

app.use(express.static(__dirname))
app.listen(3000,()=>
{
    console.log('listening')
})

app.get('/', (req, res) => {
    res.set({
      'Allow-access-Allow-Origin': '*'
    })
  
    // res.send("Hello World");
    return res.redirect('index.html')
  })
  