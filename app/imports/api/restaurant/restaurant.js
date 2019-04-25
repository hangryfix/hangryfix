import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Restaurants = new Mongo.Collection('Restaurants');

/** Create a schema to constrain the structure of documents associated with this collection. */
const RestaurantSchema = new SimpleSchema({
  key: Number,
  name: String,
  address: String,
  hours: Array,
  'hours.$': String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Restaurants.attachSchema(RestaurantSchema);

/** Make the collection and schema available to other code. */
export { Restaurants, RestaurantSchema };
