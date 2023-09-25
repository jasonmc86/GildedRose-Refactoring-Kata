import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  describe('updateQuality', () => {
    describe('Given starting seed items', () => {
      it('results in resulting items after 32 days', () => {
        const actualItems = setupAndRunGildedRoseWithItemsTimes(startingSeedItems, 30)
        expect(actualItems).toStrictEqual(expectedItemsAfter30Days);
      })

      const setupAndRunGildedRoseWithItemsTimes = (items: Item[], times: number) => {
        const gildedRose = new GildedRose(items);

        for(let i = 0; i < times; i++) {
          gildedRose.updateQuality();
        }

        return gildedRose.items;
      };

      const startingSeedItems = [
        new Item('+5 Dexterity Vest',10, 20),
        new Item('Aged Brie',2, 0),
        new Item('Elixir of the Mongoose',5, 7),
        new Item('Sulfuras, Hand of Ragnaros',0, 80),
        new Item('Sulfuras, Hand of Ragnaros',-1, 80),
        new Item('Backstage passes to a TAFKAL80ETC',15, 20),
        new Item('Backstage passes to a TAFKAL80ETC',10, 49),
        new Item('Backstage passes to a TAFKAL80ETC',5, 49),
        new Item('Conjured Mana Cake',3, 6),
      ];

      const expectedItemsAfter30Days = [
        new Item('+5 Dexterity Vest',-20, 0),
        new Item('Aged Brie',-28, 50),
        new Item('Elixir of the Mongoose',-25, 0),
        new Item('Sulfuras, Hand of Ragnaros',0, 80),
        new Item('Sulfuras, Hand of Ragnaros',-1, 80),
        new Item('Backstage passes to a TAFKAL80ETC',-15, 0),
        new Item('Backstage passes to a TAFKAL80ETC',-20, 0),
        new Item('Backstage passes to a TAFKAL80ETC',-25, 0),
        new Item('Conjured Mana Cake',-27, 0), // TODO: UPDATE ME TO REFLECT ACTUAL EXPECTATION
      ];
    })

    describe('Given any item', () => {
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

      it('when quality would otherwise be set to negative, set 0', () => {
        const originalQuality = 1;
        const sellIn = -1;
        const actualItem = setupAndRunGildedRoseWithItemUnderTest(sellIn, originalQuality)

        expect(actualItem.quality).toBe(0);
      });

      describe('Aged Brie special item', () => {
        const itemName = 'Aged Brie';

        it('when sellIn decreases, quality actually increases', () => {
          const originalQuality = 5;
          const actualItem = setupAndRunGildedRoseWithItemUnderTest(undefined, originalQuality, itemName)

          expect(actualItem.quality).toBe(originalQuality + 1);
        });

        it('when quality increases, it never passes 50', () => {
          const originalQuality = 50;
          const actualItem = setupAndRunGildedRoseWithItemUnderTest(undefined, originalQuality, itemName)

          expect(actualItem.quality).toBe(originalQuality);
        });
      });

      describe('Sulfuras special item', () => {
        const itemName = 'Sulfuras, Hand of Ragnaros';

        it('sellIn never changes', () => {
          const originalSellIn = 5;
          const actualItem = setupAndRunGildedRoseWithItemUnderTest(originalSellIn, undefined, itemName)

          expect(actualItem.sellIn).toBe(originalSellIn);
        });

        it('quality never changes', () => {
          const originalQuality = 5;
          const actualItem = setupAndRunGildedRoseWithItemUnderTest(undefined, originalQuality, itemName)

          expect(actualItem.quality).toBe(originalQuality);
        });
      });

      describe('Backstage passes special item', () => {
        const itemName = 'Backstage passes to a TAFKAL80ETC concert';

        it('when sellIn decreases, quality actually increases', () => {
          const originalSellin = 20;
          const originalQuality = 5;
          const actualItem = setupAndRunGildedRoseWithItemUnderTest(originalSellin, originalQuality, itemName)

          expect(actualItem.quality).toBe(originalQuality + 1);
        });

        it('when sellIn is equal or below 10 days, quality actually increases by 2', () => {
          const originalSellin = 10;
          const originalQuality = 5;
          const actualItem = setupAndRunGildedRoseWithItemUnderTest(originalSellin, originalQuality, itemName)

          expect(actualItem.quality).toBe(originalQuality + 2);
        });

        it('when sellIn is equal or below 5 days, quality actually increases by 3', () => {
          const originalSellin = 5;
          const originalQuality = 5;
          const actualItem = setupAndRunGildedRoseWithItemUnderTest(originalSellin, originalQuality, itemName)

          expect(actualItem.quality).toBe(originalQuality + 3);
        });

        it('when sellIn is below 0, quality sets to 0', () => {
          const originalSellin = -1;
          const originalQuality = 5;
          const actualItem = setupAndRunGildedRoseWithItemUnderTest(originalSellin, originalQuality, itemName)

          expect(actualItem.quality).toBe(0);
        });
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
