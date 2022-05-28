from Crypto import Random
from Crypto.Cipher import AES
import hashlib
import os
import os.path
import random


class Encryptor:
    def __init__(self, key):
        self.key = key

    def pad(self, s):
        return s + b"\0" * (AES.block_size - len(s) % AES.block_size)

    def encrypt(self, message, key, key_size=256):
        message = self.pad(message)
        # iv = Random.new().read(16)
        
        IV = ''
        for _ in range(16):
            IV = IV + chr(random.randint(0, 0xFF))
            
        aes_mode = AES.MODE_CBC
        key = "00112233445566778899aabbccddeeff"
        iv = os.urandom(16)
        cipher = AES.new(key, aes_mode, IV, IV)
        return IV + cipher.encrypt(message)

    def encrypt_file(self, file_name):
        with open(file_name, 'rb') as fo:
            plaintext = fo.read()
        enc = self.encrypt(plaintext, self.key)
        with open(file_name + ".enc", 'wb') as fo:
            fo.write(enc)
        os.remove(file_name)
        
def get_key( password):
    # hasher = SHA256.new(password)
    # return hasher.digest()
    password_bits = password.encode('utf-8')
    secret_password = hashlib.sha256(password_bits)
    hashed = secret_password.hexdigest()
    return hashed



# key = b'[EX\xc8\xd5\xbfI{\xa2$\x05(\xd5\x18\xbf\xc0\x85)\x10nc\x94\x02)j\xdf\xcb\xc4\x94\x9d(\x9e'
# enc = Encryptor(key)
# enc.encrypt_file('GeneratedAudioFile.wav')
# enc.decrypt_file('GeneratedAudioFile.wav.enc')

key = get_key("password")
audio_url = "https://res.cloudinary.com/zema-store/raw/upload/v1651438812/AudioUploads/2022-05-01T21-00-02.644ZEfeligihalew%20-%20Dawit%20Getachew%20.mp3"
headers = {'Content-Type': 'audio/mp3'}
import requests
file = requests.get(audio_url, headers=headers).text
enc = Encryptor(key)
enc.encrypt_file("sample.mp3")