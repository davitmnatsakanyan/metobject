import axiosInstance from "@/axios.ts";
import type {ObjectItem} from "@/types/global.ts";

export async function fetchMetObjects(searchQuery: string | null, department: number | null): Promise<ObjectItem[]> {
  try {
    let metObjects: ObjectItem[] = [];
    const objectIds = await axiosInstance.get('public/collection/v1/search', {
      params: {
        q: searchQuery,
        departmentId: department,
      },
    });
    if(objectIds.data.objectIDs){
      const objectIdsArray = objectIds.data.objectIDs.slice(0, 10);

      const objectPromises = objectIdsArray.map(async (objectId: number) => {
       return await getMetObject(objectId);
      });

      const objects = await Promise.all(objectPromises);
      metObjects = objects.filter((object: any) => object !== null);
    }
    else{
      metObjects = [];
    }

    return metObjects;

  } catch (error) {
    console.error("Failed to fetch object IDs:", error);
    return [];
  }
}

export async function getMetObject(objectId: number) {
  try {
    const object = await axiosInstance.get(`public/collection/v1/objects/${objectId}`);
    return object.data;
  } catch (error) {
    console.error(`Failed to fetch object ${objectId}:`, error);
    return null;
  }
}
