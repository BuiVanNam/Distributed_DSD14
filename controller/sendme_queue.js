var amqp = require('amqplib');

// tao ket noi
amqp.connect('amqp://localhost').then(function (conn) {

    return conn.createChannel().then(function (ch) {

        var q = 'task_queue';
        var ok = ch.assertQueue(q, { durable: true });

        return ok.then(function () {

            var msg = process.argv.slice(2).join(' ') || "Hello World!";

            ch.sendToQueue(q, Buffer.from(msg), { deliveryMode: true });

            console.log(" [x] Sent '%s'", msg);

            return ch.close();

        });

    }).finally(function () {

        conn.close();

    });

}).catch(console.warn);




// amqp.connect('amqp://localhost', (err1, conn) => {
//     if(!err1) {
//         // tao kenh
//         conn.createChannel((err2, ch) => {
//             if(!err2) {
//                 var q = 'task_queue';
//                 let msg = process.argv.slice(2).join(' ') || "Hello Co Giang";

//                 ch.assertQueue(q, { durable: true });

//                 ch.sendToQueue(q, Buffer.from(msg), {persistent: true});

//                 // thong bao khi da gui xong
//                 console.log("NamBV sent tin nhan: ", msg);
//             }

//         });
//         // thoat + dong ket noi sau 0.5s
//         setTimeout(() => {
//             conn.close();
//             process.exit(0);
//         }, 500);
//     }
// });