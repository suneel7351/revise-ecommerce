function generateOTP() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$&*';
    let OTP = '';
    let digitsCount = 0;

    while (OTP.length < 6) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        const randomChar = characters[randomIndex];
        OTP += randomChar;
        if ('0123456789'.includes(randomChar)) {
            digitsCount++;
        }
    }

    if (digitsCount < 2) {
        // Remove any non-digit character and replace them with digits
        for (let i = 0; i < OTP.length && digitsCount < 2; i++) {
            if (!'0123456789'.includes(OTP[i])) {
                OTP = OTP.substring(0, i) + Math.floor(Math.random() * 10) + OTP.substring(i + 1);
                digitsCount++;
            }
        }
    }


    OTP = OTP.split('').sort(() => Math.random() - 0.5).join('');

    return OTP;
}


export default generateOTP