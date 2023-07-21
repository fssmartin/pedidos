import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'; 
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
			this.urlApi2 = Global.urlpedido;
			this.urlToken = Global.token;
	}

	getToken$():Observable<any> {  

		const myurlToken = 'auth/local',
			  body = {
				'identifier': 'test@test.com',
				'password': 'test123'
			  };

		return this._http.post<any>(this.urlApi + myurlToken , body, {}).pipe(			
			tap( (token:any) => {  
				Global.token = 'Bearer '+token.jwt;
			}),
		)
	}

	getPedido$(id:number):Observable<any> {  

		const httpOptions = {
					headers: new HttpHeaders({
						'Authorization': Global.token
					})
			},
			myUrl = this.urlApi + "pedidos/"; 
		 
		return this._http.get(myUrl + id + this.urlApi2 , httpOptions).pipe(
			
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
				console.log(err.error.error);
				return throwError(err);
			})			
		)
 

	 
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