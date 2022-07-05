
const socket = io("http://localhost:8000");

//Elements to select kar ke rkha hai use karne ke liye
const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer =document.querySelector(".container");
var audio =new Audio('ting.mp3')


// fundtion jo ek nya msg ka div append karega container me
const append =(message,position)=>{
    const messageElement =document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position =`left`){
    audio.play();
    }
}

//jab msg input hoga form me bhejne ke liye tab uski value ko  append karenge div me 
form.addEventListener("submit",(e)=>{
    e.preventDefault();//form submit karne par dusri link open hone se rokna
    const message =messageInput.value;
    append(` ${message}  :You`, "right");
    socket.emit('send',message);
    messageInput.value=' ';

})

//user jo join karga uska naam as a input lenge
const namee = prompt("ENter your name here");
console.log(namee);

//yha se event fire karte hai jese hi new user join karta hai --from client side to server side 
socket.emit('new-user-joined',namee);

//jab user join ho jata hai to server se event fire hota hai aur client side par dikhana hota hai isliye yha append fuction run karke use div ke roop me dikhaya jata hai
socket.on('user-joined',namee=>{
append(`${namee}  Joinied the chat`,'left');
})

//jab koi msg receive hota hai to usko dikhana apne html page par
socket.on("receive", (data) => {
  append(`${data.name}     : ${data.message}`, "left");
});
//jab koi left kare to bhi dikhana page par
socket.on("left", (name) => {
  append(`${name}  Is Left the chat`, "left");
});

