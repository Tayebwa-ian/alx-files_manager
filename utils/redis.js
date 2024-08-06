// Setting Redis server connections

import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => console.log('Redis Client Error', err));
    this.client.on('connect', () => {
      console.log('connect to Redis server');
    });
  }

  // checks connection to the redis server
  isAlive() {
    return this.client.isReady;
  }

  async get(key) {
    const result = await this.client.get(key);
    return result;
  }

  async set(key, value, time) {
    await this.client.set(key, value, 'EX', time, (err, reply) => {
      if (err) {
        console.error('Error:', err);
      } else {
        console.log('Reply:', reply); // should log "OK"
      }

      this.client.quit();
    });
  }

  async del(key) {
    await this.client.del(key);
  }
}

const redisClient = new RedisClient();

export default redisClient;
