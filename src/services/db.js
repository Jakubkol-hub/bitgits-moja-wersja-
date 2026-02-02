import { db, isFirebaseConfigured } from "../firebaseConfig";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, setDoc } from "firebase/firestore";

// Helper for initial data if DB is empty
const INITIAL_PRODUCTS = [
    { id: 1, name: 'Liofilizowana Truskawka', price: 24.99, category: 'Owoce - Owoce liofilizowane', description: 'Chrupiące plastry dojrzałych truskawek, liofilizowane dla zachowania pełnego smaku i witamin.' },
    { id: 2, name: 'Orzechy w Czekoladzie', price: 18.50, category: 'Słodycze - Orzechy w czekoladzie', description: 'Wyselekcjonowane orzechy laskowe w aksamitnej, mlecznej czekoladzie.' },
    { id: 3, name: 'Herbatka Różana', price: 15.99, category: 'Herbaty - Herbaty owocowe', description: 'Aromatyczna mieszanka liściastej herbaty z płatkami jadalnych róż.' }
];

export const DB = {
    // PRODUCTS
    getProducts: async () => {
        if (isFirebaseConfigured()) {
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                if (products.length === 0) {
                    // Seed initial data? Maybe not automatically to avoid spam, but return initial
                    return INITIAL_PRODUCTS;
                }
                return products;
            } catch (e) {
                console.error("Firebase Error:", e);
                return INITIAL_PRODUCTS;
            }
        } else {
            const saved = localStorage.getItem('bitgits_products');
            return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
        }
    },

    addProduct: async (product) => {
        if (isFirebaseConfigured()) {
            // Remove ID if present, let Firestore generate it, or use it as doc ID
            const { id, ...data } = product;
            const docRef = await addDoc(collection(db, "products"), data);
            return { id: docRef.id, ...data };
        } else {
            const products = JSON.parse(localStorage.getItem('bitgits_products') || JSON.stringify(INITIAL_PRODUCTS));
            const newProduct = { ...product, id: Date.now() }; // Local ID
            const updated = [...products, newProduct];
            localStorage.setItem('bitgits_products', JSON.stringify(updated));
            return newProduct;
        }
    },

    updateProduct: async (product) => {
        if (isFirebaseConfigured()) {
            const { id, ...data } = product;
            const productRef = doc(db, "products", id.toString());
            await setDoc(productRef, data, { merge: true }); // set with merge is safer for custom IDs
            return product;
        } else {
            const products = JSON.parse(localStorage.getItem('bitgits_products') || '[]');
            const updated = products.map(p => p.id === product.id ? product : p);
            localStorage.setItem('bitgits_products', JSON.stringify(updated));
            return product;
        }
    },

    deleteProduct: async (id) => {
        if (isFirebaseConfigured()) {
            await deleteDoc(doc(db, "products", id.toString()));
        } else {
            const products = JSON.parse(localStorage.getItem('bitgits_products') || '[]');
            const updated = products.filter(p => p.id !== id);
            localStorage.setItem('bitgits_products', JSON.stringify(updated));
        }
    }
};
