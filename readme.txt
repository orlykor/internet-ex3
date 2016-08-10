1. the hardest part of this ex was to actually understand how the server works.
 how to make the connection, and what is the "job" of the clients and sockets
 and so on, in the connection.

 2. the fun part was to see everything is working. to see that I can
 actually make a request through the "potty" and get back my
 response, that I created in the ex.

 3. in order to make my server efficient I used asynchronic methods, that
 way, when I run my program it reads all the file, and not get "stuck"
 on a method. moreover, I used the error handling module to catch the
 errors right away.

 4. I test my server that way: first in the load.js file - I tested my server
  on one file, and tried to connect 500 clients to the server, to see
  if it can handle it.
  second, in the test.js file, I tried to see if the server can make the
  connection and get me the files the in the given src, to see if it can handle
  a various type of requests.
  all the checking was with the http module.

