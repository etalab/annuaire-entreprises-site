export interface IArticle {
  slug: string;
  administrations: string[];
  public: string[];
  title: string;
  body: string;
  cta: { label: string; to: string }[];
}

const loadAllArticles = () => {
  const articles = [] as IArticle[];
  //@ts-ignore
  const faqArticlesFolderContext = require.context(
    '../../data/faq',
    true,
    /\.yml$/
  );
  const keys = faqArticlesFolderContext.keys();
  const values = keys.map(faqArticlesFolderContext);

  keys.forEach((slug: string, index: number) => {
    articles.push({ ...values[index], slug });
  });

  return articles;
};

const getFaqArticles = () => {
  return allArticles;
};

export const getFaqArticlesByTag = (tagList: string[]) => {
  const filteredArticles = new Set();
  allArticles.forEach((article) => {
    tagList.forEach((tag) => {
      if (article.administrations.indexOf(tag) > -1) {
        filteredArticles.add(article);
      }
    });
  });

  return Array.from(filteredArticles);
};

const allArticles = loadAllArticles();

export default getFaqArticles;
