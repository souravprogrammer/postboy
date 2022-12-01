import { useEffect, useState } from "react";
import axios from "axios";

async function makeRequest(params) {
  try {
    const res = axios({
      url: params.url,
      method: params.method,
      data: params.body,
      headers: params.headers,
    });
    const result = await res;
    return {
      ...result,
      size: {
        responseSize: JSON.stringify(result).length,
        body: JSON.stringify(result.data).length,
        headers: JSON.stringify(result.headers).length,
      },
    };
  } catch (e) {
    return {
      ...e.response,
      size: {
        responseSize: JSON.stringify(e.response).length,
        body: JSON.stringify(e.response.data).length,
        headers: JSON.stringify(e.response.headers).length,
      },
    };
  }
}

export default function useFetch() {
  const [params, setParams] = useState();
  const [response, setResponse] = useState();

  const call = async () => {
    const result = await makeRequest(params);
    setResponse(result);
  };

  useEffect(() => {
    if (params === undefined) return;

    call();
  }, [params]);

  return [response, setParams];
}
