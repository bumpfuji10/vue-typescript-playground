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

export const getArticle = (articleId) => {
  const articleUrl = `${URL}/${articleId}`;  // 記事IDを含めたURLを作成
  return axios.get(
    articleUrl,
    {
      headers: {"X-MICROCMS-API-KEY": import.meta.env.VITE_HEADLESS_CMS_API_KEY}
    }
  );
};
