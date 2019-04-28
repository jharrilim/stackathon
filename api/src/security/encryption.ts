import { createHmac, randomBytes } from "crypto";

export function generateSalt() {
    return randomBytes(16).toString('hex');
}

export function encryptPassword(password: string, salt: string = generateSalt()) {
    const hash = createHmac('sha512', salt);
    hash.update(password);
    const passwordHash = hash.digest('hex');
    return { salt, passwordHash };
}
