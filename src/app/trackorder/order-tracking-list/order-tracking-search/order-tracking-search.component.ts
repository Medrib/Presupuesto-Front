import { Component, EventEmitter, Output } from '@angular/core';
import { LanguageService } from '../../order-service/language-control-service.service';

@Component({
  selector: 'app-order-tracking-search',
  templateUrl: './order-tracking-search.component.html',
  styleUrls: ['./order-tracking-search.component.css']
})
export class OrderTrackingSearchComponent {
  @Output() searchValues = new EventEmitter<number>();
  material!: number ;
  focusedInput!: string;

  constructor(private languageService: LanguageService) {}

  onSearchButtonClick(): void {
    this.searchValues.emit(this.material);
  }

  onLanguageChange(): void {
    this.languageService.changeLanguage();
  }
}
