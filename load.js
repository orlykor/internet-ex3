var PORT = "8082";
var ROOT_FOLDER = "ex2";
var FILE_TO_CHECK = "/index.html";
var success = 0;

var http = require('http');
var fs = require('fs');
http.globalAgent.maxSockets =500;

/**
 * This funcion test the given file.
 *
 * @param counter
 */
function oneTestServer(counter){

    /*options to the http*/
    var option = {
        port: PORT,
        path: FILE_TO_CHECK,
        headers : {connection: 'keep-alive'}
    }
    var fullSrc = ROOT_FOLDER + FILE_TO_CHECK;
    fullSrc.replace(/\//g, '\\');

    http.get(option, function(res){

        var str = '';

        res.on('data', function(chunk){
            str += chunk;
        });

        res.on('end', function(){
            fs.readFile(fullSrc, function(err,data){
                if (err) {
                    console.log("Failed loading the tests");
                }
                else{
                    if (data.toString('utf8') === str) {

                        console.log("Test number: " + counter + ", Status:" +
                            " SUCCESS, on file:" +
                            " " + FILE_TO_CHECK);
                        success++;

                    }
                    else {
                        console.log("Test number: " + counter + ", Status :" +
                            " ERROR, on file:" + FILE_TO_CHECK);
                    }
                }
            });
        });
        res.on('error', function(err){
            console.log(err.message);
        });
    });
}
/**
 * runs all the test on the chosen file, using the oneTestServer function
 * @param server
 * @param numOfTest
 */
function applyTheTest(server,numOfTest){
    console.log("Starting the test:");
    console.log("-------------------------------");

    var TIME_PER_TEST = Math.floor(Math.random()*444);

    var runTest = function(counter) {
        if (counter >= numOfTest) {
            setTimeout(server.stop(function () {
                console.log("Server was closed successfully");
                console.log("-------------------------------");
                if (success === numOfTest) {
                    console.log("Finished running the test. Success: " + success + " out" +
                        " of: " + numOfTest + " tests");
                }
                else {
                    console.log("Finished running the test. Success: " + success + " out" +
                        " of: " + numOfTest + " tests");
                }
            }),2000);
            return;
        }
        oneTestServer(counter);
        setTimeout(function() {runTest(counter + 1);},TIME_PER_TEST);
    }
    runTest(0);
}

var hujiserver = require('./hujiwebserver');

/*create the server*/
var server = hujiserver.start(PORT, ROOT_FOLDER, function(err){
    if(err)
        console.log(err)
});
    applyTheTest(server, 500);
