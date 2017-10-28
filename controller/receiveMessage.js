var amqp = require('amqplib');

amqp.connect('amqp://localhost').then(function (conn) {

    process.once('SIGINT', function () { conn.close(); });

    return conn.createChannel().then(function (ch) {

        var ok = ch.assertQueue('task_queue', { durable: true });

        ok = ok.then(function () { ch.prefetch(10); });

        ok = ok.then(function () {

            ch.consume('task_queue', doWork, { noAck: false });
            console.log(" [*] Waiting for messages. To exit press CTRL+C");

        });

        return ok;

        function doWork(msg) {

            var body = msg.content.toString();
            console.log(" [x] Received '%s'", body);
            var secs = body.split('.').length - 1;
            //console.log(" [x] Task takes %d seconds", secs);
            setTimeout(function () {

                console.log(" [x] Done");
                ch.ack(msg);
            }, secs * 1000);

        }

    });

}).catch(console.warn);



// var amqp = require('amqplib/callback_api');

// amqp.connect('amqp://localhost', function (err, conn) {
//     conn.createChannel(function (err1, ch) {

//         if (!err1) {

//             var q = 'task_queue';

//             ch.assertQueue(q, { durable: true });
//             ch.prefetch(10);

//             console.log("Waiting for messages in %s. To exit press CTRL+C", q);

//             //Lang nghe message trong queue q
//             ch.consume(q, msg => {

//                 let secs = msg.content.toString().split('.').length -1;

//                 console.log('NamBV Received %s', msg.content.toString())

//                 setTimeout(()=> {
//                     console.log("DONE");
//                     ch.ack(msg);
//                 }, secs * 1000);

//             }, {noAck: false});

//             // noAck : thong bao den RabbitMQ rang message da duoc xu ly, server hoan toan co the xoa no
//             // thiet dat "true": Khong thong bao. Server tu dong xoa ngay khi phan phoi message cho khach hang
//             // false: server chi xoa khi nhan duoc thong bao da xu ly xong

//         }

//     });
// });