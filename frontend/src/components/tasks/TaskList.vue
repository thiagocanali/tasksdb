<template>
  <section>
    <h2>Minhas tarefas</h2>

    <div class="form">
      <input
        v-model="newTask"
        placeholder="Digite uma tarefa"
      />
      <button @click="addTask">Adicionar</button>
    </div>

    <ul>
      <li v-for="task in tasks" :key="task.id">
        <input type="checkbox" v-model="task.done" @change="toggleTask(task)" />
        <span :class="{ done: task.done }">{{ task.title }}</span>
        <button @click="deleteTask(task.id)">❌</button>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Task {
  id: number
  title: string
  done: boolean
}

const newTask = ref('')
const tasks = ref<Task[]>([])

// Buscar tasks ao montar o componente
async function fetchTasks() {
  try {
    const res = await fetch('/tasks') // Proxy do Vite
    tasks.value = await res.json()
  } catch (error) {
    console.error('Erro ao buscar tasks', error)
  }
}

// Adicionar task
async function addTask() {
  if (!newTask.value) return

  try {
    const res = await fetch('/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTask.value }),
    })
    const task = await res.json()
    tasks.value.push(task)
    newTask.value = ''
  } catch (error) {
    console.error('Erro ao criar task', error)
  }
}

// Alternar done
async function toggleTask(task: Task) {
  try {
    await fetch(`/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done: task.done }),
    })
  } catch (error) {
    console.error('Erro ao atualizar task', error)
  }
}

// Deletar task
async function deleteTask(id: number) {
  try {
    await fetch(`/tasks/${id}`, { method: 'DELETE' })
    tasks.value = tasks.value.filter(t => t.id !== id)
  } catch (error) {
    console.error('Erro ao deletar task', error)
  }
}

// Inicializa
onMounted(fetchTasks)
</script>

<style scoped>
section {
  margin-top: 20px;
}

.form {
  display: flex;
  gap: 8px;
}

input[type='text'] {
  flex: 1;
  padding: 6px;
}

button {
  padding: 6px 10px;
  cursor: pointer;
}

ul {
  list-style: none;
  padding: 0;
  margin-top: 16px;
}

li {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
}

li .done {
  text-decoration: line-through;
  color: gray;
}
</style>
