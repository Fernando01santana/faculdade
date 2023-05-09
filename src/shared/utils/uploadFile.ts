import * as aws from 'aws-sdk';

export class StorageS3 {
  async uploadFile(file: any, _id: string) {
    const s3 = new aws.S3({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACESS_KEY,
    });

    const date = Date.now();
    const extensionFile = file.originalname.split('.')[1];
    const nameFile = date + `${_id}.${extensionFile}`;

    const params = {
      Body: file.buffer,
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: nameFile,
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
    return 'https://faculdade-api.s3.amazonaws.com/' + nameFile;
  }
}
