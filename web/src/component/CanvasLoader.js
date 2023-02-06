
function blockColorMultiply(ctx, colorData, originalData) {
    const newBlock = ctx.createImageData(35, 35);
    const blockData = newBlock.data;
    
    for (let i = 0; i < originalData.length; i += 4) {
        blockData[i]     = originalData[i]     * (colorData[0] / 255);
        blockData[i + 1] = originalData[i + 1] * (colorData[1] / 255);
        blockData[i + 2] = originalData[i + 2] * (colorData[2] / 255);
        blockData[i + 3] = originalData[i + 3] * (colorData[3] / 255);
    }

    return newBlock;
}

export default async function loadColorBlocks(context) {
    return new Promise((resolve, reject) => {
        const colors = [
            [0, 255, 0, 255],
            [0, 0, 255, 255],
            [255, 0, 0, 255],
            [1, 255, 254, 255],
            [255, 166, 254, 255],
            [255, 219, 102, 255],
            [0, 100, 0, 255],
            [255, 238, 232, 255]
        ];

        const colorBlocks = new Array(8);
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = 200;
        tempCanvas.height = 200;
        
        const block = new Image();
        block.src = "block.bmp";

        block.onload = () => {
            const tempctx = tempCanvas.getContext("2d");
            tempctx.drawImage(block, 0, 0, 35, 35);

            const imageData = tempctx.getImageData(0, 0, 35, 35);
            const origData = imageData.data;

            for(let i = 0; i < colors.length; i ++) {
                colorBlocks[i] = blockColorMultiply(context, colors[i], origData);
            }

            tempCanvas.remove();
            resolve(colorBlocks);
        }
        
        block.onerror = () => {
            reject("Image error");
        };
    });
}