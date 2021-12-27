// Initializes the `crud` service on path `/crud`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Crud } from './crud.class';
import hooks from './crud.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'crud': Crud & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/crud', new Crud(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('crud');

  service.hooks(hooks);
}
