import { Component, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core'; 
import { Router,RouterModule, Routes,ActivatedRoute   } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Observable, Subject, map, startWith, takeUntil, tap } from 'rxjs';
import { Infopedido, Marca, Tienda, Usuario } from '../models/pedido.interface';
import { ProjectService } from '../services/project.service';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { SpinnerService } from '../services/spinner.service';
import { Global } from '../services/global';

import {  Control, Map,  Routing,  icon, latLng, marker, tileLayer } from 'leaflet';
import 'leaflet-routing-machine';


@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})

export class PedidosComponent implements OnInit, OnDestroy {


  // myLatLng = { lat: 40.41684517, lng: -3.68375659 };
  // mapOptions: google.maps.MapOptions= {
  //   center: this.myLatLng,
  //   zoom: 15,
  // };

  latIni = 40.41684517;
  longIni = -3.68375659;

  isLoading$ = this.spinerSvc.isLoading$;
  nopedidob:boolean=false;

  distancePedido!:any;
  distanceTienda!:any;

  // markerOptions: google.maps.MarkerOptions = {};

  spots: { id: number; lat: number; lng: number, lb:string , tl:string , options:any, desc:string }[] = [];  
 
  idPedido!:number;
  pedidoObject!:any;
  urlTree!:any; 
  destroy$ = new Subject(); 
  paramsSubscription!: Subscription; 
  getPedidoSubscription!: Subscription;

  pedido!:Infopedido;
  usuario!:Usuario;
  tienda!:Tienda;
  marca!:Marca;  

  myobject:any;

  ErrorAuth:boolean=false;
  ErrorLoad:boolean=false;

  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;

  constructor(  
        private router: Router,
        private route: ActivatedRoute,
        private spinerSvc:SpinnerService,
        private pedidoService:ProjectService) {

    this.urlTree = this.router.parseUrl(this.router.url); 
 
  };


  ngOnInit(): void {    
    
      this.paramsSubscription = this.route.queryParamMap
        .pipe(
          takeUntil(this.destroy$),
          tap( (params:any)   =>{
            //recupero parametro URL
            this.pedidoObject = { ...params.keys, ...params };
            this.idPedido = this.pedidoObject.params.id;   
          })
        )
        .subscribe((params) => {

          if(this.idPedido){
              this.getPedido();
          }else{ 
            this.nopedidob = true;
          }   

        } 
      );

  }

  getToken(){  
    
    this.ErrorAuth =false;
    this.ErrorLoad =false;    

    this.pedidoService.getToken$().pipe(
        takeUntil(this.destroy$),
    ).subscribe((token:any) => {
        Global.token = 'Bearer '+token.jwt;
        this.getPedido();
    });

  }

