import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AllLeadsComponent} from "./all-leads.component";

const routes: Routes = [{
    path: '',
    component: AllLeadsComponent
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AllLeadsRoutingModule {
}
