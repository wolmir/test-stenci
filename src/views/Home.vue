<template>
  <div class="home">
    <h1>Lista de Pessoas</h1>
    <table class="table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Tipo</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pessoa in allPessoas" v-bind:key="pessoa.id">
          <td><router-link :to="'/edit/' + pessoa.id">{{ pessoa.nome }}</router-link></td>
          <td>{{ pessoa.tipo }}</td>
          <td><button class="btn btn-error" v-on:click="deletePessoa(pessoa)">Deletar</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import gql from 'graphql-tag'
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  created () {
    this.$apollo.queries.allPessoas.refetch()
  },
  components: {
    // HelloWorld
  },
  data () {
    return {
      allPessoas: []
    }
  },
  methods: {
    deletePessoa (pessoa) {
      const mutation = gql`mutation DeletarPessoaMutation($id: ID!) {
        deletePessoa(id: $id) {
          id
        }
      }`

      const variables = {
        id: pessoa.id
      }

      this.$apollo.mutate({
        mutation,
        variables
      }).then(() => {
        this.$apollo.queries.allPessoas.refetch()
      })
    }
  },
  apollo: {
    allPessoas: gql`{allPessoas { id, nome, tipo } }`
  }
}
</script>
