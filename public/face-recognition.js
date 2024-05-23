const video = document.getElementById("video");
const modelpath = './weights'

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri(modelpath), //カメラの中の顔を探すmodule
]).then(startVideo);

function startVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream; //カメラからの映像ストリームをvideo要素にセット
    })
    .catch(function (err) {
      console.error(err);
    });
}

window.onload = async () => {
  video.onloadedmetadata = () => {
    const canvas = document.getElementById('canvas')

    const context = canvas.getContext("2d")

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    let lastSentTime = 0;

    video.onplay = async () => {
      setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        console.log(detections.length)
        context.clearRect(0, 0, canvas.width, canvas.height)
        if (detections.length != 0) {
          const detection = detections[0]
          const { x, y, width, height } = detection.box

          context.clearRect(0, 0, canvas.width, canvas.height)
          context.strokeStyle = "#FF0000"
          context.lineWidth = 2
          context.strokeRect(x, y, width, height)

          const currentTime = new Date().getTime()
          if (currentTime - lastSentTime > 10000) {
            const statusText = "working"
            const statusEmoji = ":eyes:"
            const statusExpiration = 0
            set_status(statusText, statusEmoji, statusExpiration)
            lastSentTime = currentTime;
          }
        }

        const currentTime = new Date().getTime()
        if (currentTime - lastSentTime > 10000) {
          const statusText = "away"
          const statusEmoji = ":wc:"
          const statusExpiration = 0
          set_status(statusText, statusEmoji, statusExpiration)
          lastSentTime = currentTime;
        }
      }, 500)
    }
  }
}

