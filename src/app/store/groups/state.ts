export interface GroupState {
    groups: Group[];
    selectedGroup: Group | null;
}

export const initialGroupState: GroupState = {
    groups: [],
    selectedGroup: null
};

export interface SubGroupState {
    subGroups: SubGroup[];
    selectedSubGroup: SubGroup | null;
}

export const initialSubGroupState: SubGroupState = {
    subGroups: [],
    selectedSubGroup: null
};

export interface Group {
    id: number;
    name: string;
    description: string;
    sub_groups?: SubGroup[]; // Nested subGroups when available
    created_at: string;
    updated_at: string;
}

export interface SubGroup {
    id: number;
    group_id: number;
    group_name?: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
}
