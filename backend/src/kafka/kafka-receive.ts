import { kafkaErasmuxTopic, kafkaConsumer } from "./kafka-setup.js";

const run = async () => {
    // Consuming
    await kafkaConsumer.connect();
    await kafkaConsumer.subscribe({
        topic: kafkaErasmuxTopic,
        fromBeginning: true,
    });

    await kafkaConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                partition,
                offset: message.offset,
                value: message.value?.toString(),
            });
        },
    });
};

run().catch(console.error);
