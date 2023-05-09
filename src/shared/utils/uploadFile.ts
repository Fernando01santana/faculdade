import * as aws from 'aws-sdk';

export class StorageS3 {
  async uploadFile(file: any, filename: string) {
    const s3 = new aws.S3({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACESS_KEY,
    });

    const date = Date.now();
    const extensionFile = file.originalname.split('.')[1];

    const params = {
      Body: file.buffer,
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: filename,
      ACL: 'public-read',
    };

    await s3
      .putObject(params)
      .promise()
      .then(
        (data) => {
          return {
            url: process.env.URL_AWS,
          };
        },
        (err) => {
          return err;
        },
      );
    return 'https://faculdade-api.s3.amazonaws.com/' + filename;
  }

  async removeFile(filename: string): Promise<void> {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: filename,
    };
    const s3 = new aws.S3({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACESS_KEY,
    });
    await s3.deleteObject(params).promise();
  }
}
