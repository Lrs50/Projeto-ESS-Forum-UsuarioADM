export const imageFallBack: string =
    'https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg'

export function ParseDate(timestamp: number): string {
    const parsed = new Date(timestamp)

    const days: string = String(parsed.getDate()).padStart(2, '0')
    const month: string = String(parsed.getMonth() + 1).padStart(2, '0')
    const hours: string = String(parsed.getHours()).padStart(2, '0')
    const minutes: string = String(parsed.getMinutes()).padStart(2, '0')

    return `${days}/${month}/${parsed.getFullYear()} ${hours}:${minutes}`
}
