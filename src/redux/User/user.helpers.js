import { auth } from './../../firebase/utils';
import { firestore } from './../../firebase/utils';

export const handleResetPasswordAPI = (email) => {
    const config = {
        url: 'http://localhost:3000/login'
    }

    return new Promise((resolve, reject) => {
        auth.sendPasswordResetEmail(email, config)
            .then(() => {
                resolve();
            })
            .catch(() => {
                const err = ['Email not found. Please enter a valid email.'];
                reject(err);
            });
    });
};

export const handleFetchUsers = () => {
    return new Promise((resolve, reject) => {
        firestore
            .collection('users')
            .get()
            .then(snap => {
                const data = [
                    ...snap.docs.map(doc => {
                        return {
                            ...doc.data(),
                            documentID: doc.id
                        }
                    })
                ];
                resolve({ data });
            })
            .catch(err => {
                reject(err);
            });
    });
};