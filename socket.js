var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http); 
app.use(express.static('public'));
var port = process.env.PORT || 3000;

http.listen(port,() => {
    console.log('Server running at port `+port');
});

// app.get('/', (req,res) => {
// //    res.send('<h1>Hello world</h1>');
//     res.sendFile(__dirname + '/public/index.html');
// });

io.on('connection', newConnection);

function newConnection(socket){
    console.log('new connection: ' + socket.id);
//    socket.on('person', personMsg);

    socket.on('recorded', blobArrayBufferReceived)
    function blobArrayBufferReceived(blobArrayBuffer) {
    //send it back to clients
    io.emit('recordedSent', blobArrayBuffer)
}    

socket.on('detected', dataMsg);
    function dataMsg(data){
//        socket.broadcast.emit('detected', data);
          io.emit('detected', data);
}

socket.on('detectedgif', dataMsg2);
function dataMsg2(data){
//        socket.broadcast.emit('detected', data);
      io.emit('detectedgif', data);
}
}

