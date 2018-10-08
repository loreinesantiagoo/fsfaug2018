import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";

export interface RSVP { 
    email: string;
    given_name: string;
    phone: string;
    attending: string;
    remarks?: string
}

@Injectable()
export class RSVPService {

    constructor(private http: HttpClient) { }

    rsvp(info: RSVP): Promise<boolean> {
        const formData = new HttpParams()
            .set('email', info.email)
            .set('given_name', info.given_name)
            .set('phone', info.phone)
            .set('attending', info.attending)
            .set('remarks', info.remarks)
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded');

        return (
            this.http.post<boolean>('/rsvp', 
                formData.toString(), 
                { headers: headers }
            ).toPromise()
            .then(() => true)
            .catch(() => false)
        );
    }

}