function getAverageRGB(imgElement) {

    var blockSize = 5, // only visit every 5 pixels
        defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height,
        i = -4,
        length,
        rgb = {r:0,g:0,b:0},
        count = 0;

    if (!context) {
        return defaultRGB;
    }

    height = canvas.height = imgElement.naturalHeight || imgElement.offsetHeight || imgElement.height;
    width = canvas.width = imgElement.naturalWidth || imgElement.offsetWidth || imgElement.width;

    context.drawImage(imgElement, 0, 0);
    try {
        data = context.getImageData(0, 0, width, height);
    } catch(e) {
        /* security error, img on diff domain */
        return defaultRGB;
    }

    length = data.data.length;

    while ( (i += blockSize * 4) < length ) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i+1];
        rgb.b += data.data[i+2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);

    return rgb;

}

function setDynamicFrame(imgElement) {
    var color = getAverageRGB(imgElement);
    var colorToCSS = "rgb(" + color.r + "," + color.g + "," + color.b + ")";
    imgElement.style.border = "solid 10px " + colorToCSS;
}