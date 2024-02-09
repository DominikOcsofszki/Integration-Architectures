import { SheetSummary } from '../models/SheetSummary';

const statusMap = {
    'pending-hr': 0,
    'pending-ceo': 33,
    'pending-salesman': 66,
    finished: 100,
};

export function calculatePercentage(allSheets: SheetSummary[]): number {
    return (
        allSheets
            .map((sheet) => {
                return statusMap[sheet.status];
            })
            .reduce((partial, value) => partial + value) / allSheets.length
    );
}
