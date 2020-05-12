import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { Role } from './models/role';

const routes: Routes = [
  { 
    path: '', 
    loadChildren: './pages/login/login.module#LoginPageModule'
  },
  { 
    path: 'home-results', 
    loadChildren: './pages/home-results/home-results.module#HomeResultsPageModule', 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'users', 
    loadChildren: './pages/users/users.module#UsersPageModule',
    canActivate: [AuthGuard] 
  },
  { 
    path: 'trucks', 
    loadChildren: './pages/trucks/trucks.module#TrucksPageModule',
    canActivate: [AuthGuard] 
  },
  { 
    path: 'warehouses', 
    loadChildren: './pages/warehouses/warehouses.module#WarehousesPageModule',
    canActivate: [AuthGuard] 
  },
  { 
    path: 'create-users', 
    loadChildren: './pages/create-users/create-users.module#CreateUsersPageModule',
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.super] }  
  },
  { 
    path: 'create-trucks', 
    loadChildren: './pages/create-trucks/create-trucks.module#CreateTrucksPageModule',
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }  
  },
  { 
    path: 'create-warehouses', 
    loadChildren: './pages/create-warehouses/create-warehouses.module#CreateWarehousesPageModule',
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }  
  },
  { 
    path: 'reports', 
    loadChildren: './pages/reports/reports.module#ReportsPageModule',
    canActivate: [AuthGuard]
  },
  { 
    path: 'create-company', 
    loadChildren: './pages/create-company/create-company.module#CreateCompanyPageModule',
    canActivate: [AuthGuard],
    //data: { roles: [Role.super] }
 },
  { 
    path: 'company', 
    loadChildren: './pages/company/company.module#CompanyPageModule',
    canActivate: [AuthGuard],
    //data: { roles: [Role.super] }
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
