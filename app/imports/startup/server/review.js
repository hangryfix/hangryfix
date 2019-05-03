import { Meteor } from 'meteor/meteor';
import { Reviews } from '../../api/review/review.js';


/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.user}`);
  Reviews.insert(data);
}

/** Initialize the collection if empty. */
if (Reviews.find().count() === 0) {
  if (Meteor.settings.defaultReviews) {
    console.log('Creating default Reviews.');
    Meteor.settings.defaultReviews.map(data => addData(data));
  }
}

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Reviews', function publish() {
  return Reviews.find();
});
