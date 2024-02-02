import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "erasmux-app",
    brokers: [
        "sepp-kafka.inf.h-brs.de:9091",
        "sepp-kafka.inf.h-brs.de:9092",
        "sepp-kafka.inf.h-brs.de:9093",
    ],
});
const kafkaProducer = kafka.producer();
const kafkaConsumer = kafka.consumer({ groupId: "erasmux" });
const kafkaErasmuxTopic = "erasmux";

export { kafka, kafkaProducer, kafkaConsumer, kafkaErasmuxTopic };

// https://saschaalda.wordpress.com/sepp-software-engineering-deployment-pipeline-hbrs/
//
//
//  run: node kafka-receive.js
//  TODO run: node kafka-send.js
//  TODO: This can be added to all the backend-api calls for logging
//  TODO: Add an api to get all logs and use that api in the admin/logs (frontend)
