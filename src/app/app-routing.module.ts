import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { PedidosComponent } from './routes/pedidos.component';

const routes: Routes = [ 
  // { path: 'pedidos', loadChildren: () => import('./routes/pedidos.module').then(m => m.PedidosModule) },
	{ path: 'pedido', component: PedidosComponent},
	{ path: 'pedido/home/:id', component: HomeComponent},
	{ path: '', component: HomeComponent},
  { path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
