import { Injectable } from '@angular/core';
const { Kafka } = require('kafkajs')

@Injectable({
    providedIn: 'root'
})
export class KafkaService {



    kafka = new Kafka({
        clientId: 'erasmux-app',
        brokers: ['sepp-kafka.inf.h-brs.de:9091', 'sepp-kafka.inf.h-brs.de:9092', 'sepp-kafka.inf.h-brs.de:9093']
    })
    kafkaProducer = this.kafka.producer()
    kafkaConsumer = this.kafka.consumer({ groupId: 'erasmux' })
    kafkaErasmuxTopic = 'erasmux';

    async consumeLog  () {
        const listOfMsgs: string[] = [];
        // Consuming
        await this.kafkaConsumer.connect()
        await this.kafkaConsumer.subscribe({ topic: this.kafkaErasmuxTopic, fromBeginning: true })

        await this.kafkaConsumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                listOfMsgs.push(message.value.toString());
                console.log({
                    partition,
                    offset: message.offset,
                    value: message.value.toString(),
                })
            },
        })
        return listOfMsgs;
    }

    // exports.kafka = kafka
    // exports.kafkaProducer = kafkaProducer;
    // exports.kafkaConsumer = kafkaConsumer;
    // exports.kafkaErasmuxTopic = kafkaErasmuxTopic;
    constructor() { }
}
