from flask import Blueprint, request
from app.models import Image
from flask_login import current_user, login_required

image_routes = Blueprint("images", __name__)


@image_routes.route("/", methods=["POST"])
@login_required
def upload_image():
    for k in request.files:
        print(k)
