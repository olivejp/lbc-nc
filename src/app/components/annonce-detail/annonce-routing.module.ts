import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BidonComponent } from '../../bidon/bidon.component';
import { BiduleComponent } from '../../bidule/bidule.component';

const bidonRoutes: Routes = [
    { path: 'bidon', component: BidonComponent, outlet: 'auxiliaire' },
    { path: 'bidule', component: BiduleComponent, outlet: 'auxiliaire' }
];

@NgModule({
    imports: [
        RouterModule.forChild(bidonRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AnnonceRoutingModule { }