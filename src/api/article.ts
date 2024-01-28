import axios from "axios";

const url = "https://lbt0630zfb.microcms.io/api/v1/articles";

export const getArticles = () => {
  console.log(import.meta.env.VITE_HEADLESS_CMS_API_KEY)
  return axios.get(
    url,
    {
      headers: {"X-MICROCMS-API-KEY": import.meta.env.VITE_HEADLESS_CMS_API_KEY}
    }
  );
};
