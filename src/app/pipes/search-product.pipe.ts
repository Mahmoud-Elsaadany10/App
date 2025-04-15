import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchProduct'
})
export class SearchProductPipe implements PipeTransform {

  transform(products: any[], word: string): any[] {
    if (!products || !word) {
      return products;
    }
    return products.filter((prd) =>
      prd.title.toLowerCase().includes(word.toLowerCase())
    );
  }
  }


