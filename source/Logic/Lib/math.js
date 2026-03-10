export function calculateWithCommission(number, commission) {
    return Number(number) * (1 - (Number(commission) / 100))
}