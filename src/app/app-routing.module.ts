import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GifsPageComponent } from './gifs/gifs-page/gifs-page.component';
import { CustomerSupportComponent } from './customer-support/customer-support.component';
import { AngryBirdsGameComponent } from './angry-birds-game/angry-birds-game.component';

const routes: Routes = [

    {
        path: '',
        component: GifsPageComponent,
        pathMatch: 'full'
    },
    {
      path: '',
      component: AngryBirdsGameComponent,
      pathMatch: 'full'
    },
    {
        path: 'customer',
        component: CustomerSupportComponent,
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: ''
    }
];


@NgModule({
    imports: [
        RouterModule.forRoot( routes )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
