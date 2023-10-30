export interface ChartApiDto<T> {
    type: string;
    from?: Date;
    to?: Date;
    items: T[];
}