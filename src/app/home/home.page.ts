import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../services/pokemon.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonItem, IonThumbnail, 
  IonButton, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonSearchbar, IonToggle 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [FormsModule,
    IonCardTitle, IonCardHeader, IonCard, IonLabel, IonHeader, IonToolbar, IonTitle, 
    IonContent, IonItem, IonThumbnail, RouterModule, IonButtons, CommonModule, 
    IonButton, IonSearchbar, IonToggle 
  ],
})
export class HomePage implements OnInit {
  pokemonList: any[] = [];
  pokemonsFiltrados: any[] = [];
  viewMode: string = 'list';
  filtro: string = '';
  searchTerm: string = '';
  isDarkMode: boolean = false;  

  constructor(private pokemonService: PokemonService, private renderer: Renderer2) {}

  ngOnInit() {
    this.pokemonService.getPokemonList().subscribe((response) => {
      this.pokemonList = response.results;
      this.pokemonsFiltrados = response.results;
    });
    this.aplicarTema();
    this.loadTheme();
  }

  toggleView(mode: string) {
    this.viewMode = mode;
  }

  filtrarPokemons(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.pokemonsFiltrados = this.pokemonList.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTerm)
    );
  }


  toggleTheme(event: any) {
    this.isDarkMode = event.detail.checked;
    localStorage.setItem('dark-mode', this.isDarkMode ? 'true' : 'false');

    if (this.isDarkMode) {
      this.renderer.addClass(document.body, 'dark-theme');
      this.renderer.removeClass(document.body, 'light-theme');
    } else {
      this.renderer.addClass(document.body, 'light-theme');
      this.renderer.removeClass(document.body, 'dark-theme');
    }
  }

  
  aplicarTema() {
    const htmlElement = document.documentElement; 
    if (this.isDarkMode) {
      this.renderer.addClass(htmlElement, 'dark-theme');
    } else {
      this.renderer.removeClass(htmlElement, 'dark-theme');
    }
    this.loadTheme();
  }

  loadTheme() {
    const savedTheme = localStorage.getItem('dark-mode');
    this.isDarkMode = savedTheme === 'true';
    localStorage.setItem('dark-mode', this.isDarkMode ? 'true' : 'false');
    if (this.isDarkMode) {
      this.isDarkMode = true;
      this.renderer.addClass(document.body, 'dark-theme');
      this.renderer.removeClass(document.body, 'light-theme');
    } else {
      this.isDarkMode = false;
      this.renderer.addClass(document.body, 'light-theme');
      this.renderer.removeClass(document.body, 'dark-theme');
    }
  }
  
}
