export interface Entry {
    positive: boolean,
    value: string,
    name?: string,
}

export type ModalInfo = {
    open: boolean,
    onClose: () => void,
    handleSubmit: (entry: Entry) => void;
}