import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppCoreModule } from './core/core.module';
import { PedidosModule } from './routes/pedidos.module';
import { SpinnerModule } from './core/spinner/spinner.module'; 

import { HTTP_INTERCEPTORS,HttpClientModule } from '@angular/common/http';
import { SpinnerInterceptor } from './interceptors/spinner.interceptors';




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,    
    AppCoreModule
    // PedidosModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:SpinnerInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
