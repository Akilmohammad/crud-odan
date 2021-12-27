import { Db } from 'mongodb';
import crypto from 'crypto';
import { Service, MongoDBServiceOptions } from 'feathers-mongodb';
import { Application } from '../../declarations';
import { Id, Params } from '@feathersjs/feathers';
import {USER_CREATE_SUCCESS} from '../../utils/response.message.json';
import Util from '../../utils/response';


// The Gravatar image service
const gravatarUrl = 'https://s.gravatar.com/avatar';
const query = 's=60';
const getGravatar = (email: string) => {
  const hash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
  return `${gravatarUrl}/${hash}?${query}`;
}

// A type interface for our user (it does not validate any data)
interface UserData {
  _id?: string;
  email: string;
  password: string;
  name?: string;
  avatar?: string;
  githubId?: string;
}


export class Crud extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongoDBServiceOptions>, app: Application) {
    super(options);

    const client: Promise<Db> = app.get('mongoClient');

    client.then(db => {
      this.Model = db.collection('crud');
    });
  }

  // Create USER
  create (data: UserData, params?: Params) {
    const { email, password, name } = data;
    const avatar = data.avatar || getGravatar(email);
    const userData = {
      email,
      name,
      password,
      avatar
    };

    return super.create(userData, params);
  }

  // GET USER
  get (id:Id) {
    return super.get(id);
  }

   // Update User By id
   update(id: Id, data: UserData) {

    const { email, password, name } = data;
    const avatar = data.avatar || getGravatar(email);
    const userData = {
      email,
      name,
      password,
      avatar
    };

    return super.update(id,userData);
  }

  // Delete User By Id
  remove(id:Id){
    return super.remove(id)
  }

};
