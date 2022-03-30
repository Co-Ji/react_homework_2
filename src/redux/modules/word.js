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
// const UPDATE = "my-app/widgets/UPDATE";
// const REMOVE = "my-app/widgets/REMOVE";

// Action Creators
export function loadWord(wordLists) {
    return { type: LOAD, wordLists };
}

export function createWord(word) {
    console.log(word);
    return { type: CREATE, word };
}

export function removeWord(word) {
    return { type: REMOVE, word };
}

export function completedWord(word) {
    return { type: COMPLETED, word };
}

export function updatedWord(word) {
    return { type: UPDATE, word };
}

const initialState = {
    list: [
        // {
        //     voca: {
        //         name: "name",
        //         sign: "[neim]",
        //         meaning_name: "이름",
        //         sentence: "my name is",
        //         meaning_sentence: "내 이름은 ~이다",
        //         id: "name",
        //     },
        //     completed: false,
        // },
    ],
};

// middlewares
export const loadWordFB = () => {
    return async function (dispatch) {
        const words_data = await getDocs(collection(db, "wordList"));
        // console.log(words_data);

        let wordLists = [];

        words_data.forEach((doc) => {
            wordLists.push({ ...doc.data() });
        });

        dispatch(loadWord(wordLists));
    };
};

export const createWordFB = (wordList) => {
    return async function (dispatch) {
        const docRef = await addDoc(collection(db, "wordList"), wordList);
        const _wordList = await getDoc(docRef);
        const wordLists = {
            voca: { id: _wordList.id, ..._wordList.data() },
            completed: false,
        };
        console.log(wordLists);

        dispatch(createWord(wordLists));
    };
};

// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case "word/LOAD": {
            return { list: action.wordLists };
        }
        case "word/CREATE": {
            console.log(action.word);
            const new_wordList = [
                ...state.list,
                {
                    ...action.word,
                },
            ];
            console.log(new_wordList);

            return { list: new_wordList };
        }

        case "word/REMOVE": {
            // console.log(parseInt(action.word));

            const remove_wordList = state.list.filter(
                (element, index) => !(index === action.word)
            );
            return { list: remove_wordList };
        }

        case "word/COMPLETED": {
            const completed_wordList = state.list.map((element, index) => {
                if (action.word === index) {
                    if (element.completed === false) {
                        return {
                            voca: state.list[index].voca,
                            completed: true,
                        };
                    } else {
                        return {
                            voca: state.list[index].voca,
                            completed: false,
                        };
                    }
                } else {
                    return element;
                }
            });

            return { list: completed_wordList };
        }

        case "word/UPDATE": {
            const updated_wordList = state.list.map((element, index) => {
                if (action.word.id === element.voca.id) {
                    return { voca: action.word, completed: false };
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
