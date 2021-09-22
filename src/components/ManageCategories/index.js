import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { addCategoryStart, deleteCategoryStart, updateCategoryStart } from '../../redux/Categories/categories.actions';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { storage } from '../../firebase/utils';
import { deleteFromFirebase } from '../../redux/Categories/categories.helpers';

const ManageCategories = ({ categories }) => {
    const dispatch = useDispatch();
    const [columns, setColumns] = useState([
        {
            title: 'Thumbnail', field: 'categoryThumbnail',
            editComponent: props => (
                <input
                    accept="image/*"
                    type="file"
                    onChange={e => props.onChange(e.target.files[0])}
                />
            ),
            render: rowData => <img src={rowData.categoryThumbnail} style={{ width: 50 }} />
        },
        { title: 'Name', field: 'categoryName' }
    ]);

    const handleAddCategory = (data) => {
        return new Promise((resolve, reject) => {
            const { categoryThumbnail, categoryName } = data;
            if (!categoryThumbnail && !categoryName) reject();
            const imageName = `${categoryName}_${moment().format("DD-MM-YYYY")}`;
            const uploadTask = storage.ref(`categoriesThumbnails/${categoryName}/${imageName}`).put(categoryThumbnail);
            console.log(categoryThumbnail);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                },
                (error) => {
                    reject(error);
                },
                async () => {
                    await storage
                        .ref(`categoriesThumbnails/${categoryName}`)
                        .child(imageName)
                        .getDownloadURL()
                        .then((url) => {
                            dispatch(addCategoryStart({ categoryThumbnail: url, categoryName: categoryName }));
                            resolve();
                        });
                }
            );
        })
    }

    const handleUpdateCategory = (newData, oldData) => {
        return new Promise((resolve, reject) => {
            const { categoryThumbnail, categoryName } = newData;
            if (categoryThumbnail != oldData.categoryThumbnail) {
                deleteFromFirebase(oldData.categoryThumbnail);
                const imageName = `${categoryName}_${moment().format("DD-MM-YYYY")}`;
                const uploadTask = storage.ref(`categoriesThumbnails/${categoryName}/${imageName}`).put(categoryThumbnail);
                console.log(categoryThumbnail);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                    },
                    (error) => {
                        reject(error);
                    },
                    async () => {
                        await storage
                            .ref(`categoriesThumbnails/${categoryName}`)
                            .child(imageName)
                            .getDownloadURL()
                            .then((url) => {
                                dispatch(updateCategoryStart({ documentID: oldData.documentID, categoryThumbnail: url, categoryName: categoryName }));
                                resolve();
                            });
                    }
                );
            } else {
                dispatch(updateCategoryStart({ categoryName: categoryName, documentID: oldData.documentID }));
                resolve();
            }
        })
    }

    const handleDeleteCategory = (oldData) => {
        return new Promise((resolve, reject) => {
            dispatch(deleteCategoryStart(oldData.documentID));
            resolve();
        });
    }

    return (
        <MaterialTable
            title="Categories"
            columns={columns}
            data={categories}
            editable={{
                onRowAdd: newData => handleAddCategory(newData),
                onRowUpdate: (newData, oldData) => handleUpdateCategory(newData, oldData),
                onRowDelete: oldData => handleDeleteCategory(oldData)
            }}
            options={{
                detailPanelType: 'single',
            }}
        />
    )
}

export default ManageCategories;