import type {ImageSourcePropType} from 'react-native';

export type ContentItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  meta: string;
  image: ImageSourcePropType;
};

export const events: ContentItem[] = [
  {id: 'sunrise-yoga', title: 'Morning Yoga Session', category: 'WELLNESS', meta: 'Today · 7:00 AM', description: 'A guided outdoor yoga session focused on movement and relaxation.', image: require('./assets/harbor-stay-event-sunrise-yoga-session.png')},
  {id: 'artisan-market', title: 'Artisan Market', category: 'LOCAL ACTIVITY', meta: 'Today · 10:00 AM', description: 'A market with goods, art, and regional products from local makers.', image: require('./assets/harbor-stay-event-artisan-market.png')},
  {id: 'mixology', title: 'Mixology Workshop', category: 'WORKSHOP', meta: 'Today · 4:30 PM', description: 'A practical session covering drink preparation, balance, and presentation.', image: require('./assets/harbor-stay-event-mixology-masterclass.png')},
  {id: 'wine-jazz', title: 'Wine and Jazz', category: 'ENTERTAINMENT', meta: 'Tonight · 7:30 PM', description: 'Live jazz with a selection of regional wines.', image: require('./assets/harbor-stay-event-wine-and-jazz-evening.png')},
  {id: 'piano', title: 'Live Piano', category: 'ENTERTAINMENT', meta: 'Tonight · 8:00 PM', description: 'Live piano and drinks in the lobby lounge.', image: require('./assets/harbor-stay-event-live-piano-evening.png')},
  {id: 'photography', title: 'Sunset Photography Tour', category: 'OUTDOORS', meta: 'Tomorrow · 6:00 PM', description: 'A guided photography walk with tips for capturing evening light and scenery.', image: require('./assets/harbor-stay-event-sunset-photography-tour.png')},
  {id: 'nature-walk', title: 'Guided Nature Walk', category: 'OUTDOORS', meta: 'Tomorrow · 9:00 AM', description: 'A guided walk covering trails and native plants around the property.', image: require('./assets/harbor-stay-event-guided-nature-walk.png')},
  {id: 'spa', title: 'Wellness Workshop', category: 'WELLNESS', meta: 'Tomorrow · 2:00 PM', description: 'A session covering breathing exercises, aromatherapy, and relaxation.', image: require('./assets/harbor-stay-event-wellness-spa-workshop.png')},
  {id: 'movie', title: 'Family Movie Night', category: 'FAMILY', meta: 'Friday · 7:00 PM', description: 'An outdoor movie screening with blankets, popcorn, and drinks.', image: require('./assets/harbor-stay-event-family-movie-night.png')},
  {id: 'tasting', title: 'Chef Tasting Menu', category: 'DINING', meta: 'Friday · 8:00 PM', description: 'A guided multi-course tasting with seasonal and local ingredients.', image: require('./assets/harbor-stay-event-chefs-signature-tasting.png')},
  {id: 'brunch', title: 'Sunday Brunch', category: 'DINING', meta: 'Sunday · 11:00 AM', description: 'A brunch menu with food and sparkling drinks.', image: require('./assets/harbor-stay-event-farewell-brunch.png')},
];

