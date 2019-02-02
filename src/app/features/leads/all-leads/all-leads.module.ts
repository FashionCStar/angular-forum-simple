import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AllLeadsComponent} from "./all-leads.component";
import {AllLeadsRoutingModule} from "./all-leads-routing.module";
import {SharedModule} from '@app/shared/shared.module';
import {SmartadminDatatableModule} from '@app/shared/ui/datatable/smartadmin-datatable.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        SmartadminDatatableModule,
        AllLeadsRoutingModule
    ],
    declarations: [
        AllLeadsComponent
    ]
})
export class AllLeadsModule {
}
