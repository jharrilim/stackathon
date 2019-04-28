import { generateSalt, encryptPassword } from "./encryption";

describe('encryption', () => {
    describe('generateSalt', () => {
        it('returns a string of 32 characters', () => {
            const salt = generateSalt();
            expect(typeof salt).toEqual('string');
            expect(salt.length).toEqual(32);
        });
    });
    describe('encryptPassword', () => {
    
        it('returns a new salt if one was not given', () => {
            const password = 'Passw0o0o0ord';
    
            const passResult = encryptPassword(password);
    
            expect(passResult.salt).toBeTruthy();
            expect(typeof passResult.salt).toBe('string');
        });
    
        it('encrypting a password yields consistent results', () => {
            const salt = 'WAJOIDJA1239120';
            const passString = '#j8ADhh)!(jd!)(jd012j()DJ12d';
    
            const pass1 = encryptPassword(passString, salt);
            const pass2 = encryptPassword(passString, salt);
            
            expect(pass1.passwordHash).toBe(pass2.passwordHash);
            expect(pass1.salt).toBe(pass2.salt);
        });
    
        it('using a different salt yields different results', () => {
            const salt1 = 'ABC';
            const salt2 = 'DEF';
            const password = 'Password1';
    
            const result1 = encryptPassword(password, salt1);
            const result2 = encryptPassword(password, salt2);
    
            expect(result1.passwordHash === result2.passwordHash).toEqual(false);
            expect(result1.salt === result2.salt).toEqual(false);
        });
    })

});
