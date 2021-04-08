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

## Tecnologias utilizadas no momento

- [nodeJS](https://nodejs.org)
- [Typescript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [TypeORM](https://typeorm.io/)
- [MySQL](https://www.mysql.com/)

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