var router=require('express').Router();

var {saveUserInformation,getUserById,getUserByUserName,patch_update_user,getUidByUserName,setApiKeyToUser
,addApiKeyToExistingUsers}=require('../controllers/user')
var {addContactFacebookForm}=require('../controllers/contactFacebook')
const {getAllData}=require('../controllers/statistics')

const {newImage,uploadImage}=require('../controllers/images')

const {getCitiesByCountries}=require('../controllers/cities')

router.get('/getAllData/:uId',getAllData);
router.get('/getUserById',getUserById);
// router.post('/saveUserInformation',saveUserInformation);
router.get('/getUserById',getUserById);
router.get('/getUserByUserName/:userName',getUserByUserName);
router.post('/patch_update_user/:userName',patch_update_user)
router.get('/getUser/:userName',getUidByUserName)
router.post('/newImage/:uId',newImage)
router.post('/uploadImage/:uId',uploadImage)
// router.post('/setApiKeyToUser/:id',setApiKeyToUser)

router.post('/contactFacebookForm/add',addContactFacebookForm)

router.post('/addApiKeyToExistingUsers',addApiKeyToExistingUsers)

router.get('/getCitiesByCountries/:country',getCitiesByCountries)
module.exports=router;
