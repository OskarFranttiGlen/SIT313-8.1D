// src/Pages/ArticlesPage.jsx
import React from 'react';
import { Card } from 'semantic-ui-react';

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
    <div className="articles-page">
      <h1>Articles</h1>
      <Card.Group>
        {articles.map(article => (
          <Card key={article.id}>
            <Card.Content>
              <Card.Header>{article.title}</Card.Header>
              <Card.Description>{article.description}</Card.Description>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </div>
  );
};

export default ArticlesPage;
