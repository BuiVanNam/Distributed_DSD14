var amqp = require('amqplib');
var myConst = require("../utils/constant");
var readListDomain = require("./readListDomain");
var listDomainDefault = readListDomain.listDomainDefault;

// tao ket noi
module.exports.addDomainToQueue = () => {

    amqp.connect(myConst.HOST_SERVER_RABBITMQ).then(function (conn) {

        return conn.createChannel().then(function (ch) {

            var q = myConst.QUEUE_NAME_DOMAIN;

            var okQueue = ch.assertQueue(q, { durable: true });

            //ch.purgeQueue(q);

            return okQueue.then(function () {

                for (let i = 0; i < listDomainDefault.length; i++) {
                    ch.sendToQueue(q, Buffer.from(listDomainDefault[i].nameDomain), { deliveryMode: true });
                }

                return ch.close();

            });

        }).finally(function () {

            conn.close();

        });

    }).catch(console.warn);

}


