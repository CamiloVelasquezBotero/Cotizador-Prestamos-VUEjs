
<script setup> 

  import { ref, computed, watch } from 'vue'

  // Imprtamos los componentes
  import Header from './components/Header.vue'
  import Button from './components/Button.vue' 
  // Importamos helpers
  import { calcularTotalPagar } from './helpers/index.js'
  

  const cantidad = ref(10000);

  const meses = ref(6);
  const total = ref(0);
  const MIN = 0;
  const MAX = 20000;
  const STEP = 100;

  // Usamos la API de internacionalizacion de js
  const formatearDinero = (valor) => {
    const formatter = new Intl.NumberFormat('en-US', { // Configuraciones de la Api
      style: 'currency', // currency o dinero
      currency: 'USD' // Tipo moneda
    })
    return formatter.format(valor);
  }

  watch([cantidad, meses], () => {
    total.value = calcularTotalPagar(cantidad.value, meses.value);
  })

  const pagoMensual = computed( () => {
    return total.value / meses.value;
  });
  
  function handleChangeDecremento() { 
    const valor = cantidad.value - STEP;
    if(valor < MIN) {
      alert('Cantidad minima!');
      return;
    }
    cantidad.value = valor; // De lo contrario entonces le cambiamos el valor
  }
  function handleChangeIncremento() { 
    const valor = cantidad.value + STEP;
    if(valor > MAX) { // si la cantidad es mayor al maximo entonces...
      alert('Cantidad maxima!');
      return;
    }
    cantidad.value = valor;
  }
</script>

<template>
  <div class="my-20 max-w-lg mx-auto bg-white shadow p-10">
    <Header /> <!--Componente Header-->

    <div class="flex justify-between mt-10">
      <Button 
        :operador="'-'"
        @funcion="handleChangeDecremento"
      /><!--Componente Button-->
      <Button
        :operador="'+'"
        @funcion="handleChangeIncremento"
      />
    </div>

    <div class="my-5">
      <input
        type="range"
        class="w-full bg-gray-200 accent-lime-500 hover:accent-lime-600"
        :min="MIN"
        :max="MAX"
        :step="STEP"
        v-model.number="cantidad"
      />

      <p class="text-center my-10 text-5xl font-extrabold text-indigo-600">{{ formatearDinero(cantidad) }}</p>

      <h2 class="text-2xl font-extrabold text-gray-500 text-center">
        Elige un <span class="text-indigo-600">Plazo </span> a pagar
      </h2>

      <select 
        class="w-full p-2 bg-white border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500
        mt-5"
        :value="meses"
        v-model="meses"
      >
        <option value="6">6</option>
        <option value="12">12</option>
        <option value="24">24</option>
      </select>
    </div>

    <div v-if="total > 0" class="my-5 space-y-3 bg-gray-50 p-5">
      <h2 class="text-2xl font-extrabold text-gray-500 text-center">
        Resumen <span class="text-indigo-6000">de pagos</span>
      </h2>
      <p class="text-xl text-gray-500 text-center font-bold">{{ meses }} Meses</p>
      <p class="text-xl text-gray-500 text-center font-bold">Total a pagar: {{ formatearDinero(total) }}</p>
      <p class="text-xl text-gray-500 text-center font-bold">Mensuales: {{ formatearDinero(pagoMensual) }}</p><!-- nuestra funcion formatear se le puede pasar normalmente un computedProperties -->
    </div>

    <p v-else class="text-center">Añade una cantidad y un plazo a pagar</p>
  </div>
</template>

<style scoped> 

</style>
