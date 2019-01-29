import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AllMembersComponent} from "./all-members.component";
import {AllMembersRoutingModule} from "./all-members-routing.module";
import {SharedModule} from '@app/shared/shared.module';
import {SmartadminDatatableModule} from '@app/shared/ui/datatable/smartadmin-datatable.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        SmartadminDatatableModule,
        AllMembersRoutingModule
    ],
    declarations: [
        AllMembersComponent
    ]
})
export class AllMembersModule {
}
