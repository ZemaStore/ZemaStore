
import random
import string
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes


class AudioEncrypt:
    def __init__(self, file_path, encrypted_file_path, old_aes_key=None, old_aes_iv=None) -> None:
        self.file_path = file_path
        self.encrypted_file_path = encrypted_file_path

        AES_KEY = old_aes_key if old_aes_key != None else ''.join(random.choice(
            string.ascii_uppercase + string.ascii_lowercase + string.digits) for x in range(32)).encode("utf-8")

        AES_IV = old_aes_iv if old_aes_iv != None else ''.join(random.choice(string.ascii_uppercase +
                                                                             string.ascii_lowercase + string.digits) for x in range(16)).encode("utf-8")
        self.aes_key = AES_KEY
        self.aes_iv = AES_IV

    def encrypt(self):
        with open(self.file_path, 'rb') as fd:
            contents = fd.read()

        encryptor = AES.new(self.aes_key, AES.MODE_CFB, self.aes_iv)
        encrypted_audio = encryptor.encrypt(contents)

        with open(self.encrypted_file_path, 'wb') as fd:
            fd.write(encrypted_audio)

    def dycrypt(self):
        with open(self.encrypted_file_path, 'rb') as fd:
            contents = fd.read()
        decryptor = AES.new(self.aes_key, AES.MODE_CFB, self.aes_iv)
        decrypted_audio = decryptor.decrypt(contents)
        with open('decrypted_' + self.file_path, 'wb') as fd:
            fd.write(decrypted_audio)

    def getAES_KEY(self):
        return self.aes_key

    def getAES_IV(self):
        return self.aes_iv

    def removeFile(self, file_path):
        import os
        os.remove(file_path)


# file_path = 'sample.mp3'
# encryptor = AudioEncrypt()
# encryptor.encrypt(file_path)
# encryptor.dycrypt(file_path)
