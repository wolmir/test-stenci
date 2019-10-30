# stenci-test

## Notas
O servidor graphql é um temporário que está atualmente ativo (30/10/2019).
Se por acaso ele sair do ar, basta instalar essa ferramenta:
```
npm install -g graphql-up
```

e, na raiz do projeto, rodar
```
graphql-up pessoas.graphql
```

A saída desse comando, se tudo der certo, vai ser um endpoint, que deve ser substituído
no arquivo `vue-apollo.js`.

Obrigado!

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
