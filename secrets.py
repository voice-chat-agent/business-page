import secrets

# Generate a 32-byte (256-bit) hex token. You can adjust the length if needed.
secret_key = secrets.token_hex(32)
print(secret_key)

# or 
# openssl rand -hex 32
