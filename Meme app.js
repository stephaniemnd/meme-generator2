document.addEventListener("DOMContentLoaded", function () {
  const generateBtn = document.getElementById("btn");
  const canvasContainer = document.querySelector(".meme-container");

  generateBtn.addEventListener("click", function (event) {
    event.preventDefault();

    const topText = document.getElementById("topText");
    const bottomText = document.getElementById("bottomText");
    const imageFile = document.getElementById("imageFile");
    const imageUrl = document.getElementById("imageUrl");

    const image = new Image();

    // Check if a file is uploaded
    if (imageFile.files.length > 0) {
      const imageDataUrl = URL.createObjectURL(imageFile.files[0]);
      image.src = imageDataUrl;
    } else {
      image.src = imageUrl.value; // Use the URL directly
    }

    image.onload = () => {
      const newCanvas = document.createElement("canvas");
      const ctx = newCanvas.getContext("2d");
      const width = image.width;
      const height = image.height;
      const scaledWidth = 300; // Adjust this value as needed
      const scaledHeight = (height / width) * scaledWidth;

      newCanvas.width = scaledWidth;
      newCanvas.height = scaledHeight;

      ctx.drawImage(image, 0, 0, scaledWidth, scaledHeight);

      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 1.5;
      ctx.font = "40px Impact";
      ctx.textAlign = "center";

      const topTextValue = topText.value;
      const bottomTextValue = bottomText.value;

      // Draw top text
      ctx.fillText(topTextValue, scaledWidth / 2, 40);
      ctx.strokeText(topTextValue, scaledWidth / 2, 40);

      // Draw bottom text
      ctx.fillText(bottomTextValue, scaledWidth / 2, scaledHeight - 20);
      ctx.strokeText(bottomTextValue, scaledWidth / 2, scaledHeight - 20);

      // Interactivity
      newCanvas.classList.add("meme-canvas");

      newCanvas.addEventListener("mouseenter", () => {
        newCanvas.classList.add("hovered");
      });

      newCanvas.addEventListener("mouseleave", () => {
        newCanvas.classList.remove("hovered");
      });

      newCanvas.addEventListener("click", () => {
        canvasContainer.removeChild(newCanvas);
      });
      console.log("qwerty")
      const deleteIcon = document.createElement("div");
      deleteIcon.classList.add("delete-icon");
      deleteIcon.innerText = "X";
      newCanvas.appendChild(deleteIcon);

      canvasContainer.appendChild(newCanvas);

      // Clear fields
      topText.value = "";
      bottomText.value = "";
      imageFile.value = "";
      imageUrl.value = "";
    };
  });
});
