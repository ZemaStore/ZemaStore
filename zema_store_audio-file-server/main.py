# import os
# from posixpath import dirname, realpath
# from flask import Flask, send_from_directory, abort, request
# # redirect, url_for
# # from werkzeug.utils import secure_filename
# import requests
# import AudioWorks as aw
# import AES
# from flask_cors import cross_origin, CORS


# app = Flask(__name__)
# CORS(app)

# upload_folder = os.path.join(dirname(realpath(__file__)), 'uploads')
# if not os.path.exists(upload_folder):
#     os.mkdir(upload_folder)

# app.config['UPLOAD_FOLDER'] = upload_folder

# app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024

# allowed_extensions = set(['wav', 'mp3', 'ogg'])


# def check_file_extension(filename):
#     return '.' in filename and \
#            filename.rsplit('.', 1)[1].lower() in allowed_extensions


# @app.route('/upload', methods=['POST'])
# @cross_origin()
# def uploadFile():
#     if request.method == 'POST':
#         request_data = request.get_json()

#         audio_url = request_data['audio_url']
#         # user_IV = request_data['user_IV']

#         file = requests.get(audio_url)
#         audioData = aw.getAudioData('test.wav')
#         AES.enc.encrypt_file(audioData[6])

#         # if file and check_file_extension(file.filename):
#         #     filename = secure_filename(file.filename)
#         #     file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

#         #     # Return 201 CREATED
#         #     return url_for('uploadedFile', filename=filename), 201
#         # else:
#         #     return abort(400)


# @app.route('/download/<filename>')
# def downloadFile(filename):
#     try:
#         return send_from_directory(app.config['UPLOAD_FOLDER'], filename, as_attachment=True)
#     except FileNotFoundError:
#         abort(404)


# @app.route("/", methods=["GET", "POST"])
# def home():
#     return "Hello, Flask!"


# """sumary_line
# data types string, int, float, path, uuid
# Keyword arguments:
# argument -- description
# Return: return_description
# """


# @app.route('/get-audio/<string:audio_id>', methods=['GET'])
# def get_audio(audio_id):
#     print(audio_id, " is audio_id")
#     # UPLOADS_PATH = join(dirname(realpath(__file__)), 'static\\wallpaper')

#     # if request.method == "POST":
#     #     wallpaper = request.files['wallpaper']
#     #     if wallpaper.filename != '':
#     #         image = request.files['wallpaper']
#     #         image.save(os.path.join(
#     #             UPLOADS_PATH, secure_filename(image.filename)))

#     #     cur = db2.cursor()
#     #     sql = f"UPDATE wallpaper set pic = {wallpaper.filename} where sno = 1"
#     #     cur.execute(sql)
#     #     db2.commit()
#     #     cur.close()
#     #     return redirect(url_for('home'))
#     # else:
#     #     return redirect(url_for('home'))
#     return "Hello, Flask!"


# if __name__ == "__main__":
#     app.run(host='0.0.0.0', threaded=True)
