export interface ChartApiDto<T> {
    from: Date;
    to: Date;
    items: T[];
}