import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSpinner, IonHeader, IonToggle, IonToolbar, IonButtons } from "@ionic/angular/standalone";

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  imports: [IonButtons, FormsModule, IonTitle, IonToolbar, IonToggle, IonHeader, IonSpinner, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, CommonModule],
})
export class DetailsPage implements OnInit {
  pokemon: any;
  isDarkMode = false;
  allPokemons: any[] = [];
  currentPokemonIndex: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService,
    private renderer: Renderer2,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.pokemonService.getPokemonList().subscribe(pokemons => {
      this.allPokemons = pokemons.results; 
      this.route.paramMap.subscribe(params => {
        const name = params.get('name');
        if (name) {
          this.loadPokemonDetails(name);
        }
      });
    });

    this.aplicarTema();
    this.loadTheme();
  }

  loadPokemonDetails(name: string) {
    this.pokemonService.getPokemonDetails(name).subscribe(data => {
      this.pokemon = data;
      if (this.allPokemons.length > 0) {
        this.currentPokemonIndex = this.allPokemons.findIndex(p => p.name === name);
      }
    });
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

  loadTheme() {
    const savedTheme = localStorage.getItem('dark-mode');
    this.isDarkMode = savedTheme === 'true';

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

  getTipoTraduzido(tipo: string): string {
    const tipos: Record<string, string> = {
      normal: 'Normal', fire: 'Fogo', water: 'Água', grass: 'Grama',
      electric: 'Elétrico', ice: 'Gelo', fighting: 'Lutador', poison: 'Venenoso',
      ground: 'Terrestre', flying: 'Voador', psychic: 'Psíquico', bug: 'Inseto',
      rock: 'Pedra', ghost: 'Fantasma', dragon: 'Dragão', dark: 'Sombrio',
      steel: 'Metálico', fairy: 'Fada'
    };
    return tipos[tipo] ?? tipo;
  }

  formatarAltura(altura: number): string {
    return altura < 10 ? `0.${altura} cm` : `${(altura / 10).toFixed(1)} m`;
  }

  formatarPeso(peso: number): string {
    const pesoString = peso.toString();
    if (peso < 100) return `${pesoString.slice(0, 1)}.${pesoString.slice(1)} kg`;
    if (peso < 1000) return `${pesoString.slice(0, 2)}.${pesoString.slice(2)} kg`;
    return `${pesoString.slice(0, 3)}.${pesoString.slice(3)} kg`;
  }

  voltarParaHome() {
    this.navCtrl.navigateRoot('/home');
  }

  carregarPokemonAnterior() {
    if (this.currentPokemonIndex > 0) {
      const previousPokemon = this.allPokemons[this.currentPokemonIndex - 1];
      this.router.navigateByUrl(`/details/${previousPokemon.name}`).then(() => {
        window.location.reload();
      });
    }
  }

  carregarProximoPokemon() {
    if (this.currentPokemonIndex < this.allPokemons.length - 1) {
      const nextPokemon = this.allPokemons[this.currentPokemonIndex + 1];
      this.router.navigateByUrl(`/details/${nextPokemon.name}`).then(() => {
        window.location.reload();
      });
    }
  }
}
