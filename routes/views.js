const router = require('express').Router()
var express=require('express');
const path = require('path')



router.get('/:userName/profile', function (req, res) {
    router.use(express.static(path.join(__dirname, '../build-1.12.20')))  
    res.sendFile(path.join(__dirname, '../build-1.12.20', 'index.html'))
   
  
  })
router.get('/:userName', function (req, res) {
    router.use(express.static(path.join(__dirname, '../build')))
    res.sendFile(path.join(__dirname, '../build/index.html'))
  
  })


// router.get('/', function (req, res) {
//   res.sendfile(path.join(__dirname,  '../views/index.html'));
// });
// router.get('/:uid/:cardId', function (req, res) {
//   res.sendFile(path.join(__dirname, '../build_preview/index.html'))


// })

// router.get('/',(req,res)=>{
// res.sendFile(__dirname,'../build/index.html')
// })




module.exports = router