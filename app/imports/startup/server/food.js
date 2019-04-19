import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Foods } from '../../api/food/food.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.user})`);
  Foods.insert(data);
}

/** Initialize the collection if empty. */
if (Foods.find().count() === 0) {
  if (Meteor.settings.defaultFood) {
    console.log('Creating default food.');
    Meteor.settings.defaultFood.map(data => addData(data));
  }
}

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Foods', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Foods.find({ user: username });
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('FoodAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Foods.find();
  }
  return this.ready();
});
