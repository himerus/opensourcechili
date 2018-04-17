/**
 * @see https://developers.google.com/search/docs/data-types/recipe
 * @see https://developers.google.com/search/docs/guides/intro-structured-data
 * @see https://jsonld.com/recipe/
 * @see https://search.google.com/structured-data/testing-tool/u/0/
 * @see https://www.lullabot.com/articles/create-seo-juice-by-adding-json-ld-structured-data-to-drupal-8
 */
/* eslint-disable quote-props, comma-dangle */
(function recipeJsonld() {
  const recipe = {
    '@context': 'http://schema.org',
    '@type': 'Recipe',
    'name': 'Open Source Chili',
    'cookTime': 'PT2H',
    'prepTime': 'PT2H',
    'recipeYield': '5 Quarts',
    'author': {
      '@type': 'Person',
      'name': 'Jake Strawn'
    },
    'datePublished': '2018-04-15',
    'description': 'The following recipe will guide you through selecting the batch size and heat level, show you the appropriate ingredients, and walk you through the process of making the chili and optionally canning the chili for long term storage.',
    'image': 'http://opensourcechili.com/assets/images/cayenne.jpg',
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.8',
      'reviewCount': '10'
    },
    'recipeIngredient': [
      'Crushed Tomatoes',
      'Diced Tomatoes',
      'Tomato Sauce',
      'Water',
      'Beans',
      'Ground Beef',
      'Ground Italian Sausage',
      'Bacon',
      'Onion',
      'Celery',
      'Jalapeno',
      'Chili Powder',
      'Worcestershire Sauce',
      'Cholula',
      'Oregano',
      'Cumin',
      'Basil',
      'Cayenne Pepper',
      'Paprika',
      'Beef Bouillon',
      'Black Pepper',
      'Crushed Red Pepper'
    ],
    'recipeInstructions': [
      'Prepare beans',
      'Cook beans',
      'Measure spices',
      'Make the sauce',
      'Combine spice & sauce',
      'Chop onion(s)',
      'Chop Jalapeños',
      'Brown Meat',
      'Simmer',
      'Add celery',
      'Serve & Enjoy'
    ]
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.innerHTML = JSON.stringify(recipe);
  document.getElementsByTagName('head')[0].appendChild(script);
}(document));
