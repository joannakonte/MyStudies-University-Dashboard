const admin = require('firebase-admin');
const serviceAccount = require('./adminFirebase.json');
const fs = require('fs');
const { resolve } = require('path'); // Add this line

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'mystudieseamproject.firebaseapp.com', // replace with your databaseURL
});

class PopulateJsonFirestore {
  constructor() {
    console.time('Time taken');
    const [, , filepath, type, collectionname] = process.argv;

    this.absolutepath = resolve(process.cwd(), filepath);
    this.type = type;
    this.collectionname = collectionname;

    if (this.type !== 'set' && this.type !== 'add') {
      console.error(`Wrong method type ${this.type}`);
      console.log('Accepted methods are: set or add');
      this.exit(1);
    }

    if (this.absolutepath == null || this.absolutepath.length < 1) {
      console.error(`Make sure you have file path assigned ${this.absolutepath}`);
      this.exit(1);
    }

    if (this.collectionname == null || this.collectionname.length < 1) {
      console.error(`Make sure to specify firestore collection ${this.collectionname}`);
      this.exit(1);
    }

    console.log(`ABS: FILE PATH ${this.absolutepath}`);
    console.log(`Type: method is ${this.type}`);
  }

  async populate() {
    let data = [];

    try {
      data = JSON.parse(fs.readFileSync(this.absolutepath, {}), 'utf8');
    } catch (e) {
      console.error(e.message);
    }

    if (data.length < 1) {
      console.error('Make sure file contains items.');
    }

    var i = 0;
    for (var item of data) {
      console.log(item);
      try {
        this.type === 'set' ? await this.set(item) : await this.add(item);
      } catch (e) {
        console.log(e.message);
        this.exit(1);
      }

      if (data.length - 1 === i) {
        console.log(`**************************\n****SUCCESS UPLOAD*****\n**************************`);
        console.timeEnd('Time taken');
        this.exit(0);
      }

      i++;
    }
  }

  add(item) {
    console.log(`Adding item with id ${item.id}`);
    return admin.firestore().collection(this.collectionname).add(Object.assign({}, item))
      .then(() => true)
      .catch((e) => console.error(e.message));
  }

  set(item) {
    console.log(`setting item with id ${item.id}`);
    return admin.firestore().doc(`${this.collectionname}/${item.id}`).set(Object.assign({}, item))
      .then(() => true)
      .catch((e) => console.error(e.message));
  }

  exit(code) {
    return process.exit(code);
  }
}

const populateFirestore = new PopulateJsonFirestore();
populateFirestore.populate();
