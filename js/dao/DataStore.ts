import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_EXPIRATION_TIME = 60 * 60 * 1000; // 缓存过期时间为1小时

export interface CachedData<T> {
  data: T;
  timestamp: number;
}

export const controller = new AbortController();
const signal = controller.signal;

async function saveCachedData<T>(url: string, data: T): Promise<void> {
  try {
    const cachedData: CachedData<T> = {
      data,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(url, JSON.stringify(cachedData));
  } catch (error) {
    console.error(`Failed to cache data for ${url}: ${error}`);
  }
}

async function fetchCachedData<T>(url: string): Promise<CachedData<T> | null> {
  const cachedData = await AsyncStorage.getItem(url);
  if (cachedData !== null) {
    const {data, timestamp} = JSON.parse(cachedData);
    if (Date.now() - timestamp < CACHE_EXPIRATION_TIME) {
      return {data, timestamp};
    }
  }
  return null;
}

async function fetchNetData<T>(url: string): Promise<T> {
  const response = await fetch(url, {signal});
  if (response.ok) {
    const data = (await response.json()) as T;
    return data;
  }
  if (response.statusText === 'AbortError') {
    console.log('Fetch aborted');
    return {} as T;
  }
  throw new Error('Network response was not ok.');
}

export async function fetchData<T>(url: string): Promise<CachedData<T>> {
  try {
    const cachedData = await fetchCachedData<T>(url);

    if (cachedData !== null) {
      return cachedData;
    }

    const netData = await fetchNetData<T>(url);
    if (netData !== null) {
      // 这里不加await，加快执行效率，但可能存在隐患
      saveCachedData(url, netData);
      return {data: netData, timestamp: Date.now()};
    }

    throw new Error(`Failed to fetch data for ${url}`);
  } catch (error) {
    throw error;
  }
}
