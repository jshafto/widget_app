import boto3
import botocore  # this is necessary for your credentials to work
import os
import uuid  # for unique filename

bucket_name = os.environ.get("S3_BUCKET_NAME")
s3_location = f"http://{bucket_name}.s3.amazonaws.com/"


s3 = boto3.client(
   "s3",
   aws_access_key_id=os.environ.get("S3_ACCESS_KEY"),
   aws_secret_access_key=os.environ.get("S3_SECRET_ACCESS_KEY"),
)


def upload_file_to_s3(file, acl="public-read"):
    try:
        s3.upload_fileobj(
            file,
            bucket_name,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        # in case the our s3 upload fails
        return {"errors": str(e)}

    return {"url": f"{s3_location}{file.filename}"}


# if i upload two files with the same name, the second will overwrite the first
# to prevent that, i give each image a unique filename
def get_unique_filename(mimetype):
    unique_filename = uuid.uuid4().hex
    if mimetype == "image/png":
        ext = "png"
    elif mimetype == "image/jpeg":
        ext = "jpg"
    else:
        return {"errors": "image file must be a jpg or png"}

    return {"filename": f"{unique_filename}.{ext}"}
