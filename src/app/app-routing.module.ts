import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { RegisterComponent } from './core/register/register.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { CategoryComponent } from './core/category/category.component';
import { LanguageComponent } from './core/language/language.component';
import { BookComponent } from './core/book/book.component';
import { ItemComponent } from './core/item/item.component';
import { SaleComponent } from './core/sale/sale.component';
import { PurchaseComponent } from './core/purchase/purchase.component';
import { ItemStockComponent } from './core/item-stock/item-stock.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'language', component: LanguageComponent },
  { path: 'category', component: CategoryComponent },
  { path:'item',  component: ItemComponent},
  { path: 'book', component: BookComponent },
  { path:'sale', component: SaleComponent}, 
  { path:'purchase', component: PurchaseComponent}, 
  { path:'stockItem',  component: ItemStockComponent},
  // Optional: Wildcard route for 404 page
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
