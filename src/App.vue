<script setup>
import { ref } from 'vue'

const query = ref('')
const featured = ref([
  { id: 1, title: 'Le Petit Prince', author: 'A. de Saint-Exupéry', available: true },
  { id: 2, title: 'Germinal', author: 'É. Zola', available: false },
  { id: 3, title: 'Les Misérables', author: 'V. Hugo', available: true },
])
</script>

<template>
  <div class="page">
    <h1>Biblio+</h1>
    <input v-model="query" type="search" placeholder="Titre, auteur…" />
    <p>Recherche en cours : {{ query }}</p>
    <ul>
      <li v-for="book in featured" :key="book.id">
        <span>{{ book.title }} — {{ book.author }}</span>
        <strong v-if="book.available">Disponible</strong>
        <em v-else>Emprunté</em>
        <button type="button" @click="book.available = !book.available">Changer le statut</button>
      </li>
    </ul>
  </div>
</template>
<style scoped>
* {
  font-family: Georgia, 'Times New Roman', Times, serif;
}
.page{
  display: block;
  width: fit-content;
  padding: 20px;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.635);
  margin: auto;
}
input{
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.635);
}
h1{
  text-align: center;
  background-color: rgba(248, 248, 232, 0.868);
  border-radius: 10px;
  border: 2px solid rgba(248, 248, 232, 0.868);
}
ul{
  margin: 0;
  padding: 0;
}
li{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 5px 0px;
  background-color: rgba(248, 248, 232, 0.868);
  border-radius: 5px;
}
span{
  width: 30%;
}
button{
  background-color: rgba(199, 249, 93, 0.712);
  padding: 7px;
  border-radius: 10px;
  border: none;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.635);
  cursor: pointer;
  transition: 0.1s ease-in-out;
}
button:hover{
  scale: 1.02;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.635);
}
button:active{
  scale: 1.07;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.635);
}
</style>
