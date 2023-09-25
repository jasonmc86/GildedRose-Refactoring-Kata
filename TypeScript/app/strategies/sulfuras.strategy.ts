import { IStrategy } from "./istrategy.interface";
import { Item } from "../gilded-rose";

export class SulfurasStrategy implements IStrategy
{
  updateQuality(item: Item) {
    // no op
  }
  updateSellIn(item: Item) {
    // no op
  }
}
