import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  describe('updateQuality', () => {
    describe('Given regular item', () => {
      it('sellIn is lowered by 1', () => {
        const originalSellIn = 5;
        const gildedRose = new GildedRose([new Item('foo', originalSellIn, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(originalSellIn - 1);
      });

      it('quality is lowered by 1', () => {
        const originalQuality = 5;
        const gildedRose = new GildedRose([new Item('foo', 5, originalQuality)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(originalQuality - 1);
      });

      it('once sellIn date is negative, quality degrades twice as fast', () => {
        const originalQuality = 5;
        const sellIn = -1;
        const gildedRose = new GildedRose([new Item('foo', sellIn, originalQuality)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(originalQuality - 2);
      });
    })

  })
});
