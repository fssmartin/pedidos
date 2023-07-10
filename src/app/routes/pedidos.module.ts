import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PedidosRoutingModule } from './pedidos-routing.module'; 

import { MapaComponent } from './mapa/mapa.component';
import { EmptyComponent } from './empty/empty.component';
import { PedidosComponent } from './pedidos.component';
import { GoogleMapsModule} from '@angular/google-maps'



@NgModule({
  declarations: [
    MapaComponent,
    EmptyComponent,
    PedidosComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    GoogleMapsModule
  ],
  exports:[ 
    PedidosComponent
  ]
})
export class PedidosModule { }
