

const { Kafka } = require('kafkajs')


const kafka = new Kafka({
    clientId: 'erasmux-app',
    brokers: ['sepp-kafka.inf.h-brs.de:9091', 'sepp-kafka.inf.h-brs.de:9092', 'sepp-kafka.inf.h-brs.de:9093']
})
const kafkaProducer = kafka.producer()
const kafkaConsumer = kafka.consumer({ groupId: 'erasmux' })
const kafkaErasmuxTopic = 'erasmux';

exports.kafka = kafka
exports.kafkaProducer = kafkaProducer;
exports.kafkaConsumer = kafkaConsumer;
exports.kafkaErasmuxTopic = kafkaErasmuxTopic;

// https://saschaalda.wordpress.com/sepp-software-engineering-deployment-pipeline-hbrs/
