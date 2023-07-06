
export enum Repetitions {
    OnceAMonth = "Once A Month",
    EveryMonday = "Every Monday",
    EveryTuesday =  "EveryTuesday",
    EveryWednesday = "Every Wednesday",
    EveryThursday = "Every Thursday",
    EveryFriday = "Every Friday" ,
    EverySaturday = "Every Saturday" ,
    EverySunday = "Every Sunday",
    Daily = "Daily"
}

export const Repetition =  Object.values(Repetitions).map((value) => value.toString());


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