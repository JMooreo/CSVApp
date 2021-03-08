export interface Cell {
    id: number
    value: string
    rowIndex: number
    columnIndex: number
    status: 'selected' | 'deselected' | 'inactive'
}