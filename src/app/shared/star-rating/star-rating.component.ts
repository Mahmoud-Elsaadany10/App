import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css'],
  imports :[CommonModule]
})
export class StarRatingComponent {
  @Input() rating: number = 0;
  @Input() starCount: number = 5;
  @Output() ratingUpdated = new EventEmitter<number>();

  stars: number[] = [];
  fullStars: number = 0;
  hasHalfStar: boolean = false;

  constructor() {}

  ngOnInit() {
    this.stars = Array(this.starCount).fill(0);
    this.updateStarDisplay();
  }

  ngOnChanges() {
    this.updateStarDisplay();
  }

  rate(value: number) {
    this.rating = value;
    this.ratingUpdated.emit(this.rating);
    console.log(this.rating)
    this.updateStarDisplay();

    // Send rating to API
    // this.ratingService.saveRating(this.rating).subscribe(response => {
    //   console.log('Rating saved:', response);
    // });
  }

  private updateStarDisplay() {
    this.fullStars = Math.floor(this.rating);
    this.hasHalfStar = this.rating % 1 !== 0;
  }
}
