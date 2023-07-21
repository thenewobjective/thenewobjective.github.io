import { TileControl } from "./presentation/Tile/TileControl.mjs";
import { TileEngineControl } from "./presentation/TileEngine/TileEngineControl.mjs";

const tileEngine = new TileEngineControl(
    new TileControl(0, 64),
    new TileControl(1, 64),
    new TileControl(2, 64)
);

tileEngine.start()
