import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // api_url: any = 'http://api:3000';
  // api_url: any = 'http://localhost:3000';
  namesEndpoint: any = '/api/names';
  names: any = [];
  name: any = {};

  title = 'kubernetes test';

  constructor(private http: Http) { }

  ngOnInit() {
    this.apiGetAllNames().subscribe(res => {
      this.names = res
    });
  }

  getNamesApi(): any {
    return this.namesEndpoint;
  }

  addName(name: any): void {
    this.apiAddName(name).subscribe(res => {
      this.names = res;
      this.name = {};
    })
  }

  deleteName(name: any): void {
    this.apiDeleteName(name).subscribe(res => {
      this.names = res;
    })
  }

  apiDeleteName(name: any) {
    return this.http.delete(this.getNamesApi() + '/' + name.name)
      .map(res => res.json().Items)
  }

  apiAddName(name: any) {
    return this.http.post(this.getNamesApi(), name)
      .map(res => res.json().Items);
  }

  apiGetAllNames() {
    return this.http.get(this.getNamesApi())
      .map(res => res.json().Items);
  }
}


