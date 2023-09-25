import { Item, GildedRose } from '../app/gilded-rose';

const items = [
  new Item("+5 Dexterity Vest", 10, 20), //
  new Item("Aged Brie", 2, 0), //
  new Item("Elixir of the Mongoose", 5, 7), //
  new Item("Sulfuras, Hand of Ragnaros", 0, 80), //
  new Item("Sulfuras, Hand of Ragnaros", -1, 80),
  new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
  new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
  new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
  // this conjured item does not work properly yet
  new Item("Conjured Mana Cake", 3, 6)];


const gildedRose = new GildedRose(items);

let days: number = 31;
if (process.argv.length > 2) {
    days = +process.argv[2];
  }

for (let i = 0; i < days; i++) {
  console.log("-------- day " + i + " --------");
  console.log("name, sellIn, quality");
  items.forEach(element => {
    console.log(element.name + ' ' + element.sellIn + ' ' + element.quality);

  });
  console.log();
  gildedRose.updateQuality();
  /*
    -------- day 30 --------
    name, sellIn, quality
    +5 Dexterity Vest -20 0
    Aged Brie -28 50
    Elixir of the Mongoose -25 0
    Sulfuras, Hand of Ragnaros 0 80
    Sulfuras, Hand of Ragnaros -1 80
    Backstage passes to a TAFKAL80ETC concert -15 0
    Backstage passes to a TAFKAL80ETC concert -20 0
    Backstage passes to a TAFKAL80ETC concert -25 0
    Conjured Mana Cake -27 0
  */
}
