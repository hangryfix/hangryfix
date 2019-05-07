import { Meteor } from 'meteor/meteor';
import { Keys } from '../../api/keys/keys.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(' Adding Keys ');
  Keys.insert(data);
}

/** Initialize the collection if empty. */
if (Keys.find().count() === 0) {
  console.log('keys');
  if (Meteor.settings.defaultKeys) {
    console.log('Creating default food.');
    Meteor.settings.defaultKeys.map(data => addData(data));
  }
}

Meteor.publish('Keys', function publish() {
    return Keys.find();
});
