import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../order-service/language-control-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentComponent: string | null = null;
  dropdownOpen = false;
  translationsLoaded = false;
  currentLanguage: string;
  private languageSubscription: Subscription;
  selectedComponent: string | null = null;

  constructor(
    public translate: TranslateService,
    public languageService: LanguageService
  ) {
    this.currentLanguage = this.translate.currentLang; 
    
    this.languageSubscription = this.languageService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;
    });
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  showComponent(component: string) {
    this.currentComponent = component;
    this.selectedComponent = component;
  }

  onLanguageChange(): void {
    this.languageService.changeLanguage();
    
  }
}
