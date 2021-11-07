import cv from './opencv.js'; //use cv

// if (cv.getBuildInformation)
// {
//     console.log(cv.getBuildInformation());
// }
// else
// {
//     // WASM
//     cv['onRuntimeInitialized']=()=>{
//         console.log(cv.getBuildInformation());
//     }
// }

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
        for (let i = indexMax; i > -1; i--) {
            if (!hist[i] && (i < (indexMax - 1))) {
                indexMin = i;
                break;
            }
        }

        let distances = [];
        const x1 = indexMin;
        const y1 = hist[indexMin];
        const x2 = indexMax;
        const y2 = hist[indexMax];
        const distanceMinMax = Math.sqrt((y2 - y1) ^ 2 + (x2 - x1) ^ 2);
        for (let i = indexMin + 1; i < indexMax; i++) {
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
        const alpha = 255;

        const blackColor = [0, 0, 0, alpha];
        const whiteColor = [255, 255, 255, alpha];
        const thresholdColor = [threshold, threshold, threshold, alpha];

        const src = imageMatrix.get(0);
        // let src = cv.imread(image, cv.IMREAD_GRAYSCALE);
        const drawingMask = new cv.Mat();
        const notDrawingMask = new cv.Mat();
        const low = new cv.Mat(src.rows, src.cols, src.type(), blackColor);
        const tresh = new cv.Mat(src.rows, src.cols, src.type(), thresholdColor);

        // select only the pixels between black and threshold
        cv.inRange(src, low, tresh, drawingMask);
        cv.bitwise_not(drawingMask, notDrawingMask);

        // set selected pixels to black, and the rest to white
        src.setTo(blackColor, drawingMask);
        src.setTo(whiteColor, notDrawingMask);

        // SOME EROSION AND DILATION - INCOMPLETE

        // const eroded = new cv.Mat();
        // let kernel = cv.getStructuringElement(cv.MORPH_ELLIPSE, new cv.Size(3, 3))
        // cv.erode(notDrawingMask, eroded, kernel);

        // const reverseEroded = new cv.Mat();
        // cv.bitwise_not(eroded, reverseEroded);

        // const imgDilated = new cv.Mat();
        // kernel = cv.getStructuringElement(cv.MORPH_RECT,new cv.Size(5,5));
        // cv.dilate(reverseEroded, imgDilated, kernel, new cv.Point(-1, 1), 1);

        // morphologyEx() to perform more operations ????

        // reverseEroded.delete(); kernel.delete();
        drawingMask.delete(); low.delete(); tresh.delete(); 

        return src;
    },
    updateOpenCVImageInCanvas: (canvasId, imageSrc) => {
        cv.imshow(canvasId, imageSrc);
    },
    findContours: (source) => {
        let dst = cv.Mat.zeros(src.cols, src.rows, cv.CV_8UC3);
        let contours = new cv.MatVector();
        let hierarchy = new cv.Mat();
        cv.findContours(source, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_NONE);

        let maxContour = 0;
        for (let i = 0; i < contours.size(); ++i) {
            if(cv.contourArea(contours.get(i)) > cv.contourArea(contours.get(maxContour))) {
                maxContour = i;
            }
        }
        let color = new cv.Scalar(Math.round(Math.random() * 255), Math.round(Math.random() * 255),
                                Math.round(Math.random() * 255));
        cv.drawContours(dst, contours, maxContour, color, 1, cv.LINE_8, hierarchy, 100);
        // cv.imshow('canvasOutput', dst);
        source.delete(); contours.delete(); hierarchy.delete();

        // contours, hierarchy = cv2.findContours(thresh.astype(np.uint8), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
        return dst;
    }
}

export default imgProcess;