import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tenant } from '../models/tenant.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  tenant: Tenant;
  endpoint = 'Tenants'

  constructor(private readonly baseService: BaseService) {}
  
  getConfig(): Observable<Tenant> {
    return this.baseService.get(`${this.endpoint}`)
  }
}