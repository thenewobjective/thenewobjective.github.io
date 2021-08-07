import Graphic from "./Graphic.js";

class ImageGraphic extends Graphic {
    clone() {
        return new ImageGraphic({imageData: this.imageData})
    }
}

export default ImageGraphic