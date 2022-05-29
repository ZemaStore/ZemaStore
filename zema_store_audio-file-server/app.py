import os
from posixpath import dirname, realpath
from flask import Flask, send_from_directory, abort, request
# from werkzeug.utils import secure_filename
import AudioEncrypt as AE
import FileHandler as fh
from flask_cors import cross_origin, CORS


app = Flask(__name__)
CORS(app)

upload_folder = os.path.join(
    dirname(realpath(__file__)), 'uploads', "encrypted")
if not os.path.exists(upload_folder):
    os.mkdir(upload_folder)

app.config['UPLOAD_FOLDER'] = upload_folder

app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024

allowed_extensions = set(['wav', 'mp3', 'ogg'])


def check_file_extension(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in allowed_extensions


@app.route('/upload', methods=['POST'])
@cross_origin()
def uploadFile():
    if request.method == 'POST':
        request_data = request.get_json()

        audio_url = request_data['audio_url']
        random_file_name = request_data['random_file_name']
        aes_key = request_data['aes_key']
        aes_iv = request_data['aes_iv']

        file_handler = fh.FileHandler(random_file_name, '.mp3')
        if file_handler.downloadAndSave(audio_url):

            original_file_path = file_handler.getFilePath()
            encrypted_file_path = file_handler.getEncryptedFilePath()
            if aes_key is not None and aes_iv is not None:
                aes_key = aes_key.encode("utf-8")
                aes_iv = aes_iv.encode("utf-8")
                audio_encrypt = AE.AudioEncrypt(
                    original_file_path, encrypted_file_path, aes_key, aes_iv)
            else:
                audio_encrypt = AE.AudioEncrypt(
                    original_file_path, encrypted_file_path)

            audio_encrypt.encrypt()
            aes_key = audio_encrypt.getAES_KEY().decode("utf-8")
            aes_iv = audio_encrypt.getAES_IV().decode("utf-8")
            file_handler.removeFile(original_file_path)

            print(aes_key, "aes_key", aes_iv,
                  "aes_iv", original_file_path, "audio_data")

            return {"file_path": original_file_path, "aes_key": aes_key, "aes_iv": aes_iv}, 201
        else:
            print("there was an error")
            return abort(400)
        
@app.route('/upload-normal', methods=['POST'])
@cross_origin()
def uploadFileNormalFile():
    if request.method == 'POST':
        request_data = request.get_json()

        audio_url = request_data['audio_url']
        random_file_name = request_data['random_file_name']
        aes_key = request_data['aes_key']
        aes_iv = request_data['aes_iv']

        file_handler = fh.FileHandler(random_file_name, '.mp3')
        if file_handler.downloadAndSave(audio_url):

            original_file_path = file_handler.getFilePath()
            return {"file_path": original_file_path, "aes_key": aes_key, "aes_iv": aes_iv}, 201
        else:
            print("there was an error")
            return abort(400)


@app.route('/download/<filename>')
def downloadFile(filename):
    try:
        return send_from_directory(app.config['UPLOAD_FOLDER'], filename, as_attachment=True)
    except FileNotFoundError:
        abort(404)


@app.route("/", methods=["GET", "POST"])
def home():
    return "Hello, Flask!"


"""sumary_line
data types string, int, float, path, uuid
Keyword arguments:
argument -- description
Return: return_description
"""


@app.route('/get-audio/<string:audio_id>', methods=['GET'])
def get_audio(audio_id):
    print(audio_id, " is audio_id")
    # UPLOADS_PATH = join(dirname(realpath(__file__)), 'static\\wallpaper')

    # if request.method == "POST":
    #     wallpaper = request.files['wallpaper']
    #     if wallpaper.filename != '':
    #         image = request.files['wallpaper']
    #         image.save(os.path.join(
    #             UPLOADS_PATH, secure_filename(image.filename)))

    #     cur = db2.cursor()
    #     sql = f"UPDATE wallpaper set pic = {wallpaper.filename} where sno = 1"
    #     cur.execute(sql)
    #     db2.commit()
    #     cur.close()
    #     return redirect(url_for('home'))
    # else:
    #     return redirect(url_for('home'))
    return "Hello, Flask!"


if __name__ == "__main__":
    # app.run(host='0.0.0.0')
    app.run(debug=True, use_reloader=True)
