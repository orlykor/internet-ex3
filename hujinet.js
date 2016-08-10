/**
 * Created by orly on 29/12/2015.
 */

/**
 * finds the title in the http request
 *
 * @param httpMessage
 * @param messageElem
 * @returns {number}the index of the title
 */
function findTitle(httpMessage, messageElem) {
    //there maybe empty lines till we get to the title
    for (var i = 0; i < httpMessage.length; i++) {
        if (httpMessage[i].replace(/\s{2,}/g, ' ').split(" ").length === 3) {
            messageElem.title = httpMessage[i];
            return i;
        }
    }
    return -1;
}

/**
 * holds the socket of the request and its root folder.
 *
 * @param socket
 * @param rootFolder
 * @constructor
 */
function ManageRequest(socket, rootFolder) {
    this.socket = socket;
    this.rootFolder = rootFolder;
}
exports.ManageRequest = ManageRequest;

/**
 * holds the title and headers of the http request message
 * @constructor
 */
function MessageElements() {
    this.isTitle = "false";
    this.title = "";
    this.headers = [];
}

/**
 * makes the connection between the client and the server, if connection is valid.
 *
 * @param fs
 * @param socket
 * @param requestPath
 * @param httpReqObj
 */
function makeConnection(fs, socket, requestPath, httpReqObj) {
    try {
        var stream = fs.createReadStream(requestPath);
        stream.on('error', function (error) {
            if (error) {
                console.log(error)
            }
        });

        stream.on('end', function () {
            var connection = httpReqObj.headersObj["connection"];
            var closeConnection = (httpReqObj.version == "1.0" && connection != "keep-alive");

            if (closeConnection || connection === "close") {
                socket.end();
            }
        });
        stream.pipe(socket, {end: false});
    }
    catch (err){
        console.log(err);
    }
}
/**
 * creates the response messgae- with its title, and headers of the
 * request message.
 * No body- this is only for the GET method.
 *
 * @param httpReqObj
 * @param requestPath
 * @param fileType
 * @param socket
 * @param stats
 * @param fs
 */
function createResponseMessage(httpReqObj, requestPath, fileType, socket, stats, fs) {

    var headers = {
        'Content-Type': fileType,
        'Connection': httpReqObj.headersObj['connection'],
        'Content-Length': stats.size
    };

    socket.write(httpReqObj.version + " " + httpReqObj.message + "\r\n");
    for (var key in headers) {
        socket.write(key + ": " + headers[key] + "\r\n");
    }
    socket.write("\r\n");

    //start the connection with the client
    makeConnection(fs, socket, requestPath, httpReqObj);

}


/**
 * Checks if the request has a valid connection type, if exist.
 * if not, make one with the 'close' type for http version 1.0
 *
 * @param httpReqObj
 * @returns {boolean} true if has a valid http version and connection type.
 */
function isConnectionValid(httpReqObj) {

    if (httpReqObj.headersObj["connection"] == undefined) {
        if (httpReqObj.version == 'HTTP/1.0') {
            httpReqObj.headersObj["connection"] = 'close';
        }
        else {
            httpReqObj.headersObj["connection"] = 'keep-alive';
        }
    }
    var connectionType = httpReqObj.headersObj["connection"];
    return (httpReqObj.version == "HTTP/1.1" || httpReqObj.version == "HTTP/1.0") &&
        (connectionType == 'keep-alive' || connectionType == 'close');
}

/**
 *check if request is valid
 *
 * @param httpReqObj
 * @returns {boolean} true if valid, else false
 */
function isReqValid(httpReqObj) {

    if (httpReqObj.message != "200 OK") {
        return;
    }
    if (httpReqObj.method != "GET") {
        httpReqObj.message = "405 Method Not Allowed";
        return;
    }
    if (!isConnectionValid(httpReqObj)) {
        httpReqObj.message = "500 Internal Server Error";
        return;
    }
}

/**
 * Make the response from the request object.
 * if all is valid, then create the response message.
 *
 * @param socket
 * @param rootFolder
 * @param messageElem
 */

