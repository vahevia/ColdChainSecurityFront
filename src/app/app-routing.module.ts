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
    data: { roles: [Role.Admin, Role.super] }  
  },
  { 
    path: 'create-warehouses', 
    loadChildren: './pages/create-warehouses/create-warehouses.module#CreateWarehousesPageModule',
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.super] }  
  },
  { 
    path: 'reports', 
    loadChildren: './pages/reports/reports.module#ReportsPageModule',
    canActivate: [AuthGuard]
  },
  { 
    path: 'reports-trucks', 
    loadChildren: './pages/reports-trucks/reports-trucks.module#ReportsTrucksPageModule',
    canActivate: [AuthGuard] 
  },
  { 
    path: 'create-company', 
    loadChildren: './pages/create-company/create-company.module#CreateCompanyPageModule',
    canActivate: [AuthGuard],
    data: { roles: [Role.super] }
 },
  { 
    path: 'company', 
    loadChildren: './pages/company/company.module#CompanyPageModule',
    canActivate: [AuthGuard],
    data: { roles: [Role.super] }
  },
  { 
    path: 'static-units', 
    loadChildren: './pages/static-units/static-units.module#StaticUnitsPageModule',
    canActivate: [AuthGuard] 
  },
  { 
    path: 'create-static-units', 
    loadChildren: './pages/create-static-units/create-static-units.module#CreateStaticUnitsPageModule',
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.super] }
  },
  { 
    path: 'edit-user', 
    loadChildren: './pages/edit-user/edit-user.module#EditUserPageModule',
    canActivate: [AuthGuard] 
  },
  { 
    path: 'areas', 
    loadChildren: './pages/areas/areas.module#AreasPageModule',
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  { 
    path: 'create-areas', 
    loadChildren: './pages/create-areas/create-areas.module#CreateAreasPageModule',
    canActivate: [AuthGuard] 
  },
  { 
    path: 'reports-rubros-transp', 
    loadChildren: './pages/reports-rubros-transp/reports-rubros-transp.module#ReportsRubrosTranspPageModule',
    canActivate: [AuthGuard]  
  },
  { 
    path: 'reports-rubros-storage', 
    loadChildren: './pages/reports-rubros-storage/reports-rubros-storage.module#ReportsRubrosStoragePageModule',
    canActivate: [AuthGuard]  
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
