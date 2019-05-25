import VTTConverter from './srt-webvtt.js';

const video = document.querySelector(`video`);
const track = video.querySelector(`track`);

const handleFileSelection = ({target}) => {
  let videoIsLoaded = false;

   [...target.files].forEach(file => {
    const { name, type = "" } = file;
    if (type.startsWith("video/")) {
      video.type = type;
      video.src = URL.createObjectURL(file);
      videoIsLoaded = true;
    }

    if (name.endsWith(".vtt")) {
      const reader = new FileReader();
      reader.onload = () => {
        track.src = reader.result;
      };
      reader.readAsDataURL(file);
    }

    if(name.endsWith(".srt"))  {
      const vttConverter = new VTTConverter(file);
      vttConverter
      .getURL()
      .then(url => { 
        track.src = url; 
      })
      .catch((err) => {
        console.error(err);
      })
    }
  });

  if (videoIsLoaded === true) video.play();
};

document.addEventListener('DOMContentLoaded', () => {
  const fileChoosr = document.querySelector(`[type=file]`);
  fileChoosr.addEventListener("change", handleFileSelection);
});
