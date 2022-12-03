import { useLayoutEffect, useState } from "react";

const EXTRANCT_SEARCHPARAMS = /\?(.*)/s;
export default function useCustSearchparams(param = "") {
  const [url, setUrl] = useState("");
  const [searchparams, setSearchParams] = useState([]);
  useLayoutEffect(() => {
    if (url === param) return;
    setUrl(param ?? "");
  }, [param]);

  useLayoutEffect(() => {
    if (!url) return;

    const list = [];
    const urlSearch = url?.split(EXTRANCT_SEARCHPARAMS)[1];
    const queryParams = new URLSearchParams(urlSearch);
    for (const [key, value] of queryParams) {
      list.push({ key, value });
      // console.log({ key, value });
    }
    // console.log("list : ", list);

    // const count = urlSearch?.match(/&/g || [])?.length - list?.length;

    // for (let c = 0; c <= count; c++) {
    //   list.push({ key: "", value: "" });
    // }

    setSearchParams(list);
  }, [url]);

  return searchparams;
}
