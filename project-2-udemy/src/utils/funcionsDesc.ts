export function textSlicers(text: string ,max: number= 90) {
    if(text.length >= max) return `${text.slice(0, max)}...`;
    return text
}