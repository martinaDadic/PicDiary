const video = document.querySelector("#camera");
async function StartStream(){
    if (navigator.mediaDevices.getUserMedia) {
        try{
            stream = await navigator.mediaDevices.getUserMedia({video: true});
            video.srcObject=stream;
            video.play();
        }catch(err){
            alert("molim vas dopustite pristup kameri")
        }
    }else {
        alert("slikavanje nije podržano");
    }
}

StartStream();

const button = document.getElementById("snapButton");
const canvas = document.getElementById("photo");
const img = document.getElementById("result");

button.addEventListener("click", () => {
  const context = canvas.getContext("2d");
  canvas.width = 300;
  canvas.height = 200;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageData = canvas.toDataURL("image/png");
  img.src = imageData;
});

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js")
    });
}