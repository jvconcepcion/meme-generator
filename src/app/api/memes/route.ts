import { CustomError } from '@interface/api';

const headers = {
  'Content-Type': 'application/json',
  'Accept': '*/*',
}

export const GET = async (): Promise<any> => {
  try {
    const res = await fetch('https://api.imgflip.com/get_memes', {
      headers
    })
    const data = await res.json()
    return new Response(JSON.stringify(data), { status: 200 })
  } catch (e) {
    const error = e as CustomError;
    return new Response("Failed to fetch all memes", { status: error.status });
  }
};
