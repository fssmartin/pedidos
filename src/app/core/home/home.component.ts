import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  
import { Map, icon, marker, tileLayer } from 'leaflet';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  idPedido!:any;

  constructor(private route: ActivatedRoute) { } 

  lat = 40.41684517;
  long = -3.68375659;
  
  ngOnInit() { 

    this.idPedido = this.route.snapshot.paramMap.get("id") || null;

    setTimeout(() => {
                        
        const map = new Map('map').setView([40.41684517, -3.68375659], 14);  

        let pedidoIcon = icon({ 
          iconUrl: 'assets/img/blue-dot.png', 
          iconSize: [35, 35], 
          popupAnchor :[0, -10],                                    
        });

        marker(
          [this.lat, this.long],
          {icon: pedidoIcon})
          .addTo(map);   

        tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', {
          maxZoom: 16,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    
    }, 500);

  }


}
