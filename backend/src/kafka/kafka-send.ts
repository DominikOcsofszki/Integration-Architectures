import { kafkaErasmuxTopic, kafkaProducer } from "./kafka-setup.js";

const run = async () => {
    // Producing
    await kafkaProducer.connect();
    await kafkaProducer.send({
        topic: kafkaErasmuxTopic,
        messages: [{ value: "Hello KafkaJS user!" }],
    });
};

run().catch(console.error);
