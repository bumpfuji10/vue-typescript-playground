import axios from "axios";

const URL = "https://lbt0630zfb.microcms.io/api/v1/articles";

export const getArticles = () => {
  return axios.get(
    URL,
    {
      headers: {"X-MICROCMS-API-KEY": import.meta.env.VITE_HEADLESS_CMS_API_KEY}
    }
  );
};
