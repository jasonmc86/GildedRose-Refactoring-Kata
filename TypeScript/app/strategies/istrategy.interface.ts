import { Item } from "../gilded-rose";

export interface IStrategy {
  updateQuality(item: Item)
  updateSellIn(item: Item)
}
