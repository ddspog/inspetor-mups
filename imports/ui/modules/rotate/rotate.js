export function RotateCounterClockwise(dataUrl, callback){
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    let image = new Image();

    image.src = dataUrl;

    image.onload = function() {
        // Specify size of canvas
        canvas.width = image.height;
        canvas.height = image.width;

        if(image.height > image.width){
            // Rotate and draw new image on canvas
            ctx.rotate(-90 * Math.PI / 180);
            ctx.translate(-canvas.height, 0);
            ctx.drawImage(image, 0, 0);

            // Return image on canvas using callback
            callback(canvas.toDataURL("image/jpeg"));
        } else {
            // If image doesn't need to rotate, return it
            callback(dataUrl);
        }

        canvas = null;
    };
}