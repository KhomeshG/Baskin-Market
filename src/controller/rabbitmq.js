const amqp = require("amqplib/callback_api");
const awsRekognition = require("./awsRekognition");
const CONN_URL = `amqp://localhost`;
let ch = null;
amqp.connect(CONN_URL, function (err, conn) {
  conn.createChannel(function (err, channel) {
    ch = channel;
  });
});

module.exports.publishToQueue = async (queueName, data) => {
  ch.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));

  console.log(data); //data Queue mai ja raha hai

  //consumming data
  ch.consume(
    queueName,
    function async(msg) {
      let data = msg.content.toString();
      console.log(" [x] Received %s", msg.content.toString());

      //converted Data
      let dataC = JSON.parse(data);
      awsRekognition.rekognitionData(dataC);
      // console.log(dataC[0]["bucketName"], dataC[0]["objectName"]);
    },
    {
      noAck: true,
    }
  );
};

module.exports.consummerToQueue = () => {
  ch.consume("user-message1", function (msg) {
    console.log("Recieved", msg.content.toString());
    setTimeout(function () {
      console.log("Message:", msg.content.toString());
    }, 4000);
  });
};
