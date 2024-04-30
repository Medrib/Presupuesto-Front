import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<string>('es');
  currentLanguage$ = this.currentLanguageSubject.asObservable();

  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang('es');
    this.translateService.use('es');
  }

  changeLanguage(): void {
    const newLanguage = this.currentLanguageSubject.value === 'es' ? 'en' : 'es';
    this.translateService.use(newLanguage);
    this.currentLanguageSubject.next(newLanguage);
  }
}
