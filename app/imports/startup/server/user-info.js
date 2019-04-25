import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { UserInfo } from '../../api/user-info/user-info';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.firstName} (${data.username})`);
  UserInfo.insert(data);
}

/** Initialize the collection if empty. */
if (UserInfo.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating default user info.');
    Meteor.settings.defaultAccounts.map(data => addData(data));
  }
}

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('UserInfo', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return UserInfo.find({ username: username });
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('UserInfoAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return UserInfo.find();
  }
  return this.ready();
});
