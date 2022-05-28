from scipy.io import wavfile
import numpy as np
import matplotlib.pyplot as plt
import sounddevice as sd

import random
import string
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes


def encrypt(AES_KEY, AES_IV, file_path):
    with open(file_path, 'rb') as fd:
        contents = fd.read()

    encryptor = AES.new(AES_KEY, AES.MODE_CFB, AES_IV)
    encrypted_audio = encryptor.encrypt(contents)

    with open('encrypted_' + file_path, 'wb') as fd:
        fd.write(encrypted_audio)


def dycrypt(AES_KEY, AES_IV, file_path):
    with open(file_path, 'rb') as fd:
        contents = fd.read()
    decryptor = AES.new(AES_KEY, AES.MODE_CFB, AES_IV)
    decrypted_audio = decryptor.decrypt(contents)
    with open('decrypted_' + file_path, 'wb') as fd:
        fd.write(decrypted_audio)


AES_KEY = ''.join(random.choice(string.ascii_uppercase +
                  string.ascii_lowercase + string.digits) for x in range(32)).encode("utf-8")

AES_IV = ''.join(random.choice(string.ascii_uppercase +
                 string.ascii_lowercase + string.digits) for x in range(16)).encode("utf-8")

file_path = 'sample.mp3'
import hashlib
def get_key( password):
    # hasher = SHA256.new(password)
    # return hasher.digest()
    
    # password_bits = password.encode('utf-8')
    # secret_password = hashlib.sha256(password_bits)
    # hashed = secret_password.hexdigest()
    # return hashed
    
    # password=bytes(password, 'utf-8')
    # salt = get_random_bytes(32)

    # key = hashlib.scrypt(password, salt=salt, n=2**14, r=8, p=1, dklen=32)
    
      # generate a random salt
    salt = get_random_bytes(AES.block_size)

    # use the Scrypt KDF to get a private key from the password
    private_key = hashlib.scrypt(
        password.encode(), salt=salt, n=2**14, r=8, p=1, dklen=32)

    # create cipher config
    cipher_config = AES.new(private_key, AES.MODE_GCM)

    print(private_key)
# get_key("password")



IV = ''
for _ in range(16):
    # IV = IV + chr(random.randint(0, 0xFF))
    IV += random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits)
# KEY = get_key('password')
        

# encrypt(KEY, IV, file_path)
# dycrypt(KEY, IV, 'encrypted_' + file_path)
from base64 import b64encode, b64decode

# def encrypt(plain_text, password):
#     # generate a random salt
#     salt = get_random_bytes(AES.block_size)

#     # use the Scrypt KDF to get a private key from the password
#     private_key = hashlib.scrypt(
#         password.encode(), salt=salt, n=2**14, r=8, p=1, dklen=32)
#     print("salt an ", salt)
#     print("private key ", private_key)
#     # create cipher config
#     cipher_config = AES.new(private_key, AES.MODE_CBC, IV)

#     # return a dictionary with the encrypted text
#     cipher_text, tag = cipher_config.encrypt_and_digest(bytes(plain_text, 'utf-8'))
#     return {
#         'cipher_text': b64encode(cipher_text).decode('utf-8'),
#         'salt': b64encode(salt).decode('utf-8'),
#         'nonce': b64encode(cipher_config.nonce).decode('utf-8'),
#         'tag': b64encode(tag).decode('utf-8')
#     }
   
def generate_pk_iv(password):
    # generate a random salt
    salt = get_random_bytes(AES.block_size)

    # use the Scrypt KDF to get a private key from the password
    private_key = hashlib.scrypt(
        password.encode(), salt=salt, n=2**14, r=8, p=1, dklen=32)
    return {
        'salt': b64encode(salt).decode('utf-8'),
        'pk': b64encode(private_key).decode('utf-8')
    } 
# password = input("Password: ")

# First let us encrypt secret message
# encrypted = encrypt("The secretest message here", password)
# print(encrypted)

print(bytes(generate_pk_iv("password")["pk"].encode("utf-8")))
print(AES_KEY)
keys = generate_pk_iv("password")
encrypt(AES_KEY, AES_IV, file_path)