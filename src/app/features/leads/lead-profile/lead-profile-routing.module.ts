import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LeadProfileComponent} from "./lead-profile.component";

const routes: Routes = [{
    path: '',
    component: LeadProfileComponent
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class LeadProfileRoutingModule {
}
