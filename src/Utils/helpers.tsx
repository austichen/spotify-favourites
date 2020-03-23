export const parseUrlHash = (urlHash : string) => {
    const params : any = {}
    urlHash.substring(1).split('&').forEach((param: string) => {
        const [key, value] = param.split('=')
        params[key] = value
    })
    return params
}

export const arrayToComaSeparatedString = (arr: string[]):string => arr.reduce((ret, str) => `${ret}${str}, `, '').slice(0, -2)

export const getImgDataUrl = (imgElem : HTMLImageElement):string => {
    const canvas : HTMLCanvasElement = document.createElement('canvas')
    const context = canvas.getContext && canvas.getContext('2d')
    if (context === null) {
        throw new Error('Unable to grab canvas context')
    }
    canvas.height = imgElem.height;
    canvas.width = imgElem.width;
    context.drawImage(imgElem, 0, 0);
    const dataUrl = canvas.toDataURL("image/png")
    return dataUrl;
}

// https://stackoverflow.com/questions/2541481/get-average-color-of-image-via-javascript
export const getAverageImgColour = (imgElem: HTMLImageElement) => {
    let blockSize : number = 5, // only visit every 5 pixels
        defaultRGB = { r: 0, g: 0, b: 0 }, // for non-supporting envs
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height,
        i = -4,
        length,
        rgb = { r: 0, g: 0, b: 0 },
        count = 0;

    if (!context) {
        return defaultRGB;
    }

    height = canvas.height = imgElem.height;
    width = canvas.width = imgElem.width;
    context.drawImage(imgElem, 0, 0);
    try {
        data = context.getImageData(0, 0, width, height);
    } catch (e) {
        return defaultRGB;
    }

    length = data.data.length;

    while ((i += blockSize * 4) < length) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i + 1];
        rgb.b += data.data[i + 2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r / count);
    rgb.g = ~~(rgb.g / count);
    rgb.b = ~~(rgb.b / count);


    return rgb;
}