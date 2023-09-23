import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  describe('updateQuality', () => {
    describe('Given regular item', () => {
      it('sellIn is lowered by 1', () => {
        const originalSellIn = 5;
        const actualItem = setupAndRunGildedRoseWithItemUnderTest(originalSellIn)

        expect(actualItem.sellIn).toBe(originalSellIn - 1);
      });

      it('quality is lowered by 1', () => {
        const originalQuality = 5;
        const actualItem = setupAndRunGildedRoseWithItemUnderTest(undefined, originalQuality)

        expect(actualItem.quality).toBe(originalQuality - 1);
      });

      it('once sellIn date is negative, quality degrades twice as fast', () => {
        const originalQuality = 5;
        const sellIn = -1;
        const actualItem = setupAndRunGildedRoseWithItemUnderTest(sellIn, originalQuality)

        expect(actualItem.quality).toBe(originalQuality - 2);
      });

      const setupAndRunGildedRoseWithItemUnderTest = (sellIn: number = 5, quality: number = 5, name: string = 'foo') => {
        const itemUnderTest = new Item(name, sellIn, quality);
        const gildedRose = new GildedRose([itemUnderTest]);
        const items = gildedRose.updateQuality();
        return items[0];
      };
    })
  })
});
