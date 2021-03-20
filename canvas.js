const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext('2d');
const picture = document.querySelector('#picture');
const img = new Image();

img.onload = () => {
	ctx.drawImage(img, 0, 0);
	//get the canvas data
	var data = ctx.getImageData(0, 0, canvas.width, canvas.height);
	//invert each pixel
	for (n = 0; n < data.width * data.height; n++) {
		var index = n * 4;
		data.data[index] = 255 - data.data[index];
		data.data[index + 1] = 255 - data.data[index + 1];
		data.data[index + 2] = 255 - data.data[index + 2];
		//don't touch the alpha
	}

	//set the data back
	ctx.putImageData(data, 0, 0);
};

img.src = picture.src;
