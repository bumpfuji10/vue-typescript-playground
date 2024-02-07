// https://www.npmjs.com/package/cheerio
import { load } from 'cheerio';
import hljs from 'highlight.js'
import 'highlight.js/styles/hybrid.css';

export const highlightCode = (HtmlContent: string) => {
  if (HtmlContent) {
    const $ = load(HtmlContent)
    $('pre code').each((_, elm) => {
      const result = hljs.highlightAuto($(elm).text());
      $(elm).html(result.value);
      $(elm).addClass('hljs');
    });
    return {
      content: $.html(),
    };
  }
  return false;
}
