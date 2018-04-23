import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  api_url: any = '/api/nomes'
  nomes: any = [];
  nome: any = {};

  title = 'app2 -> acesso ao banco';

  constructor(private http: Http) { }

  ngOnInit() {
    this.apiCarregarTodosOsNomes().subscribe(res => {
      this.nomes = res
      console.log(this.nomes)
    });
  }

  adicionarNome(nome: any): void {
    console.log(nome)
    this.apiAdicionarNome(nome).subscribe(res => {
      this.nomes = res
      this.nome = {}
    })    
  }

  deletarNome(nome: any): void {
    console.log(nome)
    this.apiDeletarNome(nome).subscribe(res => {
      this.nomes = res
    })
  }

  apiDeletarNome(nome: any) {
    return this.http.delete(this.api_url + '/' + nome._id)
      .map(res => res.json())
  }

  apiAdicionarNome(nome: any) {
    return this.http.post(this.api_url, nome)
      .map(res => res.json());
  }

  apiCarregarTodosOsNomes() {
    return this.http.get(this.api_url)
      .map(res => res.json());
  }
}


