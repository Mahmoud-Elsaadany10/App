import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seemore'
})
export class SeemorePipe implements PipeTransform {

  transform(seemore : string , limit :number): string {
    return seemore.split(" ").slice(0 , limit).join(" "); // return slice of large words {{item.movies | seemore:30 }}
  }
}
// my name
//spilt return ["my" ,"name"]
// spilt slice 10 words
// join return to string (" ") with spaceng