export const menuItems: ContentItem[] = [
  {id: 'eggs-benedict', title: 'Classic Eggs Benedict', category: 'BREAKFAST', meta: '$18', description: 'Poached eggs, Canadian bacon, toasted English muffin, and silky hollandaise.', image: require('./assets/harbor-stay-dish-classic-eggs-benedict.png')},
  {id: 'pancakes', title: 'Canadian Pancake Stack', category: 'BREAKFAST', meta: '$16', description: 'Fluffy pancakes, maple syrup, berries, and whipped butter.', image: require('./assets/harbor-stay-dish-canadian-pancake-stack.png')},
  {id: 'avocado-toast', title: 'Avocado Toast', category: 'BREAKFAST', meta: '$17', description: 'Sourdough, avocado, poached egg, herbs, and cherry tomatoes.', image: require('./assets/harbor-stay-dish-avocado-toast-deluxe.png')},
  {id: 'salmon-bagel', title: 'Smoked Salmon Bagel', category: 'BREAKFAST', meta: '$19', description: 'Smoked salmon, cream cheese, capers, red onion, and fresh dill.', image: require('./assets/harbor-stay-dish-smoked-salmon-bagel.png')},
  {id: 'caesar', title: 'Classic Caesar Salad', category: 'LUNCH', meta: '$15', description: 'Crisp romaine, parmesan, croutons, and our classic Caesar dressing.', image: require('./assets/harbor-stay-dish-classic-caesar-salad.png')},
  {id: 'chicken-wrap', title: 'Grilled Chicken Wrap', category: 'LUNCH', meta: '$18', description: 'Grilled chicken, greens, tomato, avocado, and garlic aioli.', image: require('./assets/harbor-stay-dish-grilled-chicken-wrap.png')},
  {id: 'burger', title: 'Angus Burger', category: 'LUNCH', meta: '$22', description: 'Angus beef, cheddar, brioche bun, pickles, and fries.', image: require('./assets/harbor-stay-dish-gourmet-angus-burger.png')},
  {id: 'salmon', title: 'Grilled Atlantic Salmon', category: 'DINNER', meta: '$32', description: 'Atlantic salmon, seasonal vegetables, lemon butter, and fresh herbs.', image: require('./assets/harbor-stay-dish-grilled-atlantic-salmon.png')},
  {id: 'risotto', title: 'Creamy Mushroom Risotto', category: 'DINNER', meta: '$28', description: 'Arborio rice, wild mushrooms, parmesan, and garden herbs.', image: require('./assets/harbor-stay-dish-creamy-mushroom-risotto.png')},
  {id: 'pork', title: 'Maple Glazed Pork Chop', category: 'DINNER', meta: '$34', description: 'Thick-cut pork chop, maple glaze, root vegetables, and apple jus.', image: require('./assets/harbor-stay-dish-maple-glazed-pork-chop.png')},
  {id: 'duck', title: 'Herb Roasted Duck Breast', category: 'DINNER', meta: '$36', description: 'Tender duck breast, roasted vegetables, berry sauce, and fresh herbs.', image: require('./assets/harbor-stay-dish-herb-roasted-duck-breast.png')},
  {id: 'tenderloin', title: 'Beef Tenderloin', category: 'DINNER', meta: '$42', description: 'Beef tenderloin, potato gratin, seasonal greens, and red wine jus.', image: require('./assets/harbor-stay-dish-beef-tenderloin.png')},
  {id: 'filet', title: 'Wild Mushroom Filet Mignon', category: 'DINNER', meta: '$46', description: 'Filet mignon, wild mushroom sauce, roasted potatoes, and vegetables.', image: require('./assets/harbor-stay-dish-wild-mushroom-filet-mignon.png')},
  {id: 'linguine', title: 'Lobster Linguine', category: 'DINNER', meta: '$39', description: 'Fresh lobster, linguine, light cream sauce, parmesan, and herbs.', image: require('./assets/harbor-stay-dish-lobster-linguine.png')},
  {id: 'cheesecake', title: 'New York Cheesecake', category: 'DESSERT', meta: '$12', description: 'Classic baked cheesecake with berry compote and vanilla cream.', image: require('./assets/harbor-stay-dish-new-york-cheesecake.png')},
  {id: 'lava-cake', title: 'Chocolate Lava Cake', category: 'DESSERT', meta: '$13', description: 'Warm chocolate cake with a molten center and vanilla ice cream.', image: require('./assets/harbor-stay-dish-chocolate-lava-cake.png')},
  {id: 'yogurt', title: 'Fresh Berry Yogurt Bowl', category: 'LIGHT BITES', meta: '$14', description: 'Greek yogurt, fresh berries, toasted granola, honey, and mint.', image: require('./assets/harbor-stay-dish-fresh-berry-yogurt-bowl.png')},
  {id: 'smoothie', title: 'Fresh Berry Smoothie', category: 'DRINKS', meta: '$10', description: 'Berries, banana, yogurt, and a touch of local honey.', image: require('./assets/harbor-stay-drink-fresh-berry-smoothie.png')},
  {id: 'latte', title: 'Maple Latte', category: 'DRINKS', meta: '$8', description: 'Espresso, steamed milk, maple syrup, and cinnamon.', image: require('./assets/harbor-stay-drink-signature-maple-latte.png')},
  {id: 'mocktail', title: 'Sparkling Citrus Mocktail', category: 'DRINKS', meta: '$9', description: 'Fresh citrus, rosemary, sparkling water, and crushed ice.', image: require('./assets/harbor-stay-drink-sparkling-citrus-mocktail.png')},
];

export const roomOptions = ['101', '114', '207', '314', '408', '512'];

export const dateOptions = [
  'Today · July 13',
  'Tomorrow · July 14',
  'Wednesday · July 15',
  'Thursday · July 16',
  'Friday · July 17',
];
