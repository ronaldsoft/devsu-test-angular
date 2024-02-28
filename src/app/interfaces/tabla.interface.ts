export interface Columns {
    name: string;
    haveInfo: boolean;
    msgInfo: string;
}

export interface Item {
    id: string;
    values: string[];
}
export interface MenuOption {
    label: string;
    action: string;
}
  
export interface ActionEvent {
    action: string;
    data: any;
}