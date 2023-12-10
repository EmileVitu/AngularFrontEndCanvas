import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CanvasUser } from "./canvasuser";
import { environment } from "../environments/environment";

@Injectable({
    providedIn: "root"
})
export class CanvasUserService {

    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getCanvasUsers(): Observable<CanvasUser[]> {
        return this.http.get<CanvasUser[]>(`${this.apiServerUrl}/canvasuser/all`);
    }

    public getCanvasUser(canvasUserId: number): Observable<CanvasUser> {
        return this.http.get<CanvasUser>(`${this.apiServerUrl}/canvasuser/find/${canvasUserId}`);
    }

    public addCanvasUser(canvasUser: CanvasUser): Observable<CanvasUser> {
        return this.http.post<CanvasUser>(`${this.apiServerUrl}/canvasuser/add`, canvasUser);
    }

    public updateCanvasUser(canvasUser: CanvasUser): Observable<CanvasUser> {
        return this.http.put<CanvasUser>(`${this.apiServerUrl}/canvasuser/update`, canvasUser);
    }

    public deleteCanvasUser(canvasUserId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/canvasuser/delete/${canvasUserId}`);
    }
}