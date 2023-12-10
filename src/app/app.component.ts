import { Component, OnInit } from '@angular/core';
import { CanvasUser } from './canvasuser';
import { CanvasUserService } from './canvasuser.service'
import { HttpErrorResponse } from '@angular/common/http';
import { AppModule } from './app.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AppModule, AppComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'canvasmanagerapp';
  
  public canvasUsers: CanvasUser[];

  constructor(private canvasUserService: CanvasUserService){};

  ngOnInit() {
    this.getCanvasUsers();
  }

  public getCanvasUsers(): void {
    this.canvasUserService.getCanvasUsers().subscribe(
      (response: CanvasUser[]) => {
        this.canvasUsers = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
}
