import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Global } from './global';
import { Observable, Subject, catchError, map, of, switchMap, tap, throwError } from 'rxjs';  
import { Infopedido, Marca, Tienda, Usuario } from '../models/pedido.interface';

@Injectable({
	providedIn: 'root'
})

export class ProjectService{
	
	urlApi:string = '';
	urlApi2:string = '';
	urlToken:string = '';

	public obsMarca$ = new Subject<Marca>();

	constructor(
		private _http: HttpClient){

			this.urlApi = Global.url;
			this.urlApi2 = Global.url2;
			this.urlToken = Global.token;
	}


	getPedido$(id:number):Observable<any> {  

		const httpOptions = {
			headers: new HttpHeaders({
			  'Authorization': this.urlToken
			})
		};
		 
		return this._http.get(this.urlApi + id + this.urlApi2 , httpOptions).pipe(
			
			tap( (pedido:any) => {  
				this.obsMarca$.next(pedido.data.attributes.tienda.data.attributes.marca.data.attributes);
		   }),

			map( (data:any) => {
				return { pedido:data.data.attributes}  				 
			}),

			// catchError(
			// 	this.handleError<Infopedido[]>('getPedido', [])
			// )

			catchError(err => {
				console.log('Handling error locally and rethrowing it...', err);
				return throwError(err);
			})			
		)

		// return this._http.get("../../assets/data/pedido.json").pipe(
		// 	tap( (pedido:any) => {  
		// 		this.obsMarca$.next(pedido.data[0].attributes.tienda.data.attributes.marca.data.attributes);
		//    }),
		// 	map( (data:any) => {
		// 		return { pedido:data.data[0].attributes}  				 
		// 	}),
		// )

	 
	}



	// getTienda$(id:number):Observable<any> {  
	// 	return this._http.get("../../assets/data/marcas.json").pipe(
	// 		map( (data:any) => {
	// 			return { tiendas:data.data.attributes}  				 
	// 		}),
	// 	)
	// }
 
	getPedidoGlobal$(): Observable<Marca> {
		return this.obsMarca$.asObservable();
	}

	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
	 
		  //this.messageService.addMessage(`-- ${operation} -- failed: \n\n ${error.message}`);
		  console.log(`-- ${operation} -- failed: \n\n ${error.message}`)
		  return of(result as T);
		};
	}	

}