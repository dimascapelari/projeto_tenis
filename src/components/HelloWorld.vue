<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <div
      class="alert alert-warning"
      role="alert"
      v-show="produtos.length === 0"
    >
      Não existem produtos cadastrados !
    </div>

    <!-- <table class="table table-striped" v-show="produtos.length > 0"> -->
    <DataTable class="table table-striped" v-show="produtos.length > 0">
      <thead>
        <tr>
          <th>id</th>
          <th>EAN</th>
          <th>Código Interno</th>
          <th>Descrição</th>
          <th>Detalhamento</th>
          <th>Fabricante</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <template v-for="(produto, index) in produtos" :key="produto.id">
          <tr>
            <td>{{ produto.id }}</td>
            <td>{{ produto.ean }}</td>
            <td>{{ produto.codIn }}</td>
            <td>{{ produto.desc }}</td>
            <td>{{ produto.detalhe }}</td>
            <td>{{ produto.fabric }}</td>
            <td>
              <CompButton class="p-button-danger" @click="deletar(index)">
                Remover
              </CompButton>
            </td>
          </tr>
          <tr>
            <td colspan="7">
              <div class="table-box">
                <table border="1">
                  <thead>
                    <tr>
                      <th>Cor</th>
                      <th>Tamanho</th>
                      <th>Preço</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(variacao, index) in produto.variacoes"
                      :key="index"
                    >
                      <td>{{ variacao.cor }}</td>
                      <td>{{ variacao.tamanho }}</td>
                      <td>{{ variacao.preco }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </DataTable>

    <CompButton class="p-button-raised p-button-rounded" @click="adicionar()"
      >Adicionar</CompButton
    >

    <hr />

    <section class="cadastro">
      <section class="parte1">
        <div class="form-group">
          <span class="p-float-label">
            <p>
              <InputText
                placeholder="Digite um id"
                type="text"
                v-model="produto.id"
                name="idProduto"
                class="p-inputtextarea"
              />
              <label for="username">- Digite o id</label>
            </p>
          </span>

          <span class="p-float-label">
            <p>
              <InputText
                placeholder="Código EAN"
                type="text"
                v-model="produto.ean"
                name="eanProduto"
                class="p-inputtextarea"
              />
              <label for="username">- Código EAN</label>
            </p>
          </span>

          <span class="p-float-label">
            <p>
              <InputText
                placeholder="Código Interno"
                type="text"
                v-model="produto.codIn"
                name="codInProduto"
                class="p-inputtextarea"
              />
              <label for="username">- Código Interno</label>
            </p>
          </span>

          <span class="p-float-label">
            <p>
              <InputText
                placeholder="Descrição"
                type="text"
                v-model="produto.desc"
                name="descInProduto"
                class="p-inputtextarea"
              />
              <label for="username">- Descrição</label>
            </p>
          </span>

          <span class="p-float-label">
            <p>
              <TextArea
                placeholder="Digite um Detalhamento"
                type="text"
                v-model="produto.detalhe"
                name="detalheProduto"
                class="p-inputtextarea"
                :autoResize="true"
                rows="4"
                cols="22"
              />
              <label for="username">- Detalhamento</label>
            </p>
          </span>

          <div>
            <p>
              <label>Fabricante: </label>
              <select class="p-cascadeselect" v-model="produto.fabric">
                <option
                  v-for="fabricante in fabri"
                  :key="fabricante.id"
                  :value="fabricante.fab"
                >
                  {{ fabricante.fab }}
                </option>
              </select>
            </p>
          </div>
        </div>
      </section>
    </section>

    <CompButton
      class="p-button-raised p-button-rounded"
      @click="adicionarVariacao()"
      >Variação</CompButton
    >
    <br />
    <br />
    <!-- -->
    <section>
      <div
        class="variacoes"
        v-for="(variacao, index) in produto.variacoes"
        :key="index"
      >
        <div class="variacoes-input-container">
          <label for="cores">Cores:</label>
          <select
            class="p-cascadeselect"
            name="cores"
            id="cores"
            v-model="variacao.cor"
          >
            <option v-for="cor in co" :key="cor.id" :value="cor.tipo">
              {{ cor.tipo }}
            </option>
          </select>
        </div>
        <div class="variacoes-input-container">
          <label for="tamanho">Tamanho:</label>
          <select
            class="p-cascadeselect"
            name="descricao"
            id="tamanho"
            v-model="variacao.tamanho"
          >
            <option
              v-for="tamanho in taman"
              :key="tamanho.id"
              :value="tamanho.tam"
            >
              {{ tamanho.tam }}
            </option>
          </select>
        </div>

        <div class="variacoes-input-container">
          <label for="nome">Preço:</label>
          <InputNumber
            type="text"
            id="preco"
            name="preco"
            v-model="variacao.preco"
            placeholder="Digite valor"
          />
        </div>
      </div>
    </section>

    <hr />
    <!-- -------------------------------------- -->
    <section class="container-variacoes">
      <table class="variacoes">
        <div>
          <h2>Variações</h2>
          <DataTable
            :value="products"
            editMode="row"
            dataKey="id"
            v-model:editingRows="editingRows"
            @row-edit-save="onRowEditSave"
            responsiveLayout="scroll"
          >
            <!-- -------------------------------------- -->
            <CompColumn field="cores" header="Cor" style="width: 20%">
              <template #editor="{ data, field }">
                <Dropdown
                  v-model="data[field]"
                  :options="cores"
                  optionLabel="tipo"
                  optionValue="id"
                />
              </template>
              <template #body="slotProps">
                <!-- <template
                  v-for="(variacao, index) in produto.variacoes"
                  :key="index"
                >
                  <span v-if="slotProps.data.cor === cores.id">
                    {{ variacao.cores.tipo }}
                  </span>
                </template> -->
                {{ slotProps.data.cor }}
              </template>
              -->
            </CompColumn>
            <!-- -------------------------------------- -->
            <CompColumn field="tamanhos" header="Tamanho" style="width: 20%">
              <template #editor="{ data, field }">
                <!-- <InputText v-model="data[field]" /> -->
                <Dropdown
                  v-model="data[field]"
                  @change="chn"
                  :options="tamanhos"
                  optionLabel="tam"
                  optionValue="id"
                />
              </template>
              <template #body="slotProps">
                <!-- <template
                  v-for="(variacao, index) in produto.variacoes"
                  :key="index"
                >
                   <span>
                    {{ variacao.tamanho }}
                  </span> 
                </template> -->
                {{ slotProps.data.tamanho }}
              </template>
            </CompColumn>
            <!-- -------------------------------------- -->
            <CompColumn field="preco" header="Preço" style="width: 20%">
              <template #editor="{ data, field }">
                <InputText v-model="data[field]" />
              </template>
            </CompColumn>
            <CompColumn
              :rowEditor="true"
              style="width: 10%; min-width: 8rem"
              bodyStyle="text-align:center"
            ></CompColumn>
          </DataTable>
        </div>
      </table>
    </section>
    <!-- -------------------------------------- -->
    <hr />

    <tr>
      <td colspan="7">
        <div class="table-box">
          <table border="1">
            <thead>
              <tr>
                <th>Cor</th>
                <th>Tamanho</th>
                <th>Preço</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(variacao, index) in produto.variacoes" :key="index">
                <td>{{ variacao.cor }}</td>
                <td>{{ variacao.tamanho }}</td>
                <td>{{ variacao.preco }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </td>
    </tr>

    <hr />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

import { tamanhos } from "@/data/tamanhos";
import { cores } from "../data/cores";
import { fabricantes } from "../data/fabricantes";
import Produtos from "../models/Produtos";
import Variacoes from "@/models/Variacoes";

// export default class PedidoForm {
//   private editingRows: [] | null = null;
//   private produto: Produtos | null = null;
//   private produtos: Produtos | null = null;
//   private variacoes: Variacoes | null = null;

//   adicionarVariacao() {
//     const variacao = { cor: "", tamanho: "", preco: "" };
//     // this.produto.variacoes.push(variacao);
//   }

//   deletar(parametro: Produtos[]) {
//     // this.produtos.splice(parametro, 1);
//   }

//   adicionar() {
//     // console.log(this.produto);
//     // this.produtos.push(this.produto);
//   }
// }

@Options({
  props: {
    msg: String,
  },
  data() {
    return {
      txt: "DataTableComp",
      editingRows: [],
      taman: [],
      co: [],
      fabri: [],
      produtos: [
        {
          id: 1,
          ean: 1111111,
          codIn: 111,
          desc: "Ténis",
          detalhe: "Cano alto",
          fabric: "Nike",
          variacoes: [{ cor: "Branco", tamanho: "38", preco: "200,00" }],
        },
        {
          id: 2,
          ean: 2222222,
          codIn: 222,
          desc: "Sapatilha",
          detalhe: "Casual",
          fabric: "Moleca",
          variacoes: [{ cor: "Laranja", tamanho: "39", preco: "300,00" }],
        },
        {
          id: 3,
          ean: 3333333,
          codIn: 333,
          desc: "Sapatênis",
          detalhe: "Esporte",
          fabric: "Asics",
          variacoes: [{ cor: "Azul", tamanho: "40", preco: "400,00" }],
        },
        {
          id: 4,
          ean: 4444444,
          codIn: 444,
          desc: "Coturno",
          detalhe: "Couro",
          fabric: "Freeway",
          variacoes: [{ cor: "Cinza", tamanho: "41", preco: "500,00" }],
        },
      ],
      produto: {
        id: "",
        detalhe: "",
        ean: "",
        codIn: "",
        desc: "",
        fabric: "",
        variacoes: [],
      },
    };
  },
  methods: {
    getProducts() {
      this.products = this.produto.variacoes;
      // console.log(this.products[0]);
    },
    adicionarVariacao() {
      const variacao = { cor: "", tamanho: "", preco: "" };
      this.produto.variacoes.push(variacao);
    },
    deletar(parametro: Produtos[]) {
      this.produtos.splice(parametro, 1);
    },
    adicionar() {
      console.log(this.produto);
      this.produtos.push(this.produto);
      this.produto = {
        id: "",
        detalhe: "",
        ean: "",
        codIn: "",
        desc: "",
        fabric: "",
        variacoes: [],
      };
    },
  },
  mounted() {
    this.taman = tamanhos;
    this.co = cores;
    this.fabri = fabricantes;
    this.getProducts();
  },
})
export default class HelloWorld extends Vue {
  // msg!: string;
  private editingRows: [] | null = null;
  // private produto: Produtos | null = null;
  // private produtos: Produtos | null = null;
  // private variacoes: Variacoes | null = null;
  // adicionarVariacao() {
  //   const variacao = { cor: "", tamanho: "", preco: "" };
  //   // this.produto.variacoes.push(variacao);
  // }
  // deletar(parametro: Produtos[]) {
  //   // this.produtos.splice(parametro, 1);
  // }
  // adicionar() {
  //   // console.log(this.produto);
  //   // this.produtos.push(this.produto);
  // }
}
</script>

<style scoped>
.table-box {
  width: 400px;
  margin: 0px auto;
}

.table-box table {
  width: 100%;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
