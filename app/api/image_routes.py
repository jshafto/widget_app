from flask import Blueprint, request
from app.models import db, Image
from flask_login import current_user, login_required
from app.s3_helpers import upload_file_to_s3, get_unique_filename

image_routes = Blueprint("images", __name__)


@image_routes.route("", methods=["POST"])
@login_required
def upload_image():

    print(request.files)
    print(request.form)
    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]

    create_filename = get_unique_filename(image.content_type)

    if "filename" not in create_filename:
        # if the dictionary doesn't have a filename key
        # it means the filetype was not permitted
        # so we send back that error message
        return access_filename, 400

    image.filename = create_filename["filename"]

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a filename key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]

    new_image = Image(user=current_user, url=url)
    db.session.add(new_image)
    db.session.commit()
    return {"url": url}


@image_routes.route("")
def get_all_images():
    images = Image.query.order_by(Image.id.desc()).all()
    return {"images": [image.to_dict() for image in images]}
