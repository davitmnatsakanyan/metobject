import axiosInstance from "@/axios.ts";
import type {Department} from "@/types/global.ts";

export async function fetchDepartments(): Promise<Department[]> {
    let departments: Department[] = []
    try {
        const response = await axiosInstance.get('public/collection/v1/departments');
        departments = response.data.departments;
    } catch (error) {
        console.error('Failed to fetch departments:', error);
    }

    return departments;
}