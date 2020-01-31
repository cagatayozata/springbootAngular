
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public router: Router) {}
  
  canActivate(): boolean {
    return true;
  }

}