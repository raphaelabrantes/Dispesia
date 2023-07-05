export const Repetition =  ["Once A Month",
    "Every Monday",
    "Every Tuesday",
    "Every Wednesday" ,
    "Every Thursday",
    "Every Friday",
    "Every Saturday",
    "Every Sunday",
    "Daily"]


export interface Entry {
    value: number,
    name: string,
    repetitions: string[],
}

export type ModalInfo = {
    open: boolean,
    onClose: () => void,
    handleSubmit: (entry: Entry) => void;
}