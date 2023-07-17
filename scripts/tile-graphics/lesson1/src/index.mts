import { ApplicationControl } from "./presentation/ApplicationControl.mjs";
import { TileControl } from "./presentation/TileControl.mjs";

const app = new ApplicationControl([
    new TileControl(0),
    new TileControl(1),
    new TileControl(2),
]);

app.start()
