
// const { json } = require('body-parser');
var bodyParser=require('body-parser');

const User = require('../models/user');
var multer = require('multer');
const path = require('path')
var request = require('request');


newImage = async (req, res) => {

    console.log("imggggg")
    console.log("body",req)
    // const Cuser = await User.findOne({ uid: req.params.uid });
    // const userID = Cuser._id;
    console.log("NEW image");

    // let videoData = JSON.parse(req.body.video);
    // let counter = 0
    // console.log("nameVideo  -" + videoData.nameVideo);

    // if (videoData.nameVideo == '') {

    //     videoData.nameVideo = 'NEW'
    // }

    //  var exist = await Video.exists({ nameVideo: videoData.nameVideo })
    //  console.log("exist  -" + exist);
    // if (exist) {

    //     console.log("exist NEWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW");

    //     await Video.find({ user: userID, nameVideo: videoData.nameVideo }).then((result) => {
    //         console.log("result---------result" + result);

    //         if (result) {
    //             console.log("result---------result" + result.length);
    //             counter = result.length - 1

    //             console.log("name", videoData.nameVideo);
    //             counter = counter + 1
    //             videoData.nameVideo = videoData.nameVideo + '_' + counter;
    //             console.log("name", videoData.nameVideo);

    //         }
    //     })
    // }

    // videoData.user = userID;
    // console.log("videoData:  ", videoData);
    console.log("req", req.files)
    let results;
    if (req.files && req.files.file) {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!video if");

        console.log("files.file", req.files.file);

        let video_name = `${Date.now()}__${req.files.file.name}`;
        // 25.10
        // let newpath = path.join(__dirname, "../assets/uploads/videos/" + video_name);

        //save in files server
        let newpath = path.join(__dirname, "https://docs.google.com/document/d/1ouiFe_OF1MILuwLAC-i4f85JBJ-r1b47ZfA9opbmWs4/edit?usp=sharing" + video_name);

        console.log(newpath);
        // videoData.detailsVideoFile[0].conStringBase64 = video_name;

        // results = await saveVideo(videoData);

        console.log(newpath)
        req.files.file.mv(newpath).then((success) => {

            console.log("succes create");
            console.log(success)
            res.status(200).send(results.Video);
        }
        ).catch((err) => {
            console.log(err)
            res.status(500).send(err);
        })
    }
    else {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!video");
      //  results = await saveVideo(videoData)
        console.log(results);
        res.status(200).send(results);
    }
}
const uploadImage = async(req, res)=> {
    console.log("&&&&&&&&&&&&&&&&&&&&")
    console.log("wwwwwwwwwwwwwwwwwwww",req.files)
    console.log(req.files.file)
    console.log(req.params.uId)
    let url = await uploadedFile(req.files.file, req.params.uId, req.headers["authorization"]);
    console.log(url);
   res.send(url);
}


uploadedFile = (fileToUpload, uId, headers) => {
    console.log("headers", headers);
    return new Promise(async (resolve, reject) => {
        console.log(fileToUpload);
        console.log("uploadedFile");
        const uri = `https://files.leader.codes/api/${uId}/upload`;
        console.log(uri);
        const options = {
            method: "POST",
            url: uri,
            headers: {
                Authorization: headers,
                "Content-Type": "multipart/form-data",
            },
            formData: {
                file: {
                    value: fileToUpload.data,
                    options: {
                        filename: fileToUpload.name,
                    },
                },
            },
        };

        request(options, async (err, res, body) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            let url;
            console.log("result from server", body);
            try {
               url= JSON.parse(body).data.url;
                // let url=body.data.url;
                resolve(url);
            } catch (error) {
                reject(error);
            }
        });
    });
};

//////////////


module.exports = { newImage,uploadImage };
