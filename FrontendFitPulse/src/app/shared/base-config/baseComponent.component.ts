import { Directive } from "@angular/core";
import { Tenant } from "src/app/core/models/tenant.model";
import { TenantService } from "src/app/core/services/tenant.service";

@Directive()
export abstract class BaseConfigurationComponent {
    tenant: Tenant;
    constructor(tenantService: TenantService){
        this.tenant = tenantService.tenant;
    }
}