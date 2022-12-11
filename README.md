# TESTE TÉCNICO - Desenvolvedor Back end - Sky

## Desafio Sky
Esta é uma API RESTFUL exigida pelo desafio técnico da Sky.

Todos os endpoints APENAS aceitam e RECEBEM pelo formato JSON

O tempo de validade de um token é de 30m

As mensagems de erro sempre retornam um objeto no seguinte formato
```
{ mensagem: "mensagem de erro" }
```

---

<a href="https://github.com/GabrielPesch">
        <img src="https://avatars.githubusercontent.com/u/91437516?v=4" width="100px;" alt="Foto de Tati Alves no GitHub"/><br>

  [@Gabriel Pesch](https://github.com/GabrielPesch)
  
---


## Dependências utilizadas

<details>
  <summary>Dependencies</summary>
    <ul>
      <li>express</li>
      <li>express-async-errors</li>
      <li>mongoose</li>
      <li>bcryptjs</li>
      <li>jsonwebtoken</li>
      <li>uuid</li>
      <li>zod</li>
    </ul>
</details>
<details>
  <summary>Dev dependencies</summary>
    <ul>
      <li>chai</li>
      <li>chai-as-promised</li>
      <li>chai-http</li>
      <li>dotenv</li>
      <li>eslint</li>
      <li>mocha</li>
      <li>sinon</li>
      <li>ts-node</li>
      <li>ts-node-dev</li>
      <li>typescript</li>      
    </ul>
</details>

---

## Documentation

[Documentação pelo postman](https://documenter.getpostman.com/view/21412589/2s8YzTU31y)

---


## Instalar / Iniciar a aplicação pela primeira vez

<details>
  <summary>Instalar aplicação via npm</summary>
  <p> </p>
      <p>Clone o repositório</p>
      
```bash
  git clone git@github.com:GabrielPesch/desafioSky.git
  
```
 
  <p>Entre na pasta do repositório</p>
  
  ```bash
  cd desafioSky
```
  
<p>Instalar as dependências:</p>

  ```bash
  npm install
```

<p>Execute a composição dos containers Docker</p>

  ```bash
  docker-compose up -d
```

<p>Execute os testes unitários com</p>

   ```bash
  npm run 
```
Inicie a aplicação node
    
  ```bash
  npm run dev
```

</details>

---


## Variáveis de ambiente

Para executar este projeto, você deverá adicionar as seguintes variáveis ao seu  arquivo .env

`JWT_SECRET=yourSecret`

`PORT=8000`

`TZ="America/Sao_Paulo"`

---
