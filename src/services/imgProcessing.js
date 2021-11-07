import cv from './opencv.js'; //use cv

const imgProcess = {
    getImageAsMatrix: (image) => {
        let img = cv.imread(image);
        let srcVec = new cv.MatVector();
        srcVec.push_back(img);
        return srcVec;
    },
    getHistogram: (srcVec) => {

        let accumulate = false;
        let channels = [0];
        let histSize = [256];
        let ranges = [0, 255];
        let hist = new cv.Mat();
        let mask = new cv.Mat();
        cv.calcHist(srcVec, channels, mask, hist, histSize, ranges, accumulate);
        //access histogram in hist.data32F

        return hist.data32F;
    },

    getMaxDeviationThreshold: (hist) => {
        //get maximum value and its index from the histogram
        hist = Array.from(hist);

        let maximum = Math.max(...hist);
        let indexMax = hist.indexOf(maximum);
        let indexMin = 0;
        for(let i=indexMax; i > -1; i--) {
            if(!hist[i] &&  (i < (indexMax-1))) {
                indexMin = i;
                break;
            }
        }

        let distances = [];
        const x1 = indexMin;
        const y1 = hist[indexMin];
        const x2 = indexMax;
        const y2 = hist[indexMax];
        const distanceMinMax = Math.sqrt((y2 - y1)^2 + (x2 - x1)^2);
        for(let i=indexMin+1; i<indexMax; i++) {
            const x0 = i;
            const y0 = hist[i];
            const distance = Math.abs(((y2 - y1) * x0 - (x2 - x1) * y0 + x2 * y1 - y2 * x1) / distanceMinMax);
            distances.push(distance);
        }
        const indexLargestDistance = distances.indexOf(Math.max(...distances));
        return indexLargestDistance + indexMin;
    },

    getThresholdedImage: (imageMatrix, threshold) => {
        
        // opacity: full
        let alpha = 255;
        
        let blackColor = [0, 0, 0, alpha];
        let thresholdColor = [threshold, threshold, threshold, alpha];

        let src = imageMatrix.get(0);
        // let src = cv.imread(image, cv.IMREAD_GRAYSCALE);
        let drawingMask = new cv.Mat();
        let low = new cv.Mat(src.rows, src.cols, src.type(), blackColor);
        let high = new cv.Mat(src.rows, src.cols, src.type(), thresholdColor);

        // select only the pixels between black and threshold
        cv.inRange(src, low, high, drawingMask);

        // set selected pixels to black
        src.setTo(blackColor, drawingMask);
        

        drawingMask.delete(); low.delete(); high.delete();

        return src;
    },
    updateOpenCVImageInCanvas: (canvasId, imageSrc) => {
        cv.imshow(canvasId, imageSrc);
    }
}

export default imgProcess;