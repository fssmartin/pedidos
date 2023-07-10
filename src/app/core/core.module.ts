import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

  
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common'; 
import { AppRoutingModule } from '../app-routing.module';
import { HomeComponent } from './home/home.component';
import { SpinnerModule } from './spinner/spinner.module';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    FooterComponent, 
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SpinnerModule
  ],
  exports: [
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    SpinnerComponent
  ],
  providers: []
})
export class AppCoreModule { }
