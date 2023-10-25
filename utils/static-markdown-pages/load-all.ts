import { IArticle } from '#models/article/type';
import parseMarkdownSync from './parse-markdown';

export function loadAll<T extends IArticle>(
  articlesFolderContext: Record<string, T>
): T[] {
  const rawArticles = [] as Array<T>;
  //@ts-ignore
  const keys = articlesFolderContext.keys();
  const values = keys.map(articlesFolderContext);

  keys
    // weirdly context add duplicates - this filter removes them
    .filter((k: string) => k.indexOf('./') === 0)
    .forEach((key: string, index: number) => {
      const slug = key.replace('.yml', '').replace('./', '');
      //@ts-ignore
      rawArticles.push({ ...values[index], slug });
    });

  return rawArticles.map((article) => ({
    ...article,
    body: parseMarkdownSync(article.body as unknown as string),
  }));
}
