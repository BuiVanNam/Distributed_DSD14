var amqp = require('amqplib');
var myConst = require("../utils/constant");
var requestDomain = require("./requestDomain");

// var unirest = require('unirest');
// function sendHeadRequestUsingUnirest(url, next) {
//     unirest.head(url).end(next);
// }

// tao ket noi
module.exports.addResToQueue = () => {

    amqp.connect(myConst.HOST_SERVER_RABBITMQ).then(function (conn) {

        return conn.createChannel().then(function (ch) {

            var okQueueDomain = ch.assertQueue(myConst.QUEUE_NAME_DOMAIN, { durable: true });
            var okQueueRes = ch.assertQueue(myConst.QUEUE_RES, { durable: true });

            okQueueDomain = okQueueDomain.then(function () { ch.prefetch(myConst.NUM_PROCESS_QUEUE); });

            okQueueDomain = okQueueDomain.then(function () {

                ch.consume(myConst.QUEUE_NAME_DOMAIN, requestDomainQueue, { noAck: false });

            });

            return okQueueDomain;

            function requestDomainQueue(msg) {

                var domain = msg.content.toString();
                console.log(domain);

                requestDomain.requestDomain(domain, (err, res) => {
                    if (err) {
                        console.log(err + "");
                    } else {
                        console.log(res);
                        ch.sendToQueue(myConst.QUEUE_RES, Buffer.from(res), { deliveryMode: true });
                    }
                    
                    ch.ack(msg);
                });

                // sendHeadRequestUsingUnirest('http://www.' + domain, function (response) {
                //     ch.ack(msg);
                //     ch.sendToQueue(myConst.QUEUE_RES, new Buffer(
                //             '{"code":' + response.status + '"'
                //             + ',"host":"' + domain + '"'
                //             + '}'));
                //     console.log(domain);
                // });



                // req('http://www.' + domain, (error, response, body) => {
                //     if (!error) {
                //         // console.log(response.request['host']);
                //         // console.log(response && response.statusCode);

                //         let res = '{"code":' + response && response.statusCode + '"'
                //             + ',"host":"' + domain + '"'
                //             + '}';
                //         ch.ack(msg);

                //         ch.sendToQueue(myConst.QUEUE_RES, Buffer.from(res), { persistent: true });

                //     } else {
                //         console.log(new Error(error) + "");
                //     }
                // });

            }

        });

    }).catch(console.warn);

}


