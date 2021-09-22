import { firestore, storage } from './../../firebase/utils';

export const handleAddCategory = category => {
    return new Promise((resolve, reject) => {
        firestore
            .collection('categories')
            .doc()
            .set(category)
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject(err);
            })
    });
}


export const handleUpdateCategory = ({ payload }) => {
    return new Promise((resolve, reject) => {
        console.log(payload);
        firestore
            .collection('categories')
            .doc(payload.documentID)
            .update(payload)
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject(err);
            })
    });
}

export const handleFetchCategories = () => {
    return new Promise((resolve, reject) => {

        firestore
            .collection('categories')
            .get()
            .then(snapshot => {

                const data = [
                    ...snapshot.docs.map(doc => {
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
            })
    })
}

export const handleDeleteCategory = (documentID) => {
    return new Promise((resolve, reject) => {
        const doc = firestore.collection('categories').doc(documentID);

        doc
            .get()
            .then(snapshot => {
                if (snapshot.exists) {
                    var image = snapshot.data().categoryThumbnail;
                    deleteFromFirebase(image);
                    doc
                        .delete()
                        .then(() => {
                            resolve();
                        })
                        .catch(err => {
                            reject(err);
                        });
                }
            });

    })
}

export const deleteFromFirebase = (url) => {
    let pictureRef = storage.refFromURL(url);

    pictureRef.delete()
        .then(() => {
            console.log(pictureRef + " deleted");
        })
        .catch((err) => {
            console.log(err);
        });
};

export const handleFetchCategory = (categoryID) => {
    return new Promise((resolve, reject) => {
        firestore
            .collection('categories')
            .doc(categoryID)
            .get()
            .then(snapshot => {
                if (snapshot.exists) {
                    resolve(
                        { ...snapshot.data(), documentID: snapshot.id }
                    );
                }
            })
            .catch(err => {
                reject(err);
            })

    })
}