import { StoreFactory } from "./store.factory";

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    const factory = new StoreFactory();
    for (let i = 0; i < this.items.length; i++) {
      const currentItem = this.items[i];
      const processor = factory.getItemStrategyProcessor(currentItem.name);

      // TODO: could make these one method processor.update()
      processor.updateQuality(currentItem);
      processor.updateSellIn(currentItem);
    }

    return this.items;
  }
}
