import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ListagemComponent } from './listagem/listagem.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PersonalizacaoComponent } from './personalizacao/personalizacao.component';

export const ROUTES: Routes = [
    {
        path: '', component: HomeComponent,
        children: [
            { path: '', component: ListagemComponent },
            { path: 'listagem', component: ListagemComponent },
            { path: 'cadastro', component: CadastroComponent },
            { path: 'personalizacao', component: PersonalizacaoComponent }
        ]
    },
    { path: '**', component: NotFoundComponent }
];
