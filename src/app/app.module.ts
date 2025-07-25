import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/login/login.component';
import { RegisterComponent } from './core/register/register.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { LoaderComponent } from './core/loader/loader.component';
import { SuccessNotificationComponent } from './core/success-notification/success-notification.component';
import { ErrorNotificationComponent } from './core/error-notification/error-notification.component'; 
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, 
    DashboardComponent,
    LoaderComponent,
    SuccessNotificationComponent,
    ErrorNotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
