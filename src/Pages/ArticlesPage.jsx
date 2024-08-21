import React from 'react';
import { Card, Spacer } from '@nextui-org/react';

const articles = [
  {
    id: 1,
    title: 'Article One',
    description: 'This is a description for the first article. It provides an overview of the content.',
  },
  {
    id: 2,
    title: 'Article Two',
    description: 'This is a description for the second article. It provides additional details and insights.',
  },
  {
    id: 3,
    title: 'Article Three',
    description: 'This is a description for the third article. It covers various aspects of the topic.',
  },
];

const ArticlesPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Card key={article.id} hoverable clickable>
            <Card.Header>
              <h4 className="text-xl font-semibold">{article.title}</h4>
            </Card.Header>
            <Card.Body>
              <p>{article.description}</p>
            </Card.Body>
            <Spacer y={1} />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ArticlesPage;
