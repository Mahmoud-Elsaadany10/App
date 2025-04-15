import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true, // Only needed if using a standalone component approach
})
export class SearchPipe implements PipeTransform {
  transform(names: any[], word: string): any[] {
    if (!names || !word) {
      return names;
    }
    return names.filter((name) =>
      name.firstName.toLowerCase().includes(word.toLowerCase())
    );
  }
}
