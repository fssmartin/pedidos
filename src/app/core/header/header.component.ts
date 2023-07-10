import { Component, Input, OnInit } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { Marca } from 'src/app/models/pedido.interface';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // @Input() marca!:any; 
  
  destroy$ = new Subject();
  marca!:Marca; 

  constructor(  
      private pedidoService:ProjectService) {
  };

  ngOnInit(): void {   
  
    // observable !    
    this.pedidoService.getPedidoGlobal$()
    .pipe(
      takeUntil(this.destroy$),
    )
    .subscribe(
      (marca:Marca) => { 
        this.marca = marca;         
    });   

  } 
 
  
  ngOnDestroy(): void { 
    this.destroy$.next('');
    this.destroy$.complete(); 
  }














}
