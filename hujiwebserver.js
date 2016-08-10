/**
 * Created by orly on 29/12/2015.
 */

/*the servers*/
var serversList = [];

/* the time out for the socket*/
var TIME_OUT = 20000;


/**
 * This function creates the server object
 *
 * @param port
 * @param rootFolder
 * @param callback
 * @constructor
 */
function CreateWebServer(port, rootFolder, callback) {
    try {

        var net = require('net');
        socketsList = [];
        this.port = port;

        /**
         * make the port and rootFolder as readable only
         */
        Object.defineProperty(this, 'port', {
            value: port,
            __proto__: null,
            writable: false
        });

        Object.defineProperty(this, 'rootFolder', {
            value: rootFolder,
            __proto__: null,
            writable: false
        });


        //create the socket and server
        this.server = net.createServer(function (socket) {

            var ManageRequest = require('./hujinet.js');
            var handleReqObj = new ManageRequest.ManageRequest(socket, rootFolder);

            socketsList.push(socket);
            socket.setTimeout(TIME_OUT);
            var socketIndex = socketsList.indexOf(this);

            /**
             * if the socket is timed out, end it and erase it from the
             * socket's list.
             */
            socket.on('timeout', function () {
                if (socketIndex != -1) {
                    socketsList.splice(socketIndex, 1);
                }
                socket.end();
            });

            /*check if error was emitted on the socket*/
            socket.on('error', function (error) {
                if (error) {
                    callback(error);
                }
            });

            /**
             * if the socket is closed, end it and erase it from the
             * socket's list.
             */
            socket.on('end', function () {
                if (socketIndex != -1) {
                    socketsList.splice(socketIndex, 1);
                }
            });

            /**
             * in case data was emitted, create a socket and handle the
             * client request.
             */
            socket.on('data', function (data) {
                handleReqObj.analyzeData(data.toString('utf8'));
            });

        });
        /*check for errors, before listening to the server*/
        this.startServerErrors(callback, port);

        this.server.listen(this.port, function () {
            serversList.push(this);
            callback();
        });

        /*the stop function-stops the server*/
        this.stop = function (callback) {

            //close the server and remove it from the servers list
            this.server.close(function () {
                var serverIndex = serversList.indexOf(this);
                serversList.splice(serverIndex, 1);
                callback(this.port);
            });

            //destroy all sockets for each connected client
            socketsList.forEach(function (socket) {
                socket.destroy();
            });
            socketsList = [];
        }
    } catch (err) {
        console.log(err)
    }

}
/**
 * Checks for errors on the server when trying to start it.
 *
 * @param callback
 * @param port
 */
CreateWebServer.prototype.startServerErrors = function (callback, port) {

    this.server.on('error', function (err) {
        switch (err.errno) {
            case "EACCES":
                callback(new Error("Permission denied. Access was forbidden to port" + port));
                break;
            case "EADDRINUSE":
                callback(new Error("Address already in use. Another server occupying the port " + port));
                break;
            default:
                callback(err);
        }
    });

}

/**
 * this function starts the server and the connection
 * between the server to the clients.
 *
 * @param port
 * @param rootFolder
 * @param callback
 * @returns {CreateWebServer} a server object
 */
exports.start = function (port, rootFolder, callback) {
    try {

        var fs = require('fs');
        var serverObj = new CreateWebServer(port, rootFolder, callback);

        //first check if the rootFolder is correct
        fs.stat(rootFolder, function (err, stats) {
            if (err) {
                callback(new Error("Failed to open stream: No such server path " + rootFolder));
                return null;
            }
            else if (!stats.isDirectory()) {
                callback(new Error("Failed to open stream: No such server path " + rootFolder + " is not a directory"));
                return null;
            }
        });
        return serverObj;
    }
    catch (err) {
        console.log(err)
    }
};

