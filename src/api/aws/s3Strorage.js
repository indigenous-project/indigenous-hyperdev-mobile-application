// API for store an image in S3

// const AWS = require('aws-sdk/dist/aws-sdk-react-native');
import AWS from 'aws-sdk';
import Base64Binary from 'base64-arraybuffer';
const ID = 'AKIAWBK3UNFZVVF7OF4B';
const SECRET = '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';
const BUCKET_NAME = 'indigenous-images';
const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET,
});

export async function s3Storage(fileContent) {
  const imageBody = await Base64Binary.decode(fileContent);
  if (imageBody) {
    const params = {
      Bucket: BUCKET_NAME,
      Key: Math.floor(Math.random() * 10000000000).toString(),
      ContentType: 'image/jpeg',
      Body: imageBody,
      ACL: 'public-read-write',
    };
    const s3UploadPromise = new Promise((resolve, reject) => {
      s3.upload(params, async function (err, data) {
        if (err) {
          reject(err);
        } else {
          console.log('File uploaded successfully.', data);
          resolve(data);
        }
      });
    });
    return s3UploadPromise;
  }
}
