import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { AuthFormComponent } from "./components/auth-form/auth-form.component";
import { AuthService } from "./services/auth/auth.service";
import { AuthGuard } from "./guards/auth.guard";

export const ROUTES:Routes=[
    { path:''}
]

@NgModule({
    imports: [
      CommonModule,
      RouterModule,
      ReactiveFormsModule
      
    ],
    declarations:[AuthFormComponent],
    exports:[AuthFormComponent]
  })
  export class SharedModule {


    static forRoot(): ModuleWithProviders<SharedModule> {
      return {
        ngModule: SharedModule,
        providers: [
          AuthService,
          AuthGuard
        ]
      };
    }
  }