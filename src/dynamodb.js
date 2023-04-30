var AWS = require('aws-sdk');

require('dotenv').config(); 

var region = "eu-west-3";
var accessKeyId = process.env.DYNAMODB_ACCESS_KEY_ID;
console.log(process.env);
var secretAccessKey = process.env.DYNAMODB_SECRET_ACCESS_KEY;
var tableName = "withmapped_v2";

var dynamoDB = new AWS.DynamoDB({
  region: region,
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
});

var params = {
  Item: {
    id:{
      N: "2"
    },
    username: {
      S: "notwithjannis"
    },
    fullName: {
      S: "not Jannis Imhof"
    },
    userId: {
      N: "-4968747009"
    }
  },
  ReturnConsumedCapacity: "TOTAL",
  TableName: tableName,
};

dynamoDB.putItem(params, function(err, data) {
  if (err) {
    console.log(err, err.stack);
  }
  else {
    console.log(data);
  }
});