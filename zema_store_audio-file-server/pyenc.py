from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
import hashlib
def encrypt(key):
    file_to_encrypt = 'sample.mp3'
    buffer_size = 65536 # 64kb


    input_file = open(file_to_encrypt, 'rb')
    output_file = open(file_to_encrypt + '.encrypted', 'wb')

    cipher_encrypt = AES.new(key, AES.MODE_CFB)
    output_file.write(cipher_encrypt.iv)

    buffer = input_file.read(buffer_size)
    while len(buffer) > 0:
        ciphered_bytes = cipher_encrypt.encrypt(buffer)
        output_file.write(ciphered_bytes)
        buffer = input_file.read(buffer_size)

    input_file.close()
    output_file.close()

    
def decyrpt():

    file_to_encrypt = 'sample.mp3'
    buffer_size = 65536 # 64kb

    input_file = open(file_to_encrypt + '.encrypted', 'rb')
    output_file = open(file_to_encrypt + '.decrypted', 'wb')

    filesize = long(inp_file.read(16))
    IV = inp_file.read(16)
    decryptor = AES.new(key, AES.MODE_CBC, IV)

    iv = input_file.read(16)

    cipher_encrypt = AES.new(key, AES.MODE_CFB, iv=IV)

    buffer = input_file.read(buffer_size)
    while len(buffer) > 0:
        decrypted_bytes = cipher_encrypt.decrypt(buffer)
        output_file.write(decrypted_bytes)
        buffer = input_file.read(buffer_size)

    input_file.close()
    output_file.close()
# key = get_random_bytes(32) # Use a stored / generated key

def get_key( password):
    # hasher = SHA256.new(password)
    # return hasher.digest()
    password_bits = password.encode('utf-8')
    secret_password = hashlib.sha256(password_bits)
    hashed = secret_password.hexdigest()
    return hashed

key =get_key('password') # Use a stored / generated key

encrypt(key)
