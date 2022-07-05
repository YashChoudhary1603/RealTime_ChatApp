//This is our node server

//cors error ko rokne ke liye esa declare kiya jata hai
const io = require("socket.io")(8000, {
  cors: {
    origin: "*",
  },
});

const users = {};

io.on("connection", (socket) => {
    //when a new user is connected with socket , this event is called and the function is got exicuted
    socket.on("new-user-joined", function (namee) {
      console.log("New User", namee);
      users[socket.id] = namee; //socket.id - ye ek unique id hogi jo har ek connection par milegi socket ko uski ka use karke hum user name ko usme add kar denge

      socket.broadcast.emit("user-joined", namee); // this will broadcast the user joined event to all the other users which are connected with this socket
    });
    //when the send event is called from client side it will broadcast that msg to all the other users
    socket.on("send", function (message) {
      //
      socket.broadcast.emit("receive", {
        message: message,
        name: users[socket.id],
      });
      console.log(users[socket.id]);
    });
    
    // when the socket got disconnect it will show to every body about that one
    socket.on('disconnect',message =>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    })
  });
