import { Component, OnInit, OnDestroy } from '@angular/core'; 
import { ActivatedRoute, Params } from '@angular/router'; 
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent  implements OnInit, OnDestroy {
 
   

  constructor(){
 
  }


  ngOnInit() {
  }

  ngOnDestroy() {  
 
  }
}
