<h1 align='center'>
 BACKEND
</h1>

## Indice
- [Sobre](#-sobre)
- [Tecnologias](#-tecnologias-utilizadas-no-momento)
- [Como baixar o projeto](#-como-baixar-o-projeto)
- [Requisitos](#-requisitos)
- [Configurando MySQL](#-configurando-mysql)

---

## Sobre
Esse projeto foi desenvolvido de uma API com o intuito de avaliar meu desempenho e realizar a prova de BACKEND

---

## Tecnologias utilizadas

- [nodeJS](https://nodejs.org)
- [Typescript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [TypeORM](https://typeorm.io/)
- [MySQL](https://www.mysql.com/)
- [Handlebars](https://handlebarsjs.com/)
- [html-pdf](https://github.com/marcbachmann/node-html-pdf)
- [nodemailer](https://nodemailer.com/smtp/testing/)

---

## Como baixar o projeto

```bash 
  $ git clone https://github.com/imCoala/backendAPI

  $ cd backendAPI

  $ yarn install

  $ yarn typeorm migration:run

  $ yarn start
```
---

## Requisitos
- **MySQL** instalado na máquina
- Certifique de que o usuário do **MySQL** esteja se auntenticando com o plug-in **mysql_native_password**
- Utilize **yarn** ou **npm**

---

## Configurando MySQL
Caso o usuário do **MySQL** esteja sendo autenticado pelo plug-in **auth_socket** OU **caching_sha2_password**, execute o comando abaixo:

```bash
  mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH caching_sha2_password BY 'password';
```
certifique de alterar o **password** pela senha do usuário

---

## Endpoints
### Post
- /clientes
    * ```json
        {
          //varchar
          "name": "Fulano",
          //varchar
          "cpf": "000.000.000-99",
          //varchar
          "genre": "Masculino",
          //varchar
          "email": "teste@example.com"
        }
      ``` 
- /produtos
    * ```json
        {
          //varchar
          "name": "Nome produto",
          //varchar
          "color": "cor",
          //varchar
          "size": "M",
          //integer
          "value": 9999
        }
      ``` 
- /pedidos
    * ```json
        {
          //integer
          "client": 1,
          //integer
          "product": 1,
          //integer
          "quantity": 2,
          //varchar
          "note": "descrição do pedido",
          //varchar
          "form_of_payment": "dinheiro"
        }
      ```
- /pedidos/:id/report
- /pedidos/:id/sendmail

### Get
- /clientes
- /clientes/:id
- /produtos
- /produtos/:id
- /pedidos
- /pedidos/:id

### Put
- /clientes/:id
   * ```json
        {
          //varchar
          "name": "Camilla",
          //varchar
          "cpf": "344.600.858-99",
          //varchar
          "genre": "Feminino",
          //varchar
          "email": "teste.snt99@gmail.com"
        }
      ```
- /produtos/:id
   * ```json
        {
          //varchar
          "name": "Produto",
          //varchar
          "color": "cinza",
          //varchar
          "size": "P",
          //integer
          "value": 7999,
        }
      ```
- /pedidos/:id
   * ```json
        {
          //integer
          "client": 2,
          //integer
          "product": 2,
          //integer
          "quantity": 5,
          //varchar
          "note": "descrição do pedido",
          //varchar
          "form_of_payment": "cartão de crédito"
        }
      ```

### Delete
- /clientes/:id
- /produtos/:id
- /pedidos/:id

