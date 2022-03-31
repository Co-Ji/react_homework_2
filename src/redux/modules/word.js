// widgets.js
import { db } from "../../firebase";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";
// Actions
const LOAD = "word/LOAD";
const CREATE = "word/CREATE";
const REMOVE = "word/REMOVE";
const COMPLETED = "word/COMPLETED";
const UPDATE = "word/UPDATE";

// Action Creators
export function loadWord(wordLists) {
    return { type: LOAD, wordLists };
}

export function createWord(word) {
    return { type: CREATE, word };
}

export function removeWord(wordId) {
    return { type: REMOVE, wordId };
}

export function completedWord(wordId) {
    return { type: COMPLETED, wordId };
}

export function updatedWord(word, wordId) {
    return { type: UPDATE, word: word, wordId };
}

const initialState = {
    list: [],
};

// middlewares
export const loadWordFB = () => {
    return async function (dispatch) {
        const words_data = await getDocs(collection(db, "wordList"));

        let wordLists = [];

        words_data.forEach((doc) => {
            wordLists.push({ voca: doc.data(), id: doc.id });
        });

        dispatch(loadWord(wordLists));
    };
};

export const createWordFB = (wordList) => {
    return async function (dispatch) {
        const docRef = await addDoc(collection(db, "wordList"), wordList);
        const _wordList = await getDoc(docRef);
        const wordLists = {
            id: docRef.id,
            voca: (await getDoc(docRef)).data(),
        };
        dispatch(createWord(wordLists));
    };
};

export const completedWordFB = (wordList_id) => {
    return async function (dispatch, getState) {
        //FB에서 수정할 리스트 불러오기
        const docRef = doc(db, "wordList", wordList_id);
        // 불러올 때 까지 기다린 후 리스트 completed를 true로 변경
        if ((await getDoc(docRef)).data().completed === true) {
            await updateDoc(docRef, { completed: false });
        } else {
            await updateDoc(docRef, { completed: true });
        }

        dispatch(completedWord(docRef.id));
    };
};

export const updatedWordFB = (wordList, wordList_id) => {
    return async function (dispatch) {
        const docRef = doc(db, "wordList", wordList_id);
        await updateDoc(docRef, { ...wordList });
        dispatch(updatedWord((await getDoc(docRef)).data(), docRef.id));
    };
};

export const removeWordFB = (wordList_id) => {
    return async function (dispatch, getState) {
        const docRef = doc(db, "wordList", wordList_id);
        await deleteDoc(docRef);
        dispatch(removeWord(docRef.id));
    };
};

// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case "word/LOAD": {
            return { list: action.wordLists };
        }
        case "word/CREATE": {
            const new_wordList = [
                ...state.list,
                {
                    ...action.word,
                },
            ];

            return { list: new_wordList };
        }

        case "word/REMOVE": {
            const remove_wordList = state.list.filter(
                (element, index) => !(element.id === action.wordId)
            );
            return { list: remove_wordList };
        }

        case "word/COMPLETED": {
            const completed_wordList = state.list.map((element, index) => {
                if (action.wordId === element.id) {
                    if (element.voca.completed === false) {
                        element.voca.completed = true;

                        return element;
                    } else {
                        element.voca.completed = false;
                        return element;
                    }
                } else {
                    return element;
                }
            });
            return { list: completed_wordList };
        }

        case "word/UPDATE": {
            const updated_wordList = state.list.map((element, index) => {
                if (action.wordId === element.id) {
                    return { voca: action.word, id: action.wordId };
                } else {
                    return element;
                }
            });

            return { list: updated_wordList };
        }

        // do reducer stuff
        default:
            return state;
    }
}
