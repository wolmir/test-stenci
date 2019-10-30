<template>
  <div class="container">
    <div class="columns">
      <div class="column col-6">
        <h1>Editar Pessoa</h1>
        <form>
          <div class="form-group">
            <label class="form-label" for="input-photo">Foto</label>
            <input class="form-input" type="file" id="input-photo" @change="onFileChange" />
          </div>

          <figure id="preview">
            <img class="img-responsive" v-if="url" :src="url" />
          </figure>

          <div class="form-group" v-bind:class="{'has-error': hasError('nome') }">
            <label class="form-label" for="input-nome">Nome*</label>
            <input class="form-input" type="text" id="input-nome" placeholder="Nome" v-model="pessoa.nome" />
            <p class="form-input-hint" v-if="hasError('nome')">{{ errors.nome[0] }}</p>
          </div>

          <div class="form-group">
            <label class="form-label" for="input-tipo">Tipo de pessoa*</label>
            <select class="form-select" id="input-tipo" v-model="pessoa.tipo">
              <option value="FISICA">Física</option>
              <option value="JURIDICA">Juridica</option>
            </select>
          </div>

          <div v-if="pessoa.tipo == 'JURIDICA'">
            <div class="form-group" v-bind:class="{'has-error': hasError('razaoSocial') }">
              <label class="form-label" for="input-razao">Razâo Social*</label>
              <input class="form-input" type="text" id="input-razao" placeholder="Nome" v-model="pessoa.razaoSocial" />
              <p class="form-input-hint" v-if="hasError('razaoSocial')">{{ errors.razaoSocial[0] }}</p>
            </div>

            <div class="form-group" :class="{'has-error': hasError('cnpj')}">
              <label class="form-label" for="input-cnpj">CNPJ*</label>
              <input class="form-input" type="text" id="input-cnpj" placeholder="CNPJ" v-model="pessoa.cnpj" />
              <p class="form-input-hint" v-if="hasError('cnpj')">{{ errors.cnpj[0] }}</p>
            </div>
          </div>

          <div v-else>
            <div class="form-group" :class="{'has-error': hasError('cpf')}">
              <label class="form-label" for="input-cpf">CPF*</label>
              <input class="form-input" type="text" id="input-cpf" placeholder="CPF" v-model="pessoa.cpf" />
              <p class="form-input-hint" v-if="hasError('cpf')">{{ errors.cpf[0] }}</p>
            </div>

            <div class="form-group" :class="{'has-error': hasError('sexo')}">
              <label class="form-label" for="input-sexo">Sexo*</label>
              <input class="form-input" type="text" id="input-sexo" placeholder="Sexo" v-model="pessoa.sexo" />
              <p class="form-input-hint" v-if="hasError('sexo')">{{ errors.sexo[0] }}</p>
            </div>

            <div class="form-group" :class="{'has-error': hasError('dataNasc')}">
              <label class="form-label" for="input-data-nasc">Data de nascimento*</label>
              <input class="form-input" type="text" id="input-data-nasc" placeholder="Data de nascimento" v-model="pessoa.dataNasc" />
              <p class="form-input-hint" v-if="hasError('dataNasc')">{{ errors.dataNasc[0] }}</p>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="input-email">Email</label>
            <input
              class="form-input"
              type="text"
              id="input-email"
              placeholder="Email"
              v-model="pessoa.email"
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="input-telefone">Telefone</label>
            <input
              class="form-input"
              type="text"
              id="input-telefone"
              placeholder="Telefone"
              v-model="pessoa.telefone"
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="input-celular">Celular</label>
            <input
              class="form-input"
              type="text"
              id="input-celular"
              placeholder="Celular"
              v-model="pessoa.celular"
            />
          </div>

          <h2>Endereços</h2>

          <div class="my-3" v-for="(item, index) in pessoa.enderecos" v-bind:key="index">
            <div class="form-group">
              <label class="form-label">Endereço</label>
              <input
                class="form-input"
                type="text"
                placeholder="Endereço"
                v-model="pessoa.enderecos[index].endereco"
              />
            </div>

            <div class="form-group">
              <label class="form-label">Número</label>
              <input
                class="form-input"
                type="text"
                placeholder="Número"
                v-model="pessoa.enderecos[index].numero"
              />
            </div>

            <div class="form-group">
              <label class="form-label">Complemento</label>
              <input
                class="form-input"
                type="text"
                placeholder="Complemento"
                v-model="pessoa.enderecos[index].complemento"
              />
            </div>

            <div class="form-group">
              <label class="form-label">Bairro</label>
              <input
                class="form-input"
                type="text"
                placeholder="Bairro"
                v-model="pessoa.enderecos[index].bairro"
              />
            </div>

            <div class="form-group">
              <label class="form-label">Cidade</label>
              <input
                class="form-input"
                type="text"
                placeholder="Cidade"
                v-model="pessoa.enderecos[index].cidade"
              />
            </div>

            <div class="form-group">
              <label class="form-label">Estado</label>
              <input
                class="form-input"
                type="text"
                placeholder="Estado"
                v-model="pessoa.enderecos[index].estado"
              />
            </div>

            <div class="form-group">
              <label class="form-label">CEP</label>
              <input
                class="form-input"
                type="text"
                placeholder="CEP"
                v-model="pessoa.enderecos[index].cep"
              />
            </div>
          </div>
          <button class="btn my-2" v-on:click="addEndereco">Adicionar Endereço</button>
          <button class="btn btn-primary my-2" v-on:click="atualizar">Atualizar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import _ from 'lodash'
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'editPessoa',
  components: {
    // HelloWorld
  },
  props: ['pessoaId'],
  data () {
    return {
      errors: {
        nome: [],
        cpf: [],
        cnpj: [],
        sexo: [],
        razaoSocial: [],
        dataNasc: []
      },
      url: null,
      pessoa: {}
    }
  },
  apollo: {
    pessoa () {
      return {
        query: gql`
          query PessoaPorId($id: ID) {
            pessoa: Pessoa(id: $id) {
              id
              nome
              cpf
              cnpj
              razaoSocial
              sexo
              dataNasc
              tipo
              email
              telefone
              celular
              enderecos {
                endereco
                numero
                complemento
                bairro
                cidade
                estado
                cep
                id
              }
            }
          }
        `,
        variables: {
          id: this.pessoaId
        }
      }
    }
  },
  methods: {
    onFileChange (event) {
      const file = event.target.files[0]
      this.url = URL.createObjectURL(file)
    },

    hasError (field) {
      if (!field) {
        return Object.values(this.errors)
          .map(error => error.length)
          .filter(quantity => quantity > 0)
          .length > 0
      }

      if (this.errors[field]) {
        return this.errors[field].length > 0
      }

      return false
    },

    validate () {
      if (this.pessoa.nome.length === 0) {
        this.errors.nome.push('O nome é obrigatório')
      }

      if (this.pessoa.tipo === 'JURIDICA') {
        if (this.pessoa.razaoSocial.length === 0) {
          this.errors.razaoSocial.push('A razão social é obrigatória')
        }

        if (this.pessoa.cnpj.length === 0) {
          this.errors.cnpj.push('O cnpj é obrigatório')
        }
      } else {
        if (this.pessoa.cpf.length === 0) {
          this.errors.cpf.push('O CPF é obrigatório')
        }

        if (this.pessoa.sexo.length === 0) {
          this.errors.sexo.push('O sexo é obrigatório')
        }

        if (this.pessoa.dataNasc.length === 0) {
          this.errors.dataNasc.push('A data de nascimento é obrigatória')
        }
      }
    },

    addEndereco () {
      this.enderecos.push({
        endereco: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: ''
      })
    },

    atualizar () {
      this.validate()

      if (!this.hasError()) {
        const queryFisica = gql`
          mutation AtualizarPessoaMutation(
            $id: ID!
            $nome: String
            $tipo: Tipo
            $cpf: String
            $sexo: String
            $dataNasc: String
            $email: String
            $telefone: String
            $celular: String
            $enderecos: [PessoaenderecosEndereco!]
          ) {
            updatePessoa(
              id: $id
              nome: $nome
              tipo: $tipo
              cpf: $cpf
              sexo: $sexo
              dataNasc: $dataNasc
              email: $email
              telefone: $telefone
              celular: $celular
              enderecos: $enderecos
            ) {
              id
            }
          }
        `

        const queryJuridica = gql`
          mutation AtualizarPessoaMutation(
            $id: ID!
            $nome: String
            $tipo: Tipo
            $razaoSocial: String
            $cnpj: String
            $email: String
            $telefone: String
            $celular: String
            $enderecos: [PessoaenderecosEndereco!]
          ) {
            updatePessoa(
              id: $id
              nome: $nome
              tipo: $tipo
              razaoSocial: $razaoSocial
              cnpj: $cnpj
              email: $email
              telefone: $telefone
              celular: $celular
              enderecos: $enderecos
            ) {
              id
            }
          }
        `

        const mutation = this.tipo === 'FISICA' ? queryFisica : queryJuridica

        const variablesFisica = {
          cpf: this.pessoa.cpf,
          sexo: this.pessoa.sexo,
          dataNasc: this.pessoa.dataNasc
        }

        const variablesJuridica = {
          cnpj: this.pessoa.cnpj,
          razaoSocial: this.pessoa.razaoSocial
        }

        const variables = Object.assign(
          {
            id: this.pessoa.id,
            nome: this.pessoa.nome,
            tipo: this.pessoa.tipo,
            email: this.pessoa.email,
            telefone: this.pessoa.telefone,
            celular: this.pessoa.celular,
            enderecosIds: this.pessoa.enderecos.map(endereco => endereco.id),
            enderecos: this.pessoa.enderecos.map(endereco => _.omit(endereco, ['__typename', 'id']))
          },
          this.tipo === 'FISICA' ? variablesFisica : variablesJuridica
        )

        this.$apollo
          .mutate({
            mutation,
            variables
          })
          .then(() => {
            this.$router.push({ path: '/' })
          })
      }
    }
  }
}
</script>
