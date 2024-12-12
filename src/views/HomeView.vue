<template>
  <main>
    <div class="flex flex-col w-full p-10">
      <div class="flex gap-3">
        <input v-model="searchQuery" type="text" placeholder="Search" class="p-2 border min-w-80" />
        <select v-model="selectedDepartment" class="p-2 border min-w-80">
          <option :value="selectedDepartment" disabled>Select Department</option>
          <option v-for="department in departmentStore.departments" :key="department.departmentId" :value="department.departmentId">{{ department.displayName }}</option>
        </select>
        <button @click="search()" class="p-2 bg-blue-500 text-white">Search</button>
      </div>
      <div class="w-full">
        <table class="w-full">
          <thead>
          <tr>
            <th class="px-4 py-2">Object ID</th>
            <th class="px-4 py-2">Image</th>
            <th class="px-4 py-2">Department</th>
            <th class="px-4 py-2">Title</th>
          </tr>
          </thead>
          <tbody>
          <tr v-if="loading">
            <td class="px-4 py-2" colspan="4">Loading...</td>
          </tr>
          <tr v-if="!loading && metObjectList.length === 0">
            <td class="px-4 py-2" colspan="4">No results found</td>
          </tr>
          <tr v-if="!loading && metObjectList.length > 0" v-for="item in metObjectList" :key="item.objectID">
            <td class="border px-4 py-2">{{ item.objectID }}</td>
            <td class="border px-4 py-2">
              <img :src="item.primaryImageSmall" alt="Primary Image" class="h-16 w-16 object-cover">
            </td>
            <td class="border px-4 py-2">{{ item.department }}</td>
            <td class="border px-4 py-2">{{ item.title }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {useDepartmentStore} from "@/stores/department.ts";
import { fetchMetObjects } from "@/api/metObject.ts";
import type {ObjectItem} from "@/types/global.ts";

const departmentStore = useDepartmentStore()
const searchQuery = ref<string | null>(null);
const selectedDepartment = ref<number | null>(null);
const loading = ref<boolean>(false);
const metObjectList = ref<ObjectItem[]>([]);

const search = async () => {
  if (searchQuery.value){
    loading.value = true
    metObjectList.value = await fetchMetObjects(searchQuery.value, selectedDepartment.value)
    loading.value = false
  }
  else {
    alert('Please enter a search query')
  }
};

onMounted(() => {

});
</script>

