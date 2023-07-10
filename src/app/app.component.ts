import { Component } from '@angular/core';
import { Map, marker, tileLayer } from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent { 
  marca!:any;

  onMarca(marca:any){ 
    this.marca = marca;
  }   

  ngOnnit():void{
    // const map = new Map('map').setView([40.41684517, -3.68375659], 13);  
    
    // tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', {
    //   maxZoom: 13,
    //   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    // }).addTo(map);

    // marker([40.41684517, -3.68375659]).addTo(map);
  }
}
