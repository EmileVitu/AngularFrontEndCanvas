import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { CanvasUserService } from "./canvasuser.service";

@NgModule({
    imports: [HttpClientModule],
    providers: [CanvasUserService],
    bootstrap: [AppComponent]
})
export class AppModule {}