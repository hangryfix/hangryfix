import { Meteor } from 'meteor/meteor';
import { Reviews } from '../../api/review/review.js';

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Reviews', function publish() {
  return Reviews.find();
});
