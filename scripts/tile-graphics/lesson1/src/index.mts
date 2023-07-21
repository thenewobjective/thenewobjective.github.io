import { TileControl } from "./presentation/Tile/TileControl.mjs";
import { TileEngineControl } from "./presentation/TileEngine/TileEngineControl.mjs";

const tileEngine = new TileEngineControl(
    new TileControl(0),
    new TileControl(1),
    new TileControl(2)
);

tileEngine.start()
