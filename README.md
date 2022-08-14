# Trybesmith 

Essa aplicação criar uma loja de itens medievais, no formato de uma API, utilizando Typescript.

Nesse projeto foram desenvolvidas todas as camadas da aplicação (Models, Service e Controllers) em seu código e, por meio dessa aplicação, é possível realizar as operações básicas que se pode fazer em um determinado banco de dados: Criação, Leitura, Atualização e Exclusão (ou CRUD, Create, Read, Update e Delete).

Foram criados alguns endpoints para ler e escrever em um banco de dados, utilizando o MySQL.

## Rodando o Projeto

Aqui você vai encontrar um guia de como instalar o projeto localmente. 

### Banco de dados

Como primeiro requisito, você precisa ter o MySQL rodando em sua máquina. Com o banco rodando em sua máquina, você pode utilizar o script do arquivo **Trybesmith.sql** para gerar e popular o banco base do projeto. Esse Script foi fornecido pela Trybe.

### Rodando a aplicação

Após configurar o banco, podemos baixar e rodar a aplicação. Para isso, siga os passos a seguir. Em caso de problemas na instalação, dúvidas ou feedbacks, entre em contato e podemos resolver isso juntos.

Passo 1. Crie um diretório local usando `mkdir`:

~~~bash
mkdir project 
~~~

Passo 2. Vá para o diretório criado:

~~~bash
cd project
~~~

Passo 3. Clone o projeto:

~~~bash
git clone git@github.com:heitortessaro/trybesmith.git
~~~

Passo 4. Mude para o diretório do projeto clonado:

~~~bash
cd trybesmith
~~~

Passo 5. Instale todas as dependências do projeto:

~~~bash
npm install
~~~

Passo 6. Rode a aplicação:

~~~bash
npm run start
~~~

A aplicação deve começar a rodar no seu terminal.
