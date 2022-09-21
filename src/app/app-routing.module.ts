import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewformComponent } from './pages/newform/newform.component';

const routes: Routes = [

  {
    path: '', redirectTo: 'form', pathMatch: 'full'
  }, {
    path: 'form',
    component: NewformComponent,


  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
