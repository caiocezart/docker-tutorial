import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app1';
  nome = {}

  nomes = [
    { id: 11, nome: 'Caio' },
    { id: 12, nome: 'Cezar' }
  ];

  adicionarNome(nome: any): void {
    let novo_nome = {
      'id': this.generateId(),
      'nome': nome.nome
    }
    console.log(novo_nome)
    this.nomes.push(novo_nome);
  }

  deletarNome(nome: any): void{
    var index = this.nomes.indexOf(nome, 0);
    if (index > -1) {
      this.nomes.splice(index, 1);
    }
  }

  generateId(): number{
    return Math.floor(Math.random() * 999);
  }
}


