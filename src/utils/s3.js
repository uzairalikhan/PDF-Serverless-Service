const AWS = require('aws-sdk');

const s3 = new AWS.S3();

module.exports = async function getS3Object(bucket, key) {
    const s3Params = {
        Bucket: bucket,
        Key: key
    };
    return s3.getObject(s3Params).promise();
};
