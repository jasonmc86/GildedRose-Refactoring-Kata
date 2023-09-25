import { IStrategy } from "./istrategy.interface";
import { Item } from "../gilded-rose";

export class BackstageStrategy implements IStrategy
{
    // todo: move updateItemQuality to base class
    updateItemQuality(item: Item, qualityDecreases: boolean = true, incrementBy: number = 1) {
      const multiplier = item.sellIn < 0 ? 2 : 1;

      const subtractOrAdd = qualityDecreases ? incrementBy : -incrementBy;
      const updatedQuality = item.quality - (subtractOrAdd * multiplier);

      if (updatedQuality > 50) {
        item.quality = 50
      } else if (updatedQuality < 0) {
        item.quality = 0
      } else {
        item.quality = updatedQuality
      }
    }

  updateQuality(item: Item) {
    if (item.sellIn < 0) {
      item.quality = 0;
    } else {
      let incrementBy = 1;
      if (item.sellIn <= 5) {
        incrementBy = 3
      } else if (item.sellIn <= 10) {
        incrementBy = 2
      }
      this.updateItemQuality(item, false, incrementBy);
    }
  }
  updateSellIn(item: Item) {
    item.sellIn--; // TODO: move to base class
  }
}
