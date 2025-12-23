<template>
  <section class="dashboard">
    <DashboardCard title="Minhas tarefas">
      <TaskList />
    </DashboardCard>

    <!-- No futuro -->
    <!--
    <DashboardCard title="Resumo financeiro" />
    <DashboardCard title="Estudos" />
    -->
  </section>
</template>

<script setup lang="ts">
import DashboardCard from '../components/dashboard/DashboardCard.vue'
import TaskList from '../components/tasks/TaskList.vue'
</script>

<style scoped>
.dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}
</style>
