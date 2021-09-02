//load http module
const http = require("http"); 
/*load core node fs (filesystem) module
 .promises allows us to make asynchronous operations.  */
const fs = require("fs").promises;

//make a function to respond to http requests
const requestListener = function (req, res) {
    //output request url
    console.log(req.url);

    if (req.url === "/") {
        //if root, return html file
        //use readFile method and pass __dirname
        //__ variables are predefined __dirname is path where node/index.js code is running
        fs.readFile(__dirname + "/page.html")
            //once readFile gets data, take contents and pass it into another function
            .then(contents => {
                //set http response header entry
                res.setHeader("Content-Type", "text/html; charset=UTF-8");
                
                //return 200 http status code
                res.writeHead(200);

                // send file contents + close response
                res.end(contents);
 
            });
    }
    else {
        //if request is not root, return JSON file
        
        fs.readFile(__dirname + "/data.json")
            //once readFile gets data, take contents and pass it into another function
            .then(contents => {
                //set http response header entry
                res.setHeader("Content-Type", "application/json; charset=UTF-8");
                
                //return 200 http status code
                res.writeHead(200);

                // send file contents + close response
                res.end(contents);

            });

    }

    
};

// make an http server instance (object)
const server = http.createServer(requestListener);

//define TCP port and IP address for http server to listen to

const host = "0.0.0.0"; // this is specific to Repl
const port = "8080";

//call listen() method to start listening for http requests
server.listen(
    port, host, () => {
        console.log(`Server is running on http://${host}:${port}`);
        // this is another way of writing:
        // console.log("Server is running on http://" + host+ ":" + port);

    }
);
