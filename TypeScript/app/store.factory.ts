import { BackstageStrategy } from "./strategies/backstage.strategy";
import { BrieStrategy } from "./strategies/brie.strategy";
import { IStrategy } from "./strategies/istrategy.interface";
import { RegularItemStrategy } from "./strategies/regular-item.strategy";
import { SulfurasStrategy } from "./strategies/sulfuras.strategy";

export class StoreFactory
{
  // TODO: could make IStrategy have a ItemName static and use that instead
  readonly SulfuraItemName = 'Sulfuras, Hand of Ragnaros';
  readonly BackStageItemName = 'Backstage passes to a TAFKAL80ETC concert';
  readonly BrieItemName = 'Aged Brie'

  public getItemStrategyProcessor(itemName: string): IStrategy {
    switch (itemName) {
      case this.SulfuraItemName: {
        return new SulfurasStrategy();
      }
      case this.BackStageItemName: {
        return new BackstageStrategy();
      }
      case this.BrieItemName: {
        return new BrieStrategy();
      }
      // TODO: Update with Conjured Mana Cake
      default:
        return new RegularItemStrategy();
    }
  }
}
