import React from 'react';
import { Card, Spacer } from '@nextui-org/react'; 
// Array of article objects, each containing an id, title, and description
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
      {/* Page title */}
      <h1 className="text-3xl font-bold mb-8">Articles</h1>

      {/* Grid container for the articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Map over the articles array and render a Card for each article */}
        {articles.map((article) => (
          <Card key={article.id} hoverable clickable>
            {/* Card Header with article title */}
            <Card.Header>
              <h4 className="text-xl font-semibold">{article.title}</h4>
            </Card.Header>
            
            {/* Card Body with article description */}
            <Card.Body>
              <p>{article.description}</p>
            </Card.Body>

            {/* Spacer for adding space below the card content */}
            <Spacer y={1} />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ArticlesPage;
