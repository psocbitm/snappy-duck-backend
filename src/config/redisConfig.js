export const redisConfig = {
  redisQueue: {
    url: "redis://localhost:6379", // For queuing code from WebSocket
  },
  redisDB: {
    username: "ashx",
    password: "Smsgtjs@010",
    socket: {
      host: "redis-13094.c301.ap-south-1-1.ec2.redns.redis-cloud.com",
      port: 13094,
    },
  },
  redisPubSub: {
    url: "redis://localhost:6381", // For pub/sub to receive executed code
  },
};
