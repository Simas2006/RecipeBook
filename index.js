var requestLib = require("request");
var fs = require("fs");
var express = require("express");
var app = express();
var PORT = process.argv[2] || 8000;

app.use("/recipes",express.static(__dirname + "/recipes"));
app.use("/public",express.static(__dirname + "/public"));
app.get("/",function(request,response) {
  response.send("<html><body><script>location.href = \"/public/index.html\";</script></body></html>");
});
app.get("/register",function(request,response) {
  var qs = decodeURIComponent(request.url.split("?").slice(1).join("?")).split(",");
  requestLib(qs[0],function(err,didRespond,body) {
    if ( err ) throw err;
    if ( didRespond ) {
      fs.writeFile(__dirname + "/recipes/" + qs[1] + ".html",body,function(err) {
        if ( err ) throw err;
        response.send("ok");
      });
    }
  })
});
app.get("/list",function(request,response) {
  fs.readdir(__dirname + "/recipes",function(err,files) {
    if ( err ) throw err;
    response.send(files.filter(item => item.endsWith(".html")).join(","));
  });
});

app.listen(PORT,function() {
  console.log("Listening on port " + PORT);
});
