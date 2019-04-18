import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { UserInfo } from '../../api/user-info/user-info';

/* eslint-disable no-console */

function createUser(firstName, lastName, username, email, password, tags, role) {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    firstName: firstName,
    lastName: lastName,
    username: username,
    email: email,
    password: password,
    tags: tags,
  });

  UserInfo.insert(firstName, lastName, username, email, tags, userID)

  if (role === 'admin') {
    Roles.addUsersToRoles(userID, 'admin');
  }
}

/** When running app for first time, pass a settings file to set up a default user account. */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.map(({ firstName, lastName, username, email, password, tags, role }) => createUser(firstName, lastName, username, email, password, tags, role));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