  getPedido(){

    this.getPedidoSubscription = this.pedidoService.getPedido$(this.idPedido)
            .pipe( 
              takeUntil(this.destroy$),
            ).subscribe(
                (info:any) => {                      

                  this.showPedido(info);

                }, 
                error => {                  
                  if(error.error.error.status === 401){
                    // ERRROR TOKEN PEDIR DE NUEVO    
                    console.log("TOKEN INVALID -------------------------------")
                    //this.ErrorAuth =true;                
                    this.getToken();
                    this.getPedidoSubscription.unsubscribe();      
                  }else{                          
                      this.nopedidob = true;                                        
                      this.spinerSvc.hide('error api'); 
                      setTimeout(() => {                      
                          const map = new Map('map').setView([this.latIni, this.longIni], 14);  
                          tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', {
                              maxZoom: 16,
                          }).addTo(map);                    
                      }, 500);
                    }
                    
                }
            );  
  }

  showPedido(info:any){

      if(typeof info.pedido === "undefined" ){
                                                  
        this.pedido!  = { 
          estado :  {'id':0, 'status':''},
          posicion: {'id':0, 'Latitud': 0, 'Longitud': 0,'Direccion_completa': ''},
          direccion:{'id':0, 'Latitud': 0, 'Longitud': 0,'Direccion_completa': ''}                          
        };  

        this.usuario = {'Correo':'','Nombre':'','createdAt':'','publishedAt':'','updatedAt':''}                
        this.spinerSvc.hide('no existe pedido');  
    
      }else{ 

        this.usuario = info.pedido.usuario.data.attributes;
        this.pedido  = { 
          estado : info.pedido.EstadoPedido,
          posicion: info.pedido.PosicionPedido,
          direccion: info.pedido.DireccionPedido,
        };   
        
        this.tienda  = info.pedido.tienda.data.attributes;                      
        this.marca   = info.pedido.tienda.data.attributes.marca.data.attributes;  

        // this.myLatLng = { lat: this.pedido.posicion.Latitud, lng: this.pedido.posicion.Longitud }; 
        // this.mapOptions = {
        //   center: this.myLatLng,
        //   zoom: 15,
        // };

              
        let gps1 = new google.maps.LatLng(this.pedido.direccion.Latitud, this.pedido.direccion.Longitud);
        let gps2 = new google.maps.LatLng(this.pedido.posicion.Latitud, this.pedido.posicion.Longitud);
        let gps3 = new google.maps.LatLng(this.tienda.Latitud, this.tienda.Longitud);

        this.distancePedido = google.maps.geometry.spherical.computeDistanceBetween(gps1, gps2).toFixed();
        this.distanceTienda = google.maps.geometry.spherical.computeDistanceBetween(gps1, gps3).toFixed();

        // this.spots=[
        //   { 
        //     id: 1, 
        //     lat: this.pedido.direccion.Latitud, 
        //     lng: this.pedido.direccion.Longitud, 
        //     lb:'CASA' , 
        //     tl:'My Home ' + this.idPedido , 
        //     options : {
        //       draggable: false, 
        //       icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'                                
        //       // icon: 'assets/img/home.png'
        //     },
        //     desc:'My Home ' + this.idPedido
        //   },                                                          
        //   { 
        //     id: 2, lat: this.tienda.Latitud, lng: this.tienda.Longitud ,
        //     lb:'TIENDA', tl:this.tienda.Nombre + ",  a " +this.distanceTienda + " Metros" ,
        //     options : {
        //       draggable: true, 
        //       icon:'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        //     },
        //     desc: this.tienda.Nombre
        //   },
        //   { 
        //     id: 3, lat: this.pedido.posicion.Latitud, lng: this.pedido.posicion.Longitud, 
        //     lb:'PEDIDO '+this.distancePedido + " Metros", tl:"A "+this.distancePedido + " Metros", 
        //     options : {
        //       draggable: false, 
        //       icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
        //     },
        //     desc:'PEDIDO '+this.distancePedido + " Metros"
        //   }
        // ]

      }  
      
      setTimeout(() => {
        
            // let sumaLat = (this.pedido.direccion.Latitud +  this.tienda.Latitud) / 2;
            // let sumaLong = (this.pedido.direccion.Longitud +  this.tienda.Longitud) / 2;

            // Calculo punto medio 
            let sumaLat = (this.pedido.direccion.Latitud +  this.pedido.posicion.Latitud) / 2;
            let sumaLong = (this.pedido.direccion.Longitud +  this.pedido.posicion.Longitud) / 2;

            const map = new Map('map').setView([sumaLat, sumaLong],16);                            
              
            tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', {
              maxZoom: 15,
            }).addTo(map);
        
            //Iconos home , tienda , pedido
            let homeIcon  = icon({ 
                iconUrl: 'assets/img/home.png', 
                iconSize: [65, 70], 
                popupAnchor: [0, 0],                           
            });

            let storeIcon = icon({ 
              iconUrl: 'assets/img/store.png', 
              iconSize: [65, 70], 
              popupAnchor :[0, 0],                                    
            });

            let pedidoIcon = icon({ 
              iconUrl: 'assets/img/blue-dot.png', 
              iconSize: [35, 35], 
              popupAnchor :[0, -10],                                    
            });

            // Posicionamiento en mapa de home , tienda , pedido
            // tooltip y pop up
            marker(
              [this.pedido.direccion.Latitud, this.pedido.direccion.Longitud], 
              {icon: homeIcon})
              .addTo(map)
              .bindTooltip("CASA")                            
              .bindPopup(this.pedido.direccion.Direccion_completa)
            marker(
              [this.pedido.posicion.Latitud, this.pedido.posicion.Longitud],
              {icon: pedidoIcon})
              .addTo(map)
              .bindTooltip("Pedido a "+this.distancePedido+"m")  
              .bindPopup("Pedido a "+this.distancePedido+"m").openPopup();
            marker(
              [this.tienda.Latitud, this.tienda.Longitud],
              {icon: storeIcon})
              .addTo(map)
              .bindTooltip("TIENDA")                            
              .bindPopup("TIENDA, "+this.tienda.Nombre);
              
      //CON RUTAS comentar los markers

            // var routeControl = Routing.control({          
            //     showAlternatives: false,
            //     fitSelectedRoutes: false,
            //     show: false,
            //     useZoomParameter: false,
            //     routeWhileDragging: false,
            //     autoRoute : true,
            //     addWaypoints : false, 
            //     waypoints: [
            //         latLng(this.pedido.direccion.Latitud, this.pedido.direccion.Longitud), 
            //         latLng(this.pedido.posicion.Latitud, this.pedido.posicion.Longitud), 
            //         latLng(this.tienda.Latitud, this.tienda.Longitud) 
            //     ],

            // }).addTo(map);

            
      }, 100);
  }


  ngOnDestroy(): void { 
    this.destroy$.next('');
    this.destroy$.complete(); 
  }
}

 
