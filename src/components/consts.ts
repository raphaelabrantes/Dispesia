
export interface Entry {
    value: number,
    name: string,


}

export type ModalInfo = {
    open: boolean,
    onClose: () => void,
    handleSubmit: (entry: Entry) => void;
}