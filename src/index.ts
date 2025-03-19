import {createServer} from 'http';
import {app} from './navigation';
import {initDB} from './database/server';

console.log(process.env)

const port = process.env.PORT || 3003;

(async () => {
  await initDB();

  createServer(app)
    .listen(
      port,
      () => console.info(`Server running on port ${port}`)
    );
})();