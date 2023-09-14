import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_EXPIRATION_TIME = 60 * 60 * 1000; // 缓存过期时间为1小时

interface CachedData<T> {
  data: T;
  timestamp: number;
}

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

async function fethcCachedData<T>(url: string): Promise<T | null> {
  try {
    const cachedData = await AsyncStorage.getItem(url);
    if (cachedData !== null) {
      const {data, timestamp} = JSON.parse(cachedData) as CachedData<T>;
      if (Date.now() - timestamp < CACHE_EXPIRATION_TIME) {
        return data;
      }
    }
    return null;
  } catch (error) {
    console.error(`Failed to get cached data for ${url}: ${error}`);
    return null;
  }
}

async function fetchNetData<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error('Network response was not ok.');
  } catch (error) {
    console.error(`Failed to fetch network data for ${url}: ${error}`);
    return null;
  }
}

export async function fetchData<T>(url: string): Promise<T | null> {
  const cachedData = await fethcCachedData<T>(url);
  if (cachedData !== null) {
    return cachedData;
  }
  const netData = await fetchNetData<T>(url);
  if (netData !== null) {
    // 此处省略 await 加快执行效率，但可能会有隐患
    saveCachedData(url, netData);
    return netData;
  }
  return null;
}
