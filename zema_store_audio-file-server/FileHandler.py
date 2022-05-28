
from posixpath import dirname, realpath
import os
import requests


class FileHandler:
    def __init__(self, file_name, file_ext) -> None:
        upload_folder = os.path.join(
            dirname(realpath(__file__)), 'uploads',  file_name + file_ext)

        self.file_path = upload_folder
        self.encrypted_file_path = os.path.join(
            dirname(realpath(__file__)), 'uploads', "encrypted", file_name + file_ext)

    def downloadAndSave(self, audio_url):
        try:
            file = requests.get(audio_url)
            f = open(self.file_path, 'wb')
            f.write(file.content)
            f.close()
            return True
        except Exception:
            return False

    def getFilePath(self):
        return self.file_path

    def getEncryptedFilePath(self):
        return self.encrypted_file_path

    def removeFile(self, path):
        os.remove(path)

# fileHandler = FileHandler('newaudio', '.mp3')
# fileHandler.downloadAndSave('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3')

# print(fileHandler.getFilePath(), " is file")
