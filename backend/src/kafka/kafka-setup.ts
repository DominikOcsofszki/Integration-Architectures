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