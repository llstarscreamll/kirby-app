import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WorkShiftService {

  public constructor(private httpClient: HttpClient) { }
}
