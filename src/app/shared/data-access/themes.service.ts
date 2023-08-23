import { Injectable, Signal, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemesService {
  private themes = signal<string>('light');

  // selector

  theme = computed(() => this.themes());
  setTheme(theme: string) {
    this.themes.set(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);

  }


  constructor() { }

}
