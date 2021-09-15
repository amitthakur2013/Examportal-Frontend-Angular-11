import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { finalize } from "rxjs/operators";
import { LoaderService } from './loader.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
u:boolean;

constructor(private loaderService: LoaderService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  	

  	this.u=/\/api\/user\/[a-zA-Z0-9 ]*/.test(req.url);
  	if(req.method==='GET' && this.u===true)
  		return next.handle(req);
  	
    this.loaderService.show();

    return next.handle(req).pipe(
            finalize(() => this.loaderService.hide())
        );
  }
}
