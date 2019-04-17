import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Restaurants = new Mongo.Collection('Restaurants');

/** Create a schema to constrain the structure of documents associated with this collection. */
const RestaurantSchema = new SimpleSchema({
  name: String,
  address: String,
  hours: Object,
  'hours.monday': Object,
  'hours.monday.open': Number,
  'hours.monday.close': Number,
  'hours.tuesday': Object,
  'hours.tuesday.open': Number,
  'hours.tuesday.close': Number,
  'hours.wednesday': Object,
  'hours.wednesday.open': Number,
  'hours.wednesday.close': Number,
  'hours.thursday': Object,
  'hours.thursday.open': Number,
  'hours.thursday.close': Number,
  'hours.friday': Object,
  'hours.friday.open': Number,
  'hours.friday.close': Number,
  'hours.saturday': Object,
  'hours.saturday.open': Number,
  'hours.saturday.close': Number,
  'hours.sunday': Object,
  'hours.sunday.open': Number,
  'hours.sunday.close': Number,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Restaurants.attachSchema(RestaurantSchema);

/** Make the collection and schema available to other code. */
export { Restaurants, RestaurantSchema };
