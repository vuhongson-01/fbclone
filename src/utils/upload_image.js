import { firebaseConfig } from "../constants/firebaseConfig";
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

export async function uploadImageToFirebase(assets, location) {
    initializeApp(firebaseConfig);
    // let assets = file.assets;
    let response = [];
    for (let i = 0; i < assets.length; i++) {
        const fileName = assets[i].fileName;
        const storage = getStorage();
        const my_ref = ref(storage, `${location}/${fileName}`);
        const img = await fetch(assets[i].uri);
        const bytes = await img.blob();
        await uploadBytes(my_ref, bytes)
            .then(
                async (res) => {
                    if (res.metadata) {
                        await getDownloadURL(my_ref)
                            .then(url => {
                                // console.log(url);
                                response.push(url);
                            })
                            .catch(error => console.log(error));
                    } else {
                        console.log('UPLOAD FILE ERROR!');
                    }
                }
            )
            .catch(
                (error) => console.log(error)
            );
    }
    return response;
}