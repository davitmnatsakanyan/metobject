import {onMounted, ref} from "vue";
import {defineStore} from "pinia";
import type {Department} from "@/types/global.ts";
import {fetchDepartments} from "@/api/department.ts";

export const useDepartmentStore = defineStore('department', () => {
    const departments = ref<Department[]>([]);

    onMounted(async () => {
        departments.value = await fetchDepartments();
    });

    return {
        departments
    };
});