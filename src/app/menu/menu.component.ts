import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { HomeComponent } from '../home/home.component';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [
    trigger('toggleMenu', [
      state('hidden', style({
        opacity: 0,
        left: '-400px',
        'display': 'none'
      })),
      state('visible', style({
        opacity: 1,
        'display': 'inherit'
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})

export class MenuComponent implements OnInit {

  toggleMenuState = 'hidden';

  constructor(private home: HomeComponent,
              private router: Router) { }

  ngOnInit() {
    this.home.toggle.subscribe(res => {
      this.toggleMenu();
    });

    // se a rota for alterada, fechamos o menu
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd && this.toggleMenuState !== 'hidden') {
        this.toggleMenu();
      }
    });
  }

  // alterar status do menu
  toggleMenu() {
    this.toggleMenuState = this.toggleMenuState === 'hidden' ? 'visibile' : 'hidden';
  }

}
