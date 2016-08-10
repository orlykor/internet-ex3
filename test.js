

var PORT = "8082";
var ROOT_FOLDER = "ex2";
var currSrc = 0;
var files = ["/index.html", "/main.js", "/style.css","/img1.jpg"];
var file = files[currSrc];
var countSuccess = 0;


var hujiserver = require('./hujiwebserver');
var http = require('http');
var fs = require('fs');
var options = {
    port: PORT,
    path: "/index.html",
    headers : {connection: 'keep-alive'},
}
var server = hujiserver.start(PORT, ROOT_FOLDER, function(err){
    err?(console.log(err)): (console.log("The server is working." +
        " Listening to port " + PORT + " \n"))
});
/**
 * test the server creates from the start method.
 * try to fetch the files from the ex2 folder
 *
 * @param res
 */
var requestTester = function(res) {

        var str ='';
        //the file the server has given me
        res.on('data', function (chunk) {
            str += chunk;
        });

        res.on('end', function () {
            //the original file in the folder
            fs.readFile(ROOT_FOLDER + file, function (err, data) {
                console.log("Source: " + file);
                //console.log(data.toString())
                //var expected = true, actual = true;
                if (err) {
                    //expected = false;
                    console.log("No such file:" + file + " as expected.")
                }
                if (data) {
                    if (data.toString('utf8') === str) {

                        console.log("The file " + file + " was returned as" +
                            " expected\r\n");
                        countSuccess++;

                    }
                    else {
                        console.log("The file " + file + " wasn't returned" +
                            " as expected\r\n")
                    }
                }
                if (currSrc < (files.length - 1)) {

                    currSrc++;
                    file = files[currSrc];
                    options.path = file;
                    http.request(options, requestTester).end();
                    return;
                }
                /*stop the server from working*/
                setTimeout(server.stop(function(){
                    if (countSuccess === files.length) {
                        console.log("Finished running the test with SUCCESS");
                    }
                    else {
                        console.log("Finished running the test with NO SUCCESS");
                    }
                }),2000);

            });

        });

}

http.request(options,requestTester).end();


