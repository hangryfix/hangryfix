import { Meteor } from 'meteor/meteor';
import { Restaurants } from '../../api/restaurant/restaurant.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name}`);
  Restaurants.insert(data);
}

/** Initialize the collection if empty. */
if (Restaurants.find().count() === 0) {
  if (Meteor.settings.defaultRestaurants) {
    console.log('Creating default Restaurant data.');
    Meteor.settings.defaultRestaurants.map(data => addData(data));
  }
}

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Restaurants', function publish() {
  return Restaurants.find();
});
