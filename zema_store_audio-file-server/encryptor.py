from curses import longname
from Crypto.Cipher import AES
from Crypto.Hash import SHA256
import os
import random
import requests
import hashlib

# Input is read in chunks of 16KB
chunk_size = 16*1024


def encrypt(key, filename):

    # Input read from inp_file, encrypted and written into out_file
    inp_file = open(filename, 'rb')
    out_file = open("(encrypted)" + filename, 'wb')

    filesize = str(os.path.getsize(filename)).zfill(16)

    # Constructing a 16 byte Initializing Vector
    IV = ''
    for _ in range(16):
        IV = IV + chr(random.randint(0, 0xFF))

    encryptor = AES.new(key, AES.MODE_CBC, IV)
    out_file.write(filesize)
    out_file.write(IV)

    while(True):
        chunk = inp_file.read(chunk_size)

        if len(chunk) == 0:
            break
        elif len(chunk) % 16 != 0:
            padding = ' ' * (16 - (len(chunk) % 16))
            chunk = chunk + padding

        out_file.write(encryptor.encrypt(chunk))

    inp_file.close()
    out_file.close()


def decrypt(key, filename):

    inp_file = open(filename, 'rb')
    out_file = open("(decrypted)" + filename[11:], 'wb')

    filesize = longname(inp_file.read(16))
    IV = inp_file.read(16)
    decryptor = AES.new(key, AES.MODE_CBC, IV)

    while(True):
        chunk = inp_file.read(chunk_size)

        if len(chunk) == 0:
            break
        out_file.write(decryptor.decrypt(chunk))

    out_file.truncate(filesize)


# def get_key(password):
#     hasher = SHA256.new(password)
#     return hasher.digest()

def get_key( password):
    # hasher = SHA256.new(password)
    # return hasher.digest()
    password_bits = password.encode('utf-8')
    secret_password = hashlib.sha256(password_bits)
    hashed = secret_password.hexdigest()
    return hashed

def downloadAndSave( audio_url, fileName):
    try:
        file = requests.get(audio_url)
        f = open(fileName, 'wb')
        f.write(file.content)
        f.close()
        return True
    except Exception:
        return False

def main():
    # audio_url = "https://res.cloudinary.com/zema-store/raw/upload/v1651438812/AudioUploads/2022-05-01T21-00-02.644ZEfeligihalew%20-%20Dawit%20Getachew%20.mp3"
    fileName = "sample1.mp3"
    # if downloadAndSave(audio_url, fileName):
    #     print("is downloaded")
    encrypt(get_key("password"), fileName)
    # else: 
    #     print("there is an error")
    # decrypt(get_key("password"), "(encrypted)sample1.mp3")

    # with open(file, "wb") as fh:
    #         fh.write(ans)
    # print(file, " is file")
    # encrypt(get_key("password"), file)

    # while(True):
    #     opt = raw_input("(E)ncrypt, (D)ecrypt or (X)exit: ")

    #     if(opt == 'E'):
    #         f = raw_input("File to encrypt: ")
    #         p = raw_input("password: ")

    #         encrypt(get_key(p), f)
    #         print("Done\n")
    #     elif(opt == 'D'):
    #         f = raw_input("File to decrypt: ")
    #         p = raw_input("password: ")

    #         decrypt(get_key(p), f)
    #         print("Done\n")
    #     elif(opt == 'X'):
    #         break
    #     else:
    #         print("Invalid option. Chose an appropriate option...\n")


if __name__ == '__main__':
    main()
