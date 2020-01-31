package com.ozata.cagatay.redis;

import redis.clients.jedis.JedisPool;
import redis.clients.jedis.exceptions.JedisException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Jedis {

    //address of your redis server
    private static final String redisHost = "localhost";
    private static final Integer redisPort = 6379;

    //the redis connection pool..
    private static JedisPool pool = null;

    public Jedis() {
        //configure our pool connection
        pool = new JedisPool(redisHost, redisPort);

    }

    public void addtoRedis(int id, String name, String school, int cgpa) {

        //add some values in Redis HASH
        String key = "searched_members";
        boolean control=false;

        redis.clients.jedis.Jedis jedis = pool.getResource();
        try {

            // check variable in redis
            List<String> list = jedis.lrange(key, 0 ,5);

            for(int i = 0; i<list.size(); i++) {
                if (Integer.parseInt(list.get(i))==id){
                    control=true;
                }
            }


            if (!control)
                jedis.lpush(key, ""+id);

            System.out.println("eklendi redise");

        } catch (JedisException e) {
            //if something wrong happen, return it back to the pool
            if (null != jedis) {
                pool.returnBrokenResource(jedis);
                jedis = null;
            }
        } finally {
            ///it's important to return the Jedis instance to the pool once you've finished using it
            if (null != jedis)
                pool.returnResource(jedis);
        }
    }


}