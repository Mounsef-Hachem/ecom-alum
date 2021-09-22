import { firestore, storage } from './../../firebase/utils';

export const handleAddProduct = product => {
    return new Promise((resolve, reject) => {
        firestore
            .collection('products')
            .doc()
            .set(product)
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject(err);
            })
    });
}

export const handleFetchProducts = ({ filterType, startAfterDoc, persistProducts = [] }) => {
    return new Promise((resolve, reject) => {
        const pageSize = 8;

        let ref = firestore.collection('products').orderBy('createdDate').limit(pageSize);

        if (filterType) ref = ref.where('productCategory', '==', filterType);
        if (startAfterDoc) ref = ref.startAfter(startAfterDoc);
        ref
            .get()
            .then(snapshot => {
                const totalCount = snapshot.size;

                const data = [
                    ...persistProducts,
                    ...snapshot.docs.map(doc => {
                        return {
                            ...doc.data(),
                            documentID: doc.id
                        }
                    })
                ];
                resolve({ data, queryDoc: snapshot.docs[totalCount - 1], isLastPage: totalCount < 1 });
            })
            .catch(err => {
                reject(err);
            })
    })
}

export const handleDeleteProduct = (documentID) => {
    return new Promise((resolve, reject) => {
        var doc = firestore.collection('products').doc(documentID);
        doc
            .get()
            .then(snapshot => {
                if (snapshot.exists) {
                    var images = snapshot.data().productImages;
                    if (Array.isArray(images) && images.length > 1) {
                        images.forEach((image) => {
                            deleteFromFirebase(image);
                        })
                    }

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
    });

}

const deleteFromFirebase = (url) => {
    let pictureRef = storage.refFromURL(url);

    pictureRef.delete()
        .then(() => {
            console.log(pictureRef + " deleted");
        })
        .catch((err) => {
            console.log(err);
        });
};

export const handleFetchProduct = (productID) => {
    return new Promise((resolve, reject) => {
        firestore
            .collection('products')
            .doc(productID)
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