const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
  projectId: 'harmony-exchange',
  keyFilename: './harmony-exchange-0b2b2d6f33e8.json',
});

const bucketName = 'harmony_communities';
let imageUrls = [];

exports.getBucketFolderName = (communityName) =>
  `${communityName.replace(/ /g, '-')}`;

exports.createFolder = async (folderName) => {
  const file = storage.bucket(bucketName).file(`${folderName}`);
  await file.save('');
};

exports.deleteFolder = async (folderName) => {
  const [files] = await storage
    .bucket(bucketName)
    .getFiles({ prefix: `${folderName}` });
  files.forEach((file) => file.delete());
};

exports.uploadImage = async (files, communityName, folderName) => {
  folderName = this.getBucketFolderName(folderName);

  const uploadPromises = files.map((file) => {
    const blob = storage
      .bucket(bucketName)
      .file(`${communityName}/${folderName}/${file.originalname}`);
    const blobStream = blob.createWriteStream({
      metadata: { contentType: file.mimetype },
    });

    return new Promise((resolve, reject) => {
      blobStream.on('error', reject);
      blobStream.on('finish', () =>
        resolve(`https://storage.googleapis.com/${bucketName}/${blob.name}`)
      );
      blobStream.end(file.buffer);
    });
  });

  imageUrls = await Promise.all(uploadPromises);
};

exports.deleteUploadedImage = async (imageName) => {
  const file = storage
    .bucket(bucketName)
    .file(`/${communityName}/${folderName}/${imageName}`);
  await file.delete();
};

exports.getImageUrls = () => imageUrls;

exports.resetImageUrls = () => {
  imageUrls = [];
};
