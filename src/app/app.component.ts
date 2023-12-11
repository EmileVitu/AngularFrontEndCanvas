import { Component, OnInit } from '@angular/core';
import { CanvasUser } from './canvasuser';
import { CanvasUserService } from './canvasuser.service'
import { HttpErrorResponse } from '@angular/common/http';
import { AppModule } from './app.module';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AppModule, AppComponent, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'canvasmanagerapp';
  
  public canvasUsers: CanvasUser[];
  public editCanvasUser: CanvasUser;
  public deleteCanvasUser: CanvasUser;

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
    );
  }

  public onAddCanvasUser(addForm: NgForm): void {
    document.getElementById("add-canvasuser-form").click();
    this.canvasUserService.addCanvasUser(addForm.value).subscribe(
      (response: CanvasUser) => {
        console.log(response);
        this.getCanvasUsers();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateCanvasUser(canvasUser: CanvasUser): void {
    this.canvasUserService.updateCanvasUser(canvasUser).subscribe(
      (response: CanvasUser) => {
        console.log(response);
        this.getCanvasUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteCanvasUser(canvasUserId: number): void {
    this.canvasUserService.deleteCanvasUser(canvasUserId).subscribe(
      (response: void) => {
        console.log(response);
        this.getCanvasUsers()
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchCanvasUsers(key: string): void {
    const results: CanvasUser[] = [];
    for (const canvasUser of this.canvasUsers) {
      if (canvasUser.userName.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || canvasUser.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || canvasUser.company.toLowerCase().indexOf(key.toLowerCase()) !== -1 
        || canvasUser.phoneNumber.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || canvasUser.email.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(canvasUser);
      }
    }
    this.canvasUsers = results;
    if (results.length === 0 || !key) {
      this.getCanvasUsers();
    }
    // if (results.length === 0 && key) {
    //   document.getElementById('main-container').setAttribute("hidden", "true");
    //   document.getElementById('emptyArray').setAttribute("hidden", "false");
    // }
  }

  public onOpenModal(canvasUser: CanvasUser, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addCanvasUserModal');
    }
    if (mode === 'edit') {
      this.editCanvasUser = canvasUser;
      button.setAttribute('data-target', '#updateCanvasUserModal');
    }
    if (mode === 'delete') {
      this.deleteCanvasUser = canvasUser;
      button.setAttribute('data-target', '#deleteCanvasUserModal');
    }
    container.appendChild(button);
    button.click();
  }
}