function createResponseFromRequest(socket, rootFolder, messageElem) {
    try {
        var fs = require('fs');
        var contentTypes = {
            'js': 'application/javascript',
            'txt': 'text/plain',
            'html': 'text/html',
            'css': 'text/css',
            'jpg': 'image/jpg',
            'gif': 'image/gif'
        };

        var httpReqObj = new HttpRequestObj(messageElem);
        var requestPath = (rootFolder + httpReqObj.path);

        requestPath = requestPath.replace(/\//g, '\\');
        var normalizePath = requestPath.normalize('NFC');

        /*check if the root source is under the given rootFolder*/
        if (normalizePath.indexOf("..") != -1) {
            socket.write(httpReqObj.version + " 403 Forbidden" + "\r\n");
            return;
        }
        /*check if request has no problems and is valid*/
        isReqValid(httpReqObj);

        /* check if path exist*/
        fs.exists(requestPath, function (exist) {
            if (!exist) {
                socket.write(httpReqObj.version + " 404 Not Found" + "\r\n");
                return;
            }
        });

        /**
         * check if the File is an actual file and of an existing
         * type(from the contentType obj)
         */
        fs.stat(requestPath, function (err, stats) {
            var path = require('path');
            if (err || !stats.isFile()) {
                httpReqObj.message = "404 Not Found";
                console.log(err);
                return;
            }
            var fileType = path.extname(requestPath).substring(1);

            if (!contentTypes[fileType]) {
                httpReqObj.message = "415 Unsupported Media Type";
                return;
            }
            //if all is valid, make the response message
            createResponseMessage(httpReqObj, requestPath, contentTypes[fileType], socket, stats, fs);
        });
    }
    catch (err) {
        console.log(err)
    }
}
exports.createResponseFromRequest = createResponseFromRequest;

/**
 * Checks if the request is valid.
 * if it has the Get method, the right connection type and version type.
 *
 * @param httpReq
 * @param messageElem
 * @param handleReqObj
 * @returns {boolean} true if valid, else false
 */
function HttpRequestObj(messageElem) {

        this.message = "200 OK";
        var title = messageElem.title.split(/[ ]+/);
        this.method = title[0];
        this.path = title[1];
        this.version = title[2];
        this.headersObj = {};

        for (var i = 0; i < messageElem.headers.length; i++) {
            var semicolonIndex = messageElem.headers[i].indexOf(":");
            if (semicolonIndex != -1) {
                var header = [];
                header[0] = messageElem.headers[i].substring(0, semicolonIndex);
                header[1] = messageElem.headers[i].substring(semicolonIndex+1 , messageElem.headers[i].length);
                if (header.length === 2) {
                    this.headersObj[header[0].trim().toLowerCase()] = header[1].trim().toLowerCase();
                }
            }
        }
}

/* the message object */
var messageElem = new MessageElements();

/**
 * analyzes the data and process it to a http message
 *
 * @param chunk
 */

ManageRequest.prototype.analyzeData = function (chunk) {
    try {

        chunk = chunk.replace(/(\r\n|\n|\r)/gm, "\n"); // if there are any new lines
        var httpMessage = chunk.split("\n");

        var titleIndex = findTitle(httpMessage, messageElem);

        //get the title to the http requeset object, and cut it from the message
        if (titleIndex != -1 && messageElem.isTitle) {
            httpMessage.splice(titleIndex, 1);
            messageElem.isTitle = true;
        }
         /* get the headersArr out of the data and store them in the http
          request object */
        while (httpMessage.length > 0) {
            if (httpMessage[0] == "" && httpMessage[1] == "") {
                createResponseFromRequest(this.socket, this.rootFolder, messageElem);
                break;
            }
            else {
                if (httpMessage[0] == "") {
                    break;
                }
                messageElem.headers.push(httpMessage[0]);
            }
            httpMessage.splice(0, 1);

        }
    }
    catch (err) {
        return;
    }
}




