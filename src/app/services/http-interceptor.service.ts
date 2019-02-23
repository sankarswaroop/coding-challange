import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EventsService } from './events.service';
import { AlertMessage } from '../shared/models/alert-message.model';
import { AlertType } from '../shared/models/alert-type.model';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

    constructor(
        private eventsService: EventsService,
    ) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const newReq = req.clone({
            url: `/api/${req.url}`,
            setHeaders: {
                Host: 'https://blockchain.info'
            }
        });
        return next
            .handle(newReq)
            .pipe(
                tap(event => {
                    if (event instanceof HttpResponse) {
                        if (req.method !== 'GET') {
                            this.eventsService.alert(new AlertMessage(AlertType.success, ''));
                        }
                    }
                }, error => {
                    if (error.status === 401) {
                        console.log("Unauthorized");
                    }
                    this.eventsService.alert(new AlertMessage(AlertType.error, error.message));
                })
            );
    }
}
