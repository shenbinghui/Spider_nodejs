'use strict';
const fs = require('fs'),
    request = require('request'),
    cheerio = require('cheerio'),
    mkdirp = require('mkdirp');

let urlPage='href="http://www.meishij.net/chufang/diy/jiangchangcaipu/?&page=';  //美食网站分页的位置

const dir='./img';

//create directory
mkdirp(dir,(err)=>{
    if(err){
        console.log(err);
    }
    console.log('create directory success!');
});


getUrlPath(url);

/**
 * download picture
 * **/
function downloadPic(url, dir, filename){
    request.head(url, function(err, res, body){
        if(err){
            console.log(err);
        }
        request(url).pipe(fs.createWriteStream(dir + "/" + filename));
    });
}

/**
 * get picture path
 * **/
function getUrlPath(url){
    //send request
    for(let i=1;i<2;i++) {
        request(url + i, (err, res, body) => {
            if (err) {
                console.log('request fail!');
            }

            if (!err && res.statusCode == 200) {
                var $ = cheerio.load(body);


                let childPicPath = $('#listtyle1_list a img');  //图片资源
                console.log(childPicPath.length);
                childPicPath.each(function (i, ele) {
                    let childPic = $(this).attr('src');
                    console.log('图片 : ' + childPic);
                    downloadPic(childPic, dir, Math.floor(Math.random() * 100000) + childPic.substr(-4, 4));
                });

            }
        });
    }
}




