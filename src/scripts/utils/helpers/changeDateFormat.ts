export default function changeDateFormat(date: string): string | null {
    return date?.match(/\d+:\d+/)?.[0] as string | null;
}
