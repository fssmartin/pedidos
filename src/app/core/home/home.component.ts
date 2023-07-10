import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  
import { Map, marker, tileLayer } from 'leaflet';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  idPedido!:any;

  constructor(private route: ActivatedRoute) { } 
  
  ngOnInit() { 
    this.idPedido = this.route.snapshot.paramMap.get("id") || null;

    setTimeout(() => {
                        
        const map = new Map('map').setView([40.41684517, -3.68375659], 14);  

        tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', {
          maxZoom: 16,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    
    }, 500);

  }


}
