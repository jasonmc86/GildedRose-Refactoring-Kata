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
  irregularItems = ['Aged Brie', 'Backstage passes to a TAFKAL80ETC concert', 'Sulfuras, Hand of Ragnaros']

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

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

  updateBackstageItemQuality(item: Item) {
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

  updateItemSellIn(item: Item) {
    item.sellIn--;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const currentItem = this.items[i];
      const isRegularItem = !this.irregularItems.includes(currentItem.name);

      if (currentItem.name !== 'Sulfuras, Hand of Ragnaros') {
        this.updateItemSellIn(currentItem);
      }

      // updating quality
      if(currentItem.name !== 'Sulfuras, Hand of Ragnaros') {
        if (currentItem.name === 'Backstage passes to a TAFKAL80ETC concert') {
          this.updateBackstageItemQuality(currentItem);
        } else {
          this.updateItemQuality(currentItem, isRegularItem);
        }
      }
    }

    return this.items;
  }
}
