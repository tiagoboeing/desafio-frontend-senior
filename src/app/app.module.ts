import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxCurrencyModule } from 'ngx-currency';
import { TextMaskModule } from 'angular2-text-mask';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ListagemComponent } from './listagem/listagem.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { ROUTES } from './app.routes';
import { FooterComponent } from './footer/footer.component';
import { PersonalizacaoComponent } from './personalizacao/personalizacao.component';
import { ItemComponent } from './listagem/item/item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemService } from './listagem/item/item.service';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './menu/menu.component';
import { SnackbarComponent } from './shared/messages/snackbar/snackbar.component';
import { NotificationService } from './shared/messages/notification.service';

export const customCurrencyMaskConfig = {
  align: 'left',
  allowNegative: false,
  allowZero: true,
  decimal: ',',
  precision: 2,
  prefix: 'R$ ',
  suffix: '',
  thousands: '.',
  nullable: true
};

@NgModule({
  declarations: [
    AppComponent,
    ListagemComponent,
    CadastroComponent,
    HomeComponent,
    NotFoundComponent,
    FooterComponent,
    PersonalizacaoComponent,
    ItemComponent,
    MenuComponent,
    SnackbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES, {
      preloadingStrategy: PreloadAllModules,
      useHash: true
    }),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TextMaskModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig)
  ],
  providers: [ItemService, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